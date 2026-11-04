/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Pet, RadarSighting, UserProfile, VoucherReward, RedeemedVoucher } from './types';
import { PETS_DATA, RADAR_SIGHTINGS, DEFAULT_GUEST_PROFILE } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { AdoptScreen } from './components/AdoptScreen';
import { RadarScreen } from './components/RadarScreen';
import { ReportScreen } from './components/ReportScreen';
import { LocateScreen } from './components/LocateScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { ApplyModal } from './components/modals/ApplyModal';
import { ScheduleModal } from './components/modals/ScheduleModal';
import { CoordinatorModal } from './components/modals/CoordinatorModal';
import { LocationModal } from './components/modals/LocationModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { DirectionsModal } from './components/modals/DirectionsModal';
import { AuthModal } from './components/modals/AuthModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { VouchersModal } from './components/modals/VouchersModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('radar');
  const [selectedPet, setSelectedPet] = useState<Pet>(() => PETS_DATA.find((p) => p.id !== 'barnaby') || PETS_DATA[1] || PETS_DATA[0]);
  const [adoptViewMode, setAdoptViewMode] = useState<'catalog' | 'detail'>('catalog');

  // Radar sightings state with localStorage persistence
  const [sightings, setSightings] = useState<RadarSighting[]>(() => {
    try {
      const saved = localStorage.getItem('pawsafe_radar_sightings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return RADAR_SIGHTINGS;
  });

  // Saved / Favorited pets (defaults to empty when logged out / initial guest)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pawsafe_favorites');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clear out legacy default ['barnaby'] if present
        if (Array.isArray(parsed)) {
          if (parsed.length === 1 && parsed[0] === 'barnaby') {
            localStorage.removeItem('pawsafe_favorites');
            return [];
          }
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return [];
  });
  const [currentLocation, setCurrentLocation] = useState('Jakarta (Selatan & Pusat)');
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  // User Profile state (defaults to logged out / Guest mode)
  // If not signed in, points progress is lost upon exit/reload
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('pawsafe_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only authenticated logged-in profiles retain permanent points!
        if (parsed && parsed.isLoggedIn) {
          return {
            ...parsed,
            achievementPoints: parsed.achievementPoints ?? 0,
            redeemedVouchers: parsed.redeemedVouchers ?? [],
          };
        }
      }
    } catch {
      // Fallback
    }
    // Guests always start fresh with 0 points (points progress is lost if not signed in)
    return {
      ...DEFAULT_GUEST_PROFILE,
      achievementPoints: 0,
      redeemedVouchers: [],
    };
  });

  // Modals
  const [applyPet, setApplyPet] = useState<Pet | null>(null);
  const [schedulePet, setSchedulePet] = useState<Pet | null>(null);
  const [coordinatorPet, setCoordinatorPet] = useState<Pet | null>(null);
  const [directionsAddress, setDirectionsAddress] = useState<string | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isVouchersModalOpen, setIsVouchersModalOpen] = useState(false);

  // Global Toast Alert
  const [toastMessage, setToastMessage] = useState<{ icon: string; text: string } | null>(null);

  const showToast = (icon: string, text: string) => {
    setToastMessage({ icon, text });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleFavorite = (petId: string) => {
    setFavorites((prev) => {
      const isCurrentlyFav = prev.includes(petId);
      const next = isCurrentlyFav ? prev.filter((id) => id !== petId) : [...prev, petId];
      try {
        localStorage.setItem('pawsafe_favorites', JSON.stringify(next));
      } catch {
        // Ignore
      }
      showToast(
        isCurrentlyFav ? 'heart_broken' : 'favorite',
        isCurrentlyFav ? 'Removed from Saved Pets' : 'Saved to your favorites!'
      );
      return next;
    });
  };

  const handleCallPhone = (phone: string) => {
    showToast('call', `Connecting to ${phone}...`);
    setTimeout(() => {
      window.location.href = `tel:${phone.replace(/[^\d+]/g, '')}`;
    }, 200);
  };

  // Real-time multi-device live sync via WebSockets + SSE + Polling fallback + BroadcastChannel
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [networkConnected, setNetworkConnected] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState(1);

  useEffect(() => {
    let isMounted = true;
    let reconnectTimeout: any = null;
    let eventSource: EventSource | null = null;

    // Helper for idempotent incoming new sighting
    const processIncomingSighting = (incoming: RadarSighting) => {
      setSightings((prev) => {
        if (prev.some((s) => s.id === incoming.id)) return prev;
        showToast('radar', `🚨 Live Network: Stray reported at ${incoming.location.split('•')[0].trim()}!`);
        setUnreadNotifications((n) => n + 1);
        const next = [incoming, ...prev];
        try {
          localStorage.setItem('pawsafe_radar_sightings', JSON.stringify(next));
        } catch {}
        return next;
      });
    };

    // Helper for idempotent incoming updated sighting
    const processIncomingUpdate = (updated: RadarSighting) => {
      setSightings((prev) => {
        const next = prev.map((s) => (s.id === updated.id ? updated : s));
        try {
          localStorage.setItem('pawsafe_radar_sightings', JSON.stringify(next));
        } catch {}
        return next;
      });
      if (updated.isSaved) {
        showToast('verified', `🎉 Live Update: ${updated.title} was safely rescued!`);
      }
    };

    // 1. Initial & Periodic Polling Sync (guarantees cross-device delivery even if WS is blocked)
    const syncFromServer = async (isInitial = false) => {
      try {
        const res = await fetch('/api/sightings');
        if (!res.ok) return;
        const data = await res.json();
        if (data?.connectedDevices && typeof data.connectedDevices === 'number') {
          if (isMounted) setConnectedDevices(Math.max(1, data.connectedDevices));
        }
        if (data?.success && Array.isArray(data.sightings) && data.sightings.length > 0) {
          if (!isMounted) return;

          setSightings((prev) => {
            // Check for brand new sightings reported on other devices
            if (!isInitial && prev.length > 0) {
              const prevIds = new Set(prev.map((s) => s.id));
              const newItems = data.sightings.filter((s: RadarSighting) => !prevIds.has(s.id));
              if (newItems.length > 0) {
                const newest = newItems[0];
                showToast('radar', `🚨 Live Network: Stray reported at ${newest.location.split('•')[0].trim()}!`);
                setUnreadNotifications((n) => n + newItems.length);
              }
            }
            try {
              localStorage.setItem('pawsafe_radar_sightings', JSON.stringify(data.sightings));
            } catch {}
            return data.sightings;
          });
          setNetworkConnected(true);
        }
      } catch {
        // Fallback
      }
    };

    // Run initial fetch
    syncFromServer(true);

    // Poll every 2 seconds to guarantee 100% sync across all active browsers & mobile devices
    const pollInterval = setInterval(() => {
      syncFromServer(false);
    }, 2000);

    // 2. Real-Time WebSockets Connection for instantaneous zero-latency updates
    const connectWebSocket = () => {
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/ws`;
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          if (isMounted) setNetworkConnected(true);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (!data) return;

            if (data.type === 'PRESENCE_UPDATE' && typeof data.count === 'number') {
              if (isMounted) setConnectedDevices(Math.max(1, data.count));
            } else if (data.type === 'INIT_SIGHTINGS' && Array.isArray(data.sightings)) {
              if (isMounted && data.sightings.length > 0) {
                setSightings(data.sightings);
                if (data.connectedDevices) setConnectedDevices(Math.max(1, data.connectedDevices));
              }
            } else if (data.type === 'NEW_SIGHTING' && data.sighting) {
              processIncomingSighting(data.sighting as RadarSighting);
            } else if (data.type === 'UPDATE_SIGHTING' && data.sighting) {
              processIncomingUpdate(data.sighting as RadarSighting);
            }
          } catch {
            // Ignore parse errors
          }
        };

        ws.onclose = () => {
          if (isMounted) {
            // Reconnect after 2 seconds
            reconnectTimeout = setTimeout(connectWebSocket, 2000);
          }
        };

        ws.onerror = () => {
          ws.close();
        };
      } catch {
        // Fallback to SSE and polling
      }
    };

    connectWebSocket();

    // 3. Server-Sent Events (SSE) Stream fallback
    try {
      eventSource = new EventSource('/api/sightings/stream');
      eventSource.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.type === 'PRESENCE_UPDATE' && typeof data.count === 'number') {
            if (isMounted) setConnectedDevices(Math.max(1, data.count));
          } else if (data.type === 'NEW_SIGHTING' && data.sighting) {
            processIncomingSighting(data.sighting as RadarSighting);
          } else if (data.type === 'UPDATE_SIGHTING' && data.sighting) {
            processIncomingUpdate(data.sighting as RadarSighting);
          }
        } catch {}
      };
      eventSource.onerror = () => {
        // SSE error handled silently
      };
    } catch {}

    // 4. Local BroadcastChannel for immediate same-browser multi-tab sync
    try {
      const channel = new BroadcastChannel('pawsafe_live_radar_network');
      broadcastChannelRef.current = channel;

      channel.onmessage = (event) => {
        const data = event.data;
        if (!data) return;

        if (data.type === 'NEW_SIGHTING' && data.sighting) {
          processIncomingSighting(data.sighting as RadarSighting);
        } else if (data.type === 'UPDATE_SIGHTING' && data.sighting) {
          processIncomingUpdate(data.sighting as RadarSighting);
        }
      };
    } catch {
      // Fallback
    }

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      wsRef.current?.close();
      eventSource?.close();
      broadcastChannelRef.current?.close();
    };
  }, []);

  const handleUpdateSighting = (updated: RadarSighting) => {
    setSightings((prev) => {
      const next = prev.map((s) => (s.id === updated.id ? updated : s));
      try {
        localStorage.setItem('pawsafe_radar_sightings', JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });

    // 1. Send via WebSocket if open
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify({ type: 'UPDATE_SIGHTING', sighting: updated }));
      } catch {}
    }

    // 2. Update on live server via REST (broadcasts to other SSE and WS clients)
    fetch(`/api/sightings/${encodeURIComponent(updated.id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(() => {});

    // 3. Update local tabs via BroadcastChannel
    try {
      broadcastChannelRef.current?.postMessage({
        type: 'UPDATE_SIGHTING',
        sighting: updated,
      });
    } catch {
      // Ignore
    }
  };

  const handleAwardPoints = (pointsToAdd: number, reason: string) => {
    setUserProfile((prev) => {
      const updated: UserProfile = {
        ...prev,
        achievementPoints: (prev.achievementPoints ?? 0) + pointsToAdd,
        rescuesAssisted: (prev.rescuesAssisted ?? 0) + 1,
      };

      // ONLY save to persistent storage if user is signed in!
      // If not signed in, points progress is temporary and will be lost on reload or closing.
      if (prev.isLoggedIn) {
        try {
          localStorage.setItem('pawsafe_user_profile', JSON.stringify(updated));
        } catch {
          // Ignore
        }
        showToast('military_tech', `+${pointsToAdd} Permanent Points! ${reason}`);
      } else {
        showToast(
          'warning',
          `+${pointsToAdd} Temporary Points! Sign in before leaving or your progress will be lost.`
        );
      }
      return updated;
    });
  };

  const handleRedeemVoucher = (voucher: VoucherReward): boolean => {
    if (!userProfile.isLoggedIn) {
      showToast('warning', 'Please sign in to save your points and redeem vouchers!');
      setIsAuthModalOpen(true);
      return false;
    }

    const currentPoints = userProfile.achievementPoints ?? 0;
    if (currentPoints < voucher.pointsCost) {
      showToast('error', `Need ${voucher.pointsCost - currentPoints} more points to redeem!`);
      return false;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const categoryPrefix = voucher.category.toUpperCase().slice(0, 3);
    const code = `HERO-${categoryPrefix}-${randomSuffix}`;
    const now = new Date();
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + 60);

    const newRedeemed: RedeemedVoucher = {
      id: `voucher-${Date.now()}`,
      voucherId: voucher.id,
      title: voucher.title,
      partner: voucher.partner,
      code,
      discount: voucher.discount,
      redeemedAt: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      expiresAt: expDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      pointsSpent: voucher.pointsCost,
      qrValue: `PAWSAFE-${code}`,
      category: voucher.category,
    };

    setUserProfile((prev) => {
      const updated: UserProfile = {
        ...prev,
        achievementPoints: Math.max(0, (prev.achievementPoints ?? 0) - voucher.pointsCost),
        redeemedVouchers: [newRedeemed, ...(prev.redeemedVouchers ?? [])],
      };
      try {
        localStorage.setItem('pawsafe_user_profile', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });

    showToast('confirmation_number', `Redeemed ${voucher.title}! Code: ${code}`);
    return true;
  };

  const handleSightingReported = (newSighting: RadarSighting) => {
    RADAR_SIGHTINGS.unshift(newSighting);
    setSightings((prev) => {
      const next = [newSighting, ...prev];
      try {
        localStorage.setItem('pawsafe_radar_sightings', JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
    setUnreadNotifications((n) => n + 1);
    handleAwardPoints(50, 'for contributing a verified field sighting!');

    // 1. Send via WebSocket if open
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify({ type: 'REPORT_SIGHTING', sighting: newSighting }));
      } catch {}
    }

    // 2. Push to live server so it broadcasts to all other users' screens immediately
    fetch('/api/sightings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSighting),
    }).catch(() => {});

    // 3. Broadcast to local tabs
    try {
      broadcastChannelRef.current?.postMessage({
        type: 'NEW_SIGHTING',
        sighting: newSighting,
      });
    } catch {
      // Ignore
    }
  };

  const handleLoginSuccess = (profile: UserProfile, guestPointsToKeep?: number) => {
    const finalPoints = (profile.achievementPoints ?? 0) + (guestPointsToKeep || 0);
    const updatedProfile: UserProfile = {
      ...profile,
      achievementPoints: finalPoints,
    };
    setUserProfile(updatedProfile);
    try {
      localStorage.setItem('pawsafe_user_profile', JSON.stringify(updatedProfile));
    } catch {
      // Ignore
    }
    if (guestPointsToKeep && guestPointsToKeep > 0) {
      showToast('verified', `Welcome, ${profile.nickname}! +${guestPointsToKeep} temporary points saved to your account.`);
    } else {
      showToast('check_circle', `Welcome, ${profile.nickname}!`);
    }
  };

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    try {
      localStorage.setItem('pawsafe_user_profile', JSON.stringify(updatedProfile));
    } catch {
      // Ignore
    }
    showToast('check_circle', 'Profile updated successfully!');
  };

  const handleLogout = () => {
    const guestProfile: UserProfile = {
      ...DEFAULT_GUEST_PROFILE,
      id: `guest-${Date.now()}`,
      city: currentLocation,
      achievementPoints: 0, // Guest points are reset to 0
      redeemedVouchers: [],
    };
    setUserProfile(guestProfile);
    setFavorites([]);
    try {
      localStorage.removeItem('pawsafe_user_profile'); // Clear storage so guest progress is not kept
      localStorage.removeItem('pawsafe_favorites');
    } catch {
      // Ignore
    }
    showToast('info', 'Logged out. Guest points are reset — sign in anytime to access saved points.');
  };

  return (
    <div className="min-h-screen bg-[#f2fcf6] text-[#141d1a] flex flex-col items-center selection:bg-[#aff0d2] selection:text-[#002115]">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md min-h-screen bg-[#f2fcf6] flex flex-col relative sm:shadow-[0_0_40px_rgba(20,29,26,0.06)] sm:border-x sm:border-[#e6f0eb]">
        {/* Header with Points and Vouchers access */}
        <Header
          currentLocation={currentLocation}
          userProfile={userProfile}
          onOpenLocationPicker={() => setIsLocationModalOpen(true)}
          onOpenNotifications={() => {
            setIsNotificationsModalOpen(true);
            setUnreadNotifications(0);
          }}
          onOpenProfile={() => setCurrentTab('settings')}
          onOpenVouchers={() => setIsVouchersModalOpen(true)}
          unreadCount={unreadNotifications}
        />

        {/* Global Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 inset-x-4 max-w-sm mx-auto z-50 bg-[#004732] text-white px-5 py-3 rounded-full shadow-xl text-[13px] font-bold text-center flex items-center justify-center gap-2 animate-bounce">
            <span className="material-symbols-outlined text-[18px]">{toastMessage.icon}</span>
            <span>{toastMessage.text}</span>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 w-full pt-16 sm:pt-20">
          {currentTab === 'adopt' && (
            <AdoptScreen
              selectedPet={selectedPet}
              onSelectPet={setSelectedPet}
              viewMode={adoptViewMode}
              onViewModeChange={setAdoptViewMode}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onOpenApply={(pet) => setApplyPet(pet)}
              onOpenSchedule={(pet) => setSchedulePet(pet)}
              onOpenCoordinator={(pet) => setCoordinatorPet(pet)}
              onOpenDirections={(address) => setDirectionsAddress(address)}
              onCallPhone={handleCallPhone}
            />
          )}

          {currentTab === 'radar' && (
            <RadarScreen
              currentLocation={currentLocation}
              userProfile={userProfile}
              sightings={sightings}
              onUpdateSighting={handleUpdateSighting}
              onOpenReport={() => setCurrentTab('report')}
              onOpenDirections={(address) => setDirectionsAddress(address)}
              onOpenVouchers={() => setIsVouchersModalOpen(true)}
              onAwardPoints={handleAwardPoints}
              networkConnected={networkConnected}
              connectedDevices={connectedDevices}
              onOpenAuth={() => setIsAuthModalOpen(true)}
            />
          )}

          {currentTab === 'report' && (
            <ReportScreen
              userProfile={userProfile}
              onSightingReported={handleSightingReported}
              onNavigateToRadar={() => setCurrentTab('radar')}
            />
          )}

          {currentTab === 'locate' && (
            <LocateScreen
              onCallPhone={handleCallPhone}
              onOpenDirections={(address) => setDirectionsAddress(address)}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsScreen
              userProfile={userProfile}
              onOpenAuth={() => setIsAuthModalOpen(true)}
              onOpenEditProfile={() => setIsEditProfileModalOpen(true)}
              onLogout={handleLogout}
              favorites={favorites}
              onSelectPet={(pet) => {
                setSelectedPet(pet);
                setAdoptViewMode('detail');
                setCurrentTab('adopt');
              }}
              onNavigateToAdopt={() => {
                setAdoptViewMode('catalog');
                setCurrentTab('adopt');
              }}
              currentLocation={currentLocation}
              onOpenVouchers={() => setIsVouchersModalOpen(true)}
            />
          )}
        </main>

        {/* Floating Bottom Navigation */}
        <BottomNav
          currentTab={currentTab}
          onTabChange={(tab) => {
            setCurrentTab(tab);
            if (tab === 'adopt') {
              setAdoptViewMode('catalog');
            }
          }}
        />

        {/* Modals & Dialogs */}
        {applyPet && (
          <ApplyModal
            pet={applyPet}
            userProfile={userProfile}
            onClose={() => setApplyPet(null)}
          />
        )}

        {schedulePet && (
          <ScheduleModal pet={schedulePet} onClose={() => setSchedulePet(null)} />
        )}

        {coordinatorPet && (
          <CoordinatorModal
            pet={coordinatorPet}
            userProfile={userProfile}
            onClose={() => setCoordinatorPet(null)}
          />
        )}

        {directionsAddress && (
          <DirectionsModal
            destination={directionsAddress}
            onClose={() => setDirectionsAddress(null)}
            onCallPhone={handleCallPhone}
          />
        )}

        {isLocationModalOpen && (
          <LocationModal
            currentLocation={currentLocation}
            onSelectLocation={setCurrentLocation}
            onClose={() => setIsLocationModalOpen(false)}
          />
        )}

        {isNotificationsModalOpen && (
          <NotificationsModal
            onClose={() => setIsNotificationsModalOpen(false)}
            onNavigateToRadar={() => setCurrentTab('radar')}
            onNavigateToAdopt={() => setCurrentTab('adopt')}
          />
        )}

        {/* Login / Sign Up Modal */}
        {isAuthModalOpen && (
          <AuthModal
            onClose={() => setIsAuthModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
            guestPoints={!userProfile.isLoggedIn ? (userProfile.achievementPoints ?? 0) : 0}
          />
        )}

        {/* Edit Profile Modal (Avatar, Username, Nickname, Bio, etc.) */}
        {isEditProfileModalOpen && (
          <EditProfileModal
            profile={userProfile}
            onClose={() => setIsEditProfileModalOpen(false)}
            onSave={handleSaveProfile}
          />
        )}

        {/* Rewards & Vouchers Store Modal */}
        {isVouchersModalOpen && (
          <VouchersModal
            userProfile={userProfile}
            onClose={() => setIsVouchersModalOpen(false)}
            onRedeemVoucher={handleRedeemVoucher}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onNavigateToRadar={() => {
              setIsVouchersModalOpen(false);
              setCurrentTab('radar');
            }}
          />
        )}
      </div>
    </div>
  );
}

