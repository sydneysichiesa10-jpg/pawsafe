/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Pet, RadarSighting } from './types';
import { PETS_DATA, RADAR_SIGHTINGS } from './data/mockData';
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

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('adopt');
  const [selectedPet, setSelectedPet] = useState<Pet>(PETS_DATA[0]); // Barnaby
  const [favorites, setFavorites] = useState<string[]>(['barnaby']);
  const [currentLocation, setCurrentLocation] = useState('Jakarta (Selatan & Pusat)');
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  // Modals
  const [applyPet, setApplyPet] = useState<Pet | null>(null);
  const [schedulePet, setSchedulePet] = useState<Pet | null>(null);
  const [coordinatorPet, setCoordinatorPet] = useState<Pet | null>(null);
  const [directionsAddress, setDirectionsAddress] = useState<string | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);

  // Call phone notification
  const [phoneToast, setPhoneToast] = useState<string | null>(null);

  const toggleFavorite = (petId: string) => {
    setFavorites((prev) =>
      prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]
    );
  };

  const handleCallPhone = (phone: string) => {
    // Open tel protocol or show actionable banner
    setPhoneToast(`Connecting to ${phone}...`);
    setTimeout(() => {
      window.location.href = `tel:${phone.replace(/[^\d+]/g, '')}`;
    }, 200);
    setTimeout(() => setPhoneToast(null), 3500);
  };

  const handleSightingReported = (_newSighting: RadarSighting) => {
    RADAR_SIGHTINGS.unshift(_newSighting);
    setUnreadNotifications((n) => n + 1);
  };

  return (
    <div className="min-h-screen bg-[#f2fcf6] text-[#141d1a] flex flex-col items-center selection:bg-[#aff0d2] selection:text-[#002115]">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md min-h-screen bg-[#f2fcf6] flex flex-col relative sm:shadow-[0_0_40px_rgba(20,29,26,0.06)] sm:border-x sm:border-[#e6f0eb]">
        {/* Header */}
        <Header
          currentLocation={currentLocation}
          onOpenLocationPicker={() => setIsLocationModalOpen(true)}
          onOpenNotifications={() => {
            setIsNotificationsModalOpen(true);
            setUnreadNotifications(0);
          }}
          onOpenProfile={() => setCurrentTab('settings')}
          unreadCount={unreadNotifications}
        />

        {/* Global Phone Toast Alert */}
        {phoneToast && (
          <div className="fixed top-20 inset-x-4 max-w-sm mx-auto z-50 bg-[#004732] text-white px-5 py-3 rounded-full shadow-xl text-[13px] font-bold text-center flex items-center justify-center gap-2 animate-bounce">
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>{phoneToast}</span>
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
      </div>
    </div>
  );
}
