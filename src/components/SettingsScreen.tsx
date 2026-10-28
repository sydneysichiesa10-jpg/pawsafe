import React, { useState } from 'react';
import { PETS_DATA, SPECIES_FALLBACK_IMAGES } from '../data/mockData';
import { Pet, UserProfile } from '../types';

interface SettingsScreenProps {
  userProfile: UserProfile;
  onOpenAuth: () => void;
  onOpenEditProfile: () => void;
  onLogout: () => void;
  favorites: string[];
  onSelectPet: (pet: Pet) => void;
  onNavigateToAdopt: () => void;
  currentLocation: string;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  userProfile,
  onOpenAuth,
  onOpenEditProfile,
  onLogout,
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
        <p className="text-[13px] text-[#404944]">
          {userProfile.isLoggedIn
            ? `${userProfile.nickname} (@${userProfile.username}) • PawSafe Volunteer`
            : 'PawSafe Indonesia • Guest Mode (Optional Sign In)'}
        </p>
      </div>

      {/* Profile Card / Auth Card */}
      {userProfile.isLoggedIn ? (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#e6f0eb] space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.nickname}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-[#aff0d2] shadow-sm flex-shrink-0"
                />
                <button
                  type="button"
                  onClick={onOpenEditProfile}
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#004732] text-white flex items-center justify-center shadow-md hover:bg-[#003827] cursor-pointer"
                  title="Change photo"
                >
                  <span className="material-symbols-outlined text-[13px]">photo_camera</span>
                </button>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h2 className="text-[18px] font-bold text-[#141d1a] truncate">{userProfile.fullName}</h2>
                  <span className="material-symbols-outlined text-[18px] text-[#004732] icon-filled">
                    verified
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-[#404944] mt-0.5">
                  <span className="font-semibold text-[#004732]">@{userProfile.username}</span>
                  <span>•</span>
                  <span>Nickname: <strong className="text-[#141d1a]">{userProfile.nickname}</strong></span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-block text-[11px] font-semibold text-[#004732] bg-[#ecf6f1] px-2.5 py-0.5 rounded-full">
                    {userProfile.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* User Bio if present */}
          {userProfile.bio && (
            <p className="text-[12px] text-[#404944] bg-[#f2fcf6] p-2.5 rounded-2xl border border-[#e6f0eb]/60 leading-relaxed">
              "{userProfile.bio}"
            </p>
          )}

          {/* Profile Action Buttons */}
          <div className="flex items-center gap-2 pt-1 border-t border-[#f2fcf6]">
            <button
              type="button"
              onClick={onOpenEditProfile}
              className="flex-1 py-2 px-3 bg-[#ecf6f1] text-[#004732] hover:bg-[#e0eae5] rounded-2xl text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              <span>Edit Profile</span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="py-2 px-3.5 bg-[#f2fcf6] text-[#707973] hover:text-[#a13e28] hover:bg-[#faece7] rounded-2xl text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
              title="Sign Out to Guest Mode"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Sign Out</span>
            </button>
          </div>

          {/* Rescuer Stats Bento */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#f2fcf6]">
            <div className="bg-[#ecf6f1] p-2.5 rounded-2xl text-center">
              <p className="text-[18px] font-bold text-[#004732]">{userProfile.rescuesAssisted}</p>
              <p className="text-[11px] text-[#404944] font-medium">Rescues Assisted</p>
            </div>
            <div className="bg-[#ecf6f1] p-2.5 rounded-2xl text-center">
              <p className="text-[18px] font-bold text-[#004732]">{userProfile.petsFostered}</p>
              <p className="text-[11px] text-[#404944] font-medium">Pets Fostered</p>
            </div>
            <div className="bg-[#ecf6f1] p-2.5 rounded-2xl text-center">
              <p className="text-[18px] font-bold text-[#004732]">100%</p>
              <p className="text-[11px] text-[#404944] font-medium">Response Rate</p>
            </div>
          </div>
        </div>
      ) : (
        /* Guest Mode Card */
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#e6f0eb] space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-[#ecf6f1] text-[#004732] flex items-center justify-center flex-shrink-0 ring-4 ring-[#e6f0eb]">
              <span className="material-symbols-outlined text-[28px]">person_outline</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-[17px] font-bold text-[#141d1a]">Browsing as Guest</h2>
                <span className="text-[11px] font-semibold text-[#707973] bg-[#ecf6f1] px-2 py-0.5 rounded-full">
                  No sign in required
                </span>
              </div>
              <p className="text-[12px] text-[#404944] mt-0.5 leading-snug">
                You can browse pets, view radar sightings, and contact emergency triage freely.
              </p>
            </div>
          </div>

          <div className="p-3 bg-[#f2fcf6] rounded-2xl border border-[#aff0d2]/40 text-[12px] text-[#29322e] space-y-1">
            <p className="font-bold text-[#004732] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">stars</span>
              Optional perks when you sign in:
            </p>
            <p className="text-[#404944] pl-5">
              Customize your profile picture, nickname, unique username, and earn rescuer verification badges.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenAuth}
            className="w-full py-3 bg-[#004732] text-white rounded-2xl font-bold text-[14px] shadow-sm hover:bg-[#003827] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">login</span>
            <span>Sign In or Create Account</span>
          </button>
        </div>
      )}

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
          aria-label="Toggle Foster Readiness"
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
            You haven't saved any pets yet. Tap the heart icon on any pet profile to save them here!
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
                  onError={(e) => {
                    e.currentTarget.src = SPECIES_FALLBACK_IMAGES[pet.species] || SPECIES_FALLBACK_IMAGES.default;
                  }}
                  className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform bg-[#e0eae5]"
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
            aria-label="Toggle SMS for Critical SOS"
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

