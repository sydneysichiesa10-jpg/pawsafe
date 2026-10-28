/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Pet, RadarSighting, UserProfile } from './types';
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

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('adopt');
  const [selectedPet, setSelectedPet] = useState<Pet>(PETS_DATA[0]); // Barnaby
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
        return parsed;
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

  const handleSightingReported = (_newSighting: RadarSighting) => {
    RADAR_SIGHTINGS.unshift(_newSighting);
    setUnreadNotifications((n) => n + 1);
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
        {/* Header */}
        <Header
          currentLocation={currentLocation}
          userProfile={userProfile}
          onOpenLocationPicker={() => setIsLocationModalOpen(true)}
          onOpenNotifications={() => {
            setIsNotificationsModalOpen(true);
            setUnreadNotifications(0);
          }}
          onOpenProfile={() => setCurrentTab('settings')}
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
              onOpenReport={() => setCurrentTab('report')}
              onOpenDirections={(address) => setDirectionsAddress(address)}
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
              onSelectPet={setSelectedPet}
              onNavigateToAdopt={() => setCurrentTab('adopt')}
              currentLocation={currentLocation}
            />
          )}
        </main>

        {/* Floating Bottom Navigation */}
        <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />

        {/* Modals & Dialogs */}
        {applyPet && (
          <ApplyModal pet={applyPet} onClose={() => setApplyPet(null)} />
        )}

        {schedulePet && (
          <ScheduleModal pet={schedulePet} onClose={() => setSchedulePet(null)} />
        )}

        {coordinatorPet && (
          <CoordinatorModal
            pet={coordinatorPet}
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
      </div>
    </div>
  );
}

