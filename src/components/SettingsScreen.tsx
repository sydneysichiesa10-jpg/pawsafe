import React, { useState } from 'react';
import { USER_AVATAR, PETS_DATA } from '../data/mockData';
import { Pet } from '../types';

interface SettingsScreenProps {
  favorites: string[];
  onSelectPet: (pet: Pet) => void;
  onNavigateToAdopt: () => void;
  currentLocation: string;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  favorites,
  onSelectPet,
  onNavigateToAdopt,
  currentLocation,
}) => {
  const [fosterAvailable, setFosterAvailable] = useState(true);
  const [alertRadius, setAlertRadius] = useState(5);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [activeFirstAid, setActiveFirstAid] = useState<number | null>(null);

  const favoritedPets = PETS_DATA.filter((p) => favorites.includes(p.id));

  const firstAidTips = [
    {
      title: 'Approaching a Frightened Stray',
      content:
        'Turn your body sideways to avoid looking confrontational. Avoid direct eye contact. Crouch down low and toss soft, high-value treats without reaching your hand forward.',
    },
    {
      title: 'Heatstroke / Dehydration Triage in Tropical Climate',
      content:
        'Move the animal into shade or air conditioning immediately. Wet paw pads and groin with cool (NOT ice-cold) water. Offer small sips of cool water; do not force drinking.',
    },
    {
      title: 'Emergency Slip Lead from a Regular Leash',
      content:
        'Thread the clip end through the leash handle loop to form a quick slip collar. Gently toss loop over the dog’s head to safely secure them without touching the neck.',
    },
    {
      title: 'Injured Cat / Feline Triage Protocol',
      content:
        'Wrap the cat securely in a thick towel or blanket ("burrito wrap") to protect both claws and spine. Transport in a dark, ventilated box or carrier to minimize auditory stress.',
    },
    {
      title: 'Found Reptile or Tortoise on Roadway',
      content:
        'Always move tortoises in the exact direction they were heading. Hold firmly with both hands on the sides of the shell (carapace). Keep dry and at room temperature; do not submerge in cold water.',
    },
    {
      title: 'Fallen or Stunned Bird Care',
      content:
        'Place the bird in a quiet, dark box with air holes and paper towels. Keep in a warm room away from cats and noise. Never force water down their beak.',
    },
  ];

  return (
    <div className="flex flex-col w-full pb-32 animate-fadeIn max-w-md mx-auto px-4 sm:px-5 pt-2 space-y-4">
      {/* Title */}
      <div>
        <h1 className="text-[22px] font-bold text-[#141d1a] tracking-tight">Rescuer Hub &amp; Settings</h1>
        <p className="text-[13px] text-[#404944]">Sydney Sichiesa • PawSafe Volunteer Indonesia</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#e6f0eb] space-y-4">
        <div className="flex items-center gap-3.5">
          <img
            src={USER_AVATAR}
            alt="Sydney Sichiesa"
            className="w-16 h-16 rounded-full object-cover ring-4 ring-[#aff0d2] shadow-sm"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-[18px] font-bold text-[#141d1a]">Sydney Sichiesa</h2>
              <span className="material-symbols-outlined text-[18px] text-[#004732] icon-filled">
                verified
              </span>
            </div>
            <p className="text-[13px] text-[#404944]">Volunteer Rescuer &amp; Foster</p>
            <p className="text-[12px] text-[#004732] font-semibold flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              {currentLocation}
            </p>
          </div>
        </div>

        {/* Rescuer Stats Bento */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#f2fcf6]">
          <div className="bg-[#ecf6f1] p-2.5 rounded-2xl text-center">
            <p className="text-[18px] font-bold text-[#004732]">12</p>
            <p className="text-[11px] text-[#404944] font-medium">Rescues Assisted</p>
          </div>
          <div className="bg-[#ecf6f1] p-2.5 rounded-2xl text-center">
            <p className="text-[18px] font-bold text-[#004732]">4</p>
            <p className="text-[11px] text-[#404944] font-medium">Pets Fostered</p>
          </div>
          <div className="bg-[#ecf6f1] p-2.5 rounded-2xl text-center">
            <p className="text-[18px] font-bold text-[#004732]">100%</p>
            <p className="text-[11px] text-[#404944] font-medium">Response Rate</p>
          </div>
        </div>
      </div>

      {/* Foster Availability Switch */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#e6f0eb] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#004732]">home</span>
            <h3 className="text-[15px] font-bold text-[#141d1a]">Foster Readiness</h3>
          </div>
          <p className="text-[13px] text-[#404944] mt-0.5">
            {fosterAvailable
              ? 'Available to take emergency temporary foster pups'
              : 'Foster home currently at full capacity'}
          </p>
        </div>
        <button
          onClick={() => setFosterAvailable(!fosterAvailable)}
          className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
            fosterAvailable ? 'bg-[#004732]' : 'bg-[#dbe5e0]'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
              fosterAvailable ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Saved / Favorited Pets */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#e6f0eb] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#a13e28] icon-filled">
              favorite
            </span>
            <h3 className="text-[16px] font-bold text-[#141d1a]">Saved Pets ({favoritedPets.length})</h3>
          </div>
          {favoritedPets.length > 0 && (
            <button
              onClick={onNavigateToAdopt}
              className="text-[12px] text-[#004732] font-bold hover:underline cursor-pointer"
            >
              Go to Adopt Tab
            </button>
          )}
        </div>

        {favoritedPets.length === 0 ? (
          <p className="text-[13px] text-[#707973] py-2">
            You haven't saved any pets yet. Tap the heart icon on Barnaby or any pal to save them here!
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {favoritedPets.map((pet) => (
              <div
                key={pet.id}
                onClick={() => {
                  onSelectPet(pet);
                  onNavigateToAdopt();
                }}
                className="bg-[#ecf6f1] rounded-2xl p-2.5 flex items-center gap-2.5 cursor-pointer hover:bg-[#e0eae5] transition-all group"
              >
                <img
                  src={pet.photos[0]}
                  alt={pet.name}
                  className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0">
                  <h4 className="text-[13px] font-bold text-[#141d1a] truncate">{pet.name}</h4>
                  <p className="text-[11px] text-[#404944] truncate">{pet.breed}</p>
                  <span className="text-[10px] text-[#004732] font-bold">Adoptable →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dispatch Radar Settings */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#e6f0eb] space-y-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-[#004732]">tune</span>
          <h3 className="text-[16px] font-bold text-[#141d1a]">Emergency Dispatch Settings</h3>
        </div>

        {/* Radius slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-[#404944]">Alert Broadcast Radius</span>
            <span className="font-bold text-[#004732]">{alertRadius} km</span>
          </div>
          <input
            type="range"
            min="1"
            max="15"
            value={alertRadius}
            onChange={(e) => setAlertRadius(Number(e.target.value))}
            className="w-full accent-[#004732] cursor-pointer"
          />
        </div>

        {/* SMS Urgent notifications toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-[#f2fcf6]">
          <div>
            <p className="text-[13px] font-bold text-[#141d1a]">SMS for Critical SOS</p>
            <p className="text-[11px] text-[#404944]">Receive immediate text for injured animals</p>
          </div>
          <button
            onClick={() => setSmsAlerts(!smsAlerts)}
            className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
              smsAlerts ? 'bg-[#004732]' : 'bg-[#dbe5e0]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                smsAlerts ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Animal First Aid Quick Reference */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#e6f0eb] space-y-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-[#004732]">medical_information</span>
          <h3 className="text-[16px] font-bold text-[#141d1a]">Stray First Aid Quick Reference</h3>
        </div>

        <div className="space-y-2">
          {firstAidTips.map((tip, idx) => {
            const isOpen = activeFirstAid === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#e6f0eb] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFirstAid(isOpen ? null : idx)}
                  className="w-full p-3 bg-[#ecf6f1] text-left flex items-center justify-between text-[13px] font-bold text-[#141d1a] cursor-pointer"
                >
                  <span>{tip.title}</span>
                  <span className="material-symbols-outlined text-[18px] text-[#004732]">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {isOpen && (
                  <div className="p-3 bg-white text-[13px] text-[#404944] leading-relaxed border-t border-[#e6f0eb]">
                    {tip.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
