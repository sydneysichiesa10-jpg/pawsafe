import React, { useState } from 'react';
import { Pet } from '../types';
import { PETS_DATA } from '../data/mockData';

interface AdoptScreenProps {
  selectedPet: Pet;
  onSelectPet: (pet: Pet) => void;
  favorites: string[];
  onToggleFavorite: (petId: string) => void;
  onOpenApply: (pet: Pet) => void;
  onOpenSchedule: (pet: Pet) => void;
  onOpenCoordinator: (pet: Pet) => void;
  onOpenDirections: (address: string) => void;
  onCallPhone: (phone: string) => void;
}

export const AdoptScreen: React.FC<AdoptScreenProps> = ({
  selectedPet,
  onSelectPet,
  favorites,
  onToggleFavorite,
  onOpenApply,
  onOpenSchedule,
  onOpenCoordinator,
  onOpenDirections,
  onCallPhone,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllPetsView, setShowAllPetsView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  type CategoryFilter = 'All' | 'Dogs' | 'Cats' | 'Reptiles' | 'Birds & Small' | 'In Foster';
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isFav = favorites.includes(selectedPet.id);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Adopt ${selectedPet.name} on PawSafe`,
          text: `Meet ${selectedPet.name}! A ${selectedPet.ageShort} sweet ${selectedPet.breed} ready for a loving home.`,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setToastMessage(`Link to ${selectedPet.name}'s profile copied!`);
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const filteredPets = PETS_DATA.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.temperamentTags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeCategory === 'All') return matchesSearch;
    if (activeCategory === 'Dogs') return matchesSearch && pet.species === 'dog';
    if (activeCategory === 'Cats') return matchesSearch && pet.species === 'cat';
    if (activeCategory === 'Reptiles') return matchesSearch && pet.species === 'reptile';
    if (activeCategory === 'Birds & Small') return matchesSearch && (pet.species === 'bird' || pet.species === 'small-animal');
    if (activeCategory === 'In Foster') return matchesSearch && pet.status === 'In Foster';
    return matchesSearch;
  });

  // If "Browse All Adoptable Pets" mode is active
  if (showAllPetsView) {
    return (
      <div className="flex flex-col w-full px-4 sm:px-5 pt-3 pb-32 animate-fadeIn">
        {/* Back header */}
        <div className="flex items-center justify-between pb-3">
          <button
            onClick={() => setShowAllPetsView(false)}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#ecf6f1] text-[#004732] hover:bg-[#e6f0eb] transition-all active:scale-95 shadow-sm cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span className="text-[13px] font-semibold">Back to {selectedPet.name}</span>
          </button>
          <span className="text-[13px] text-[#404944] font-medium">
            {filteredPets.length} adoptable pets nearby
          </span>
        </div>

        {/* Search input */}
        <div className="relative mb-3">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-[#707973]">
            search
          </span>
          <input
            type="text"
            placeholder="Search by breed, name, or vibe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-2xl bg-white border border-[#dbe5e0] focus:border-[#004732] focus:ring-1 focus:ring-[#004732] text-[14px] text-[#141d1a] placeholder-[#707973] outline-none shadow-sm"
          />
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-3">
          {(['All', 'Dogs', 'Cats', 'Reptiles', 'Birds & Small', 'In Foster'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#004732] text-white shadow-sm'
                  : 'bg-white text-[#404944] hover:bg-[#ecf6f1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredPets.map((pet) => {
            const petFav = favorites.includes(pet.id);
            return (
              <div
                key={pet.id}
                onClick={() => {
                  onSelectPet(pet);
                  setShowAllPetsView(false);
                  setCurrentSlide(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group border border-[#e6f0eb]/70"
              >
                <div className="h-48 relative overflow-hidden bg-[#e0eae5]">
                  <img
                    src={pet.photos[0]}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#004732] shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#004732] animate-pulse" />
                      {pet.badges[0]}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(pet.id);
                    }}
                    className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#404944] hover:text-[#a13e28] transition-colors shadow-sm cursor-pointer"
                  >
                    <span className={`material-symbols-outlined text-[18px] ${petFav ? 'icon-filled text-[#a13e28]' : ''}`}>
                      favorite
                    </span>
                  </button>
                  <div className="absolute bottom-2.5 left-3 right-3 text-white drop-shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[20px] font-bold leading-tight">{pet.name}</h3>
                      <span className="text-[12px] font-semibold bg-[#004732]/80 backdrop-blur-md px-2 py-0.5 rounded-full">
                        {pet.ageShort}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-[13px] text-[#404944]">
                    <span className="font-medium text-[#141d1a]">{pet.breed}</span>
                    <span className="text-[12px] flex items-center gap-1 text-[#707973]">
                      <span className="material-symbols-outlined text-[14px] text-[#004732]">location_on</span>
                      {pet.shelter.campus}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {pet.temperamentTags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full bg-[#ecf6f1] text-[#09513b] text-[11px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-1 flex items-center justify-between border-t border-[#f2fcf6]">
                    <span className="text-[12px] font-bold text-[#004732]">
                      Fee: {pet.shelter.fee.includes('(') ? pet.shelter.fee.split('(')[0].trim() : pet.shelter.fee}
                    </span>
                    <span className="text-[12px] font-semibold text-[#004732] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      View Profile
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-20 inset-x-4 max-w-sm mx-auto z-50 bg-[#004732] text-white px-4 py-2.5 rounded-full shadow-lg text-[13px] font-semibold text-center animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Interactive Bar / Nav Header */}
      <div className="px-4 sm:px-5 pt-2 pb-3 flex items-center justify-between max-w-md mx-auto w-full">
        <button
          onClick={() => setShowAllPetsView(true)}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#ecf6f1] text-[#004732] hover:bg-[#e6f0eb] transition-all active:scale-95 shadow-sm cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span className="text-[13px] font-semibold">Adopt Pets</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Favorite Heart Toggle */}
          <button
            aria-label="Save to favorites"
            onClick={() => onToggleFavorite(selectedPet.id)}
            className={`w-10 h-10 rounded-full bg-[#ecf6f1] flex items-center justify-center transition-all active:scale-90 shadow-sm cursor-pointer ${
              isFav ? 'text-[#a13e28]' : 'text-[#404944] hover:text-[#a13e28]'
            }`}
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                isFav ? 'icon-filled scale-110 text-[#a13e28]' : ''
              }`}
            >
              favorite
            </span>
          </button>

          {/* Share Button */}
          <button
            aria-label={`Share ${selectedPet.name}`}
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-[#ecf6f1] text-[#404944] hover:text-[#004732] flex items-center justify-center transition-all active:scale-90 shadow-sm cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-5 space-y-4 max-w-md mx-auto w-full">
        {/* Gallery Carousel Container */}
        <div className="relative w-full rounded-[28px] overflow-hidden bg-[#e0eae5] shadow-sm group">
          <div
            className="w-full h-80 relative flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {selectedPet.photos.map((photoUrl, idx) => (
              <div key={idx} className="min-w-full h-full relative">
                <img
                  className="w-full h-full object-cover"
                  alt={selectedPet.photoAlts[idx] || `${selectedPet.name} photo ${idx + 1}`}
                  src={photoUrl}
                />
              </div>
            ))}
          </div>

          {/* Scrim Overlays */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#29322f]/40 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#29322f]/60 via-[#29322f]/20 to-transparent pointer-events-none" />

          {/* Floating Badges Top */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#004732] animate-pulse" />
              <span className="text-[11px] font-bold text-[#004732] tracking-wide uppercase">
                {selectedPet.badges[0] || 'Ready for Home'}
              </span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#141d1a] shadow-sm">
              <span className="material-symbols-outlined text-[15px] text-[#613000] icon-filled">
                verified
              </span>
              <span className="text-[11px] font-bold">Adoptable</span>
            </span>
          </div>

          {/* Hero Identity & Carousel Dots Bottom */}
          <div className="absolute bottom-3.5 inset-x-4 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[26px] sm:text-[28px] font-bold text-white drop-shadow-sm leading-tight">
                  {selectedPet.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#aff0d2] text-[#002115] text-[11px] font-bold shadow-sm">
                  {selectedPet.ageShort} • {selectedPet.gender}
                </span>
              </div>
              <p className="text-[13px] text-[#ecf6f1] flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[15px] text-[#ffdad2]">
                  location_on
                </span>
                {selectedPet.location} • {selectedPet.rescuedTime}
              </p>
            </div>

            {/* Carousel Dots */}
            <div className="flex items-center gap-1.5 bg-[#29322f]/40 backdrop-blur-md px-2.5 py-1.5 rounded-full">
              {selectedPet.photos.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Photo ${idx + 1}`}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx ? 'bg-white w-4' : 'bg-white/40 w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Vital Stats Bento Grid */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white p-3 rounded-2xl flex flex-col items-center text-center shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-[#004732] mb-1">
              pets
            </span>
            <span className="text-[11px] font-bold text-[#404944]">Breed</span>
            <span className="text-[13px] text-[#141d1a] font-semibold truncate w-full mt-0.5">
              {selectedPet.breed}
            </span>
          </div>

          <div className="bg-white p-3 rounded-2xl flex flex-col items-center text-center shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-[#004732] mb-1">
              cake
            </span>
            <span className="text-[11px] font-bold text-[#404944]">Age</span>
            <span className="text-[13px] text-[#141d1a] font-semibold truncate w-full mt-0.5">
              {selectedPet.age}
            </span>
          </div>

          <div className="bg-white p-3 rounded-2xl flex flex-col items-center text-center shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-[#004732] mb-1">
              monitor_weight
            </span>
            <span className="text-[11px] font-bold text-[#404944]">Weight</span>
            <span className="text-[13px] text-[#141d1a] font-semibold truncate w-full mt-0.5">
              {selectedPet.weight}
            </span>
          </div>

          <div className="bg-white p-3 rounded-2xl flex flex-col items-center text-center shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-[#004732] mb-1">
              straighten
            </span>
            <span className="text-[11px] font-bold text-[#404944]">Size</span>
            <span className="text-[13px] text-[#141d1a] font-semibold truncate w-full mt-0.5">
              {selectedPet.size}
            </span>
          </div>
        </div>

        {/* Temperament & Tags */}
        <div className="bg-white rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#004732]">
              psychology
            </span>
            <h2 className="text-[18px] font-semibold text-[#141d1a]">
              Temperament &amp; Vibes
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedPet.temperamentTags.map((tag, idx) => {
              // Highlight certain tags with custom colors
              let bgStyle = "bg-[#e6f0eb] text-[#141d1a]";
              let iconName = "favorite";
              if (tag === 'Gentle Soul') {
                bgStyle = "bg-[#aff0d2]/40 text-[#09513b]";
                iconName = "favorite";
              } else if (tag === 'Housebroken') {
                bgStyle = "bg-[#ffdad2]/50 text-[#822714]";
                iconName = "home";
              } else if (tag === 'Kid Loving') {
                iconName = "family_restroom";
              } else if (tag === 'Dog Friendly') {
                iconName = "group";
              } else if (tag === 'Leash Trained') {
                iconName = "directions_walk";
              } else if (tag === 'Couch Potato') {
                iconName = "bed";
              } else {
                iconName = "verified";
              }

              return (
                <span
                  key={idx}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] font-semibold ${bgStyle}`}
                >
                  <span className="material-symbols-outlined text-[15px]">{iconName}</span>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>

        {/* Story Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#004732]">
                auto_stories
              </span>
              <h2 className="text-[18px] font-semibold text-[#141d1a]">
                {selectedPet.name}'s Story
              </h2>
            </div>
            <span className="text-[11px] font-bold text-[#004732] bg-[#aff0d2]/40 px-2 py-0.5 rounded-full">
              Rescuer Favorite
            </span>
          </div>

          {selectedPet.story.map((paragraph, i) => (
            <p key={i} className="text-[15px] text-[#404944] leading-relaxed">
              {paragraph}
            </p>
          ))}

          <div className="bg-[#ecf6f1] rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1e5f48] text-white flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">thumb_up</span>
            </div>
            <div className="min-w-0">
              <h3 className="text-[13px] text-[#141d1a] font-semibold">Best Match For</h3>
              <p className="text-[13px] text-[#404944] truncate">{selectedPet.bestMatchFor}</p>
            </div>
          </div>
        </div>

        {/* Verified Health Passport */}
        <div className="bg-white rounded-3xl p-5 shadow-sm space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#004732]">
                health_and_safety
              </span>
              <h2 className="text-[18px] font-semibold text-[#141d1a]">
                Verified Health Passport
              </h2>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#004732] font-bold">
              <span className="material-symbols-outlined text-[14px] icon-filled">verified</span>
              100% Cleared
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {selectedPet.healthPassport.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#ecf6f1]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-[#004732]">
                    {item.icon}
                  </span>
                  <span className="text-[13px] font-medium text-[#141d1a]">{item.name}</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#aff0d2] text-[#002115]">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shelter & Adoption Organization Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-[#004732]/10 text-[#004732] text-[11px] font-bold">
                  {selectedPet.shelter.type}
                </span>
                <span className="text-[11px] text-[#404944]">• {selectedPet.shelter.city}</span>
              </div>
              <h2 className="text-[18px] text-[#141d1a] font-bold truncate">
                {selectedPet.shelter.name}
              </h2>
              <p className="text-[13px] text-[#404944] mt-0.5">
                {selectedPet.shelter.campus} • {selectedPet.shelter.distance}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#e6f0eb] flex items-center justify-center flex-shrink-0 text-[#004732] shadow-sm">
              <span className="material-symbols-outlined text-[26px]">flip_camera_ios</span>
            </div>
          </div>

          {/* Static Map Snippet */}
          <div
            onClick={() => onOpenDirections(selectedPet.shelter.address)}
            className="relative rounded-2xl overflow-hidden h-32 bg-[#e6f0eb] shadow-inner cursor-pointer group"
          >
            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url('${selectedPet.shelter.mapImage}')` }}
            />
            <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="material-symbols-outlined text-[16px] text-[#a13e28]">
                  pin_drop
                </span>
                <span className="text-[11px] font-medium text-[#141d1a] truncate">
                  {selectedPet.shelter.address}
                </span>
              </div>
              <span className="text-[11px] text-[#004732] font-bold whitespace-nowrap group-hover:underline">
                Directions
              </span>
            </div>
          </div>

          {/* Hours & Fee Breakdown */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#ecf6f1] p-3 rounded-2xl">
              <div className="flex items-center gap-1.5 text-[#404944] mb-1">
                <span className="material-symbols-outlined text-[16px] text-[#004732]">
                  schedule
                </span>
                <span className="text-[11px] font-bold">Hours</span>
              </div>
              <p className="text-[13px] font-bold text-[#141d1a]">Open Today</p>
              <p className="text-[13px] text-[#404944]">{selectedPet.shelter.hours.split('•')[1] || '10:00 AM – 6:00 PM'}</p>
            </div>

            <div className="bg-[#ecf6f1] p-3 rounded-2xl">
              <div className="flex items-center gap-1.5 text-[#404944] mb-1">
                <span className="material-symbols-outlined text-[16px] text-[#613000]">
                  payments
                </span>
                <span className="text-[11px] font-bold">Adoption Fee</span>
              </div>
              <p className="text-[13px] font-bold text-[#141d1a]">
                {selectedPet.shelter.fee.includes('(') ? selectedPet.shelter.fee.split('(')[0].trim() : selectedPet.shelter.fee}
              </p>
              <p className="text-[13px] text-[#404944]">Includes chip &amp; care</p>
            </div>
          </div>

          {/* Quick Contact Actions */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onCallPhone(selectedPet.shelter.phone)}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-[#e6f0eb] text-[#141d1a] hover:bg-[#e0eae5] transition-colors text-[13px] font-semibold cursor-pointer active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>Call Shelter</span>
            </button>
            <button
              onClick={() => onOpenCoordinator(selectedPet)}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-[#e6f0eb] text-[#141d1a] hover:bg-[#e0eae5] transition-colors text-[13px] font-semibold cursor-pointer active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Coordinator</span>
            </button>
          </div>
        </div>

        {/* Adoption Roadmap Steps */}
        <div className="bg-white rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#004732]">
                route
              </span>
              <h2 className="text-[18px] font-semibold text-[#141d1a]">
                Simple Adoption Path
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-[#404944]">4 quick steps</span>
          </div>

          <div className="space-y-3 relative before:absolute before:left-4 before:top-2 before:bottom-3 before:w-0.5 before:bg-[#dbe5e0]">
            {selectedPet.roadmapSteps.map((stepItem) => (
              <div key={stepItem.step} className="flex items-start gap-3.5 relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0 z-10 shadow-sm ${
                    stepItem.step === 1
                      ? 'bg-[#004732] text-white'
                      : 'bg-[#e6f0eb] text-[#004732]'
                  }`}
                >
                  {stepItem.step}
                </div>
                <div className="pt-0.5 min-w-0">
                  <h3 className="text-[15px] font-bold text-[#141d1a]">{stepItem.title}</h3>
                  <p className="text-[13px] text-[#404944] mt-0.5">{stepItem.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reassurance Banner */}
        <div className="bg-[#004732]/5 rounded-2xl p-4 flex items-center gap-3 shadow-none border border-[#004732]/10">
          <span className="material-symbols-outlined text-[24px] text-[#004732] flex-shrink-0">
            volunteer_activism
          </span>
          <p className="text-[13px] text-[#404944] leading-relaxed">
            Every adoption through PawSafe includes 30 days of complimentary pet insurance and free vet initial exam.
          </p>
        </div>

        {/* More Adoptable Pals Carousel / Mini Cards */}
        <div className="bg-white rounded-3xl p-5 shadow-sm space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#004732]">
                pets
              </span>
              <h2 className="text-[18px] font-semibold text-[#141d1a]">
                More Adoptable Pals
              </h2>
            </div>
            <button
              onClick={() => setShowAllPetsView(true)}
              type="button"
              className="text-[11px] text-[#004732] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>View All</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <p className="text-[13px] text-[#404944]">
            Looking for another companion or friend for {selectedPet.name}? Meet other rescue animals (dogs, cats, reptiles &amp; birds) nearby:
          </p>

          <div className="grid grid-cols-4 gap-2 pt-1">
            {PETS_DATA.filter((p) => p.id !== selectedPet.id)
              .slice(0, 4)
              .map((pal) => (
                <div
                  key={pal.id}
                  onClick={() => {
                    onSelectPet(pal);
                    setCurrentSlide(0);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#ecf6f1] rounded-2xl p-2.5 flex flex-col items-center text-center group cursor-pointer hover:bg-[#e6f0eb] transition-all active:scale-95"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden mb-1.5 ring-2 ring-[#004732]/20 shadow-sm">
                    <img
                      src={pal.photos[0]}
                      alt={pal.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[13px] text-[#141d1a] font-bold truncate w-full">
                    {pal.name}
                  </span>
                  <span className="text-[11px] text-[#404944] truncate w-full">
                    {pal.badges[0]}
                  </span>
                  <span className={`mt-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    pal.status === 'In Foster'
                      ? 'bg-[#ffdad2] text-[#822714]'
                      : 'bg-[#aff0d2] text-[#002115]'
                  }`}>
                    {pal.status === 'In Foster' ? 'Foster' : 'Adoptable'}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="pt-2 pb-2 space-y-2.5">
          <button
            onClick={() => onOpenApply(selectedPet)}
            className="w-full h-13 py-3.5 px-6 rounded-full bg-[#004732] hover:bg-[#1e5f48] text-white transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2 cursor-pointer font-bold text-[15px] tracking-wide"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
            <span>Apply to Adopt {selectedPet.name}</span>
          </button>

          <button
            onClick={() => onOpenSchedule(selectedPet)}
            className="w-full h-12 py-3 px-6 rounded-full bg-[#ecf6f1] hover:bg-[#e6f0eb] text-[#141d1a] transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer font-semibold text-[15px]"
            type="button"
          >
            <span className="material-symbols-outlined text-[19px] text-[#004732]">
              calendar_month
            </span>
            <span>Schedule Meet &amp; Greet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
