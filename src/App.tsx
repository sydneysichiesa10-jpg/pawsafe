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
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('pawsafe_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If prior cache had Sydney Sichiesa from the old mock default, reset to logged out Guest
        if (parsed.id === 'user-sydney' || parsed.username === 'sydney_rescuer' || parsed.fullName === 'Sydney Sichiesa') {
          return DEFAULT_GUEST_PROFILE;
        }
        return {
          ...DEFAULT_GUEST_PROFILE,
          ...parsed,
          achievementPoints: parsed.achievementPoints ?? DEFAULT_GUEST_PROFILE.achievementPoints,
          redeemedVouchers: parsed.redeemedVouchers ?? [],
        };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_GUEST_PROFILE;
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

  // Real-time multi-screen live sync via Server-Sent Events (SSE) + BroadcastChannel
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    // 1. Initial sync with live server store
    fetch('/api/sightings')
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.sightings) && data.sightings.length > 0) {
          setSightings(data.sightings);
        }
      })
      .catch(() => {
        // Offline / fallback to initial state
      });

    // 2. Real-time Server-Sent Events (SSE) for cross-device & cross-user sync
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/sightings/stream');
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (!data) return;

          if (data.type === 'NEW_SIGHTING' && data.sighting) {
            const incoming = data.sighting as RadarSighting;
            setSightings((prev) => {
              if (prev.some((s) => s.id === incoming.id)) return prev;
              return [incoming, ...prev];
            });
            setUnreadNotifications((n) => n + 1);
            showToast('radar', `🚨 Live Network: Stray reported at ${incoming.location.split('•')[0].trim()}!`);
          } else if (data.type === 'UPDATE_SIGHTING' && data.sighting) {
            const incoming = data.sighting as RadarSighting;
            setSightings((prev) => prev.map((s) => (s.id === incoming.id ? incoming : s)));
            if (incoming.isSaved) {
              showToast('verified', `🎉 Live Update: ${incoming.title} was safely rescued!`);
            }
          }
        } catch {
          // Ignore
        }
      };
    } catch {
      // Ignore
    }

    // 3. Local BroadcastChannel for immediate same-browser tab sync
    try {
      const channel = new BroadcastChannel('pawsafe_live_radar_network');
      broadcastChannelRef.current = channel;

      channel.onmessage = (event) => {
        const data = event.data;
        if (!data) return;

        if (data.type === 'NEW_SIGHTING' && data.sighting) {
          const incoming = data.sighting as RadarSighting;
          setSightings((prev) => {
            if (prev.some((s) => s.id === incoming.id)) return prev;
            return [incoming, ...prev];
          });
          setUnreadNotifications((n) => n + 1);
        } else if (data.type === 'UPDATE_SIGHTING' && data.sighting) {
          const incoming = data.sighting as RadarSighting;
          setSightings((prev) => prev.map((s) => (s.id === incoming.id ? incoming : s)));
        }
      };
    } catch {
      // Fallback
    }

    return () => {
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

    // Update on live server so all other people's screens receive it immediately
    fetch(`/api/sightings/${encodeURIComponent(updated.id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(() => {});

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
      try {
        localStorage.setItem('pawsafe_user_profile', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
    showToast('military_tech', `+${pointsToAdd} Achievement Points! ${reason}`);
  };

  const handleRedeemVoucher = (voucher: VoucherReward): boolean => {
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

    // Push to live server so it broadcasts to all other users' screens immediately
    fetch('/api/sightings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSighting),
    }).catch(() => {});

    try {
      broadcastChannelRef.current?.postMessage({
        type: 'NEW_SIGHTING',
        sighting: newSighting,
      });
    } catch {
      // Ignore
    }
  };

  const handleLoginSuccess = (profile: UserProfile) => {
    setUserProfile(profile);
    try {
      localStorage.setItem('pawsafe_user_profile', JSON.stringify(profile));
    } catch {
      // Ignore
    }
    showToast('check_circle', `Welcome, ${profile.nickname}!`);
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
    };
    setUserProfile(guestProfile);
    setFavorites([]);
    try {
      localStorage.setItem('pawsafe_user_profile', JSON.stringify(guestProfile));
      localStorage.removeItem('pawsafe_favorites');
    } catch {
      // Ignore
    }
    showToast('info', 'Browsing as Guest. You can sign in anytime in Settings.');
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

