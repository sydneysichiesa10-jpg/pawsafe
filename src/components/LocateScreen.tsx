import React, { useState } from 'react';
import { EmergencyClinic } from '../types';
import { EMERGENCY_CLINICS } from '../data/mockData';

interface LocateScreenProps {
  onCallPhone: (phone: string) => void;
  onOpenDirections: (address: string) => void;
}

export const LocateScreen: React.FC<LocateScreenProps> = ({ onCallPhone, onOpenDirections }) => {
  const [clinics] = useState<EmergencyClinic[]>(EMERGENCY_CLINICS);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', '24/7 Emergency', 'Shelter Partner', 'Low-Cost Vet', 'Microchip Station'];

  const filteredClinics = clinics.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase()) ||
      c.services.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    if (activeCategory === 'All') return matchesSearch;
    return matchesSearch && c.category === activeCategory;
  });

  return (
    <div className="flex flex-col w-full pb-32 animate-fadeIn max-w-md mx-auto px-4 sm:px-5 pt-2">
      {/* Title */}
      <div className="pb-3">
        <h1 className="text-[22px] font-bold text-[#141d1a] tracking-tight flex items-center gap-2">
          Locate Care &amp; Shelters
          <span className="material-symbols-outlined text-[22px] text-[#004732]">local_hospital</span>
        </h1>
        <p className="text-[13px] text-[#404944]">
          24/7 emergency veterinary clinics, shelters, and microchip scanners
        </p>
      </div>

      {/* Free Microchip Scanner Help Banner */}
      <div className="bg-[#aff0d2]/30 border border-[#aff0d2] rounded-3xl p-4 mb-4 flex items-start gap-3 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-[#004732] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[22px]">qr_code_scanner</span>
        </div>
        <div className="min-w-0">
          <h2 className="text-[14px] font-bold text-[#004732]">Found a stray pet?</h2>
          <p className="text-[12px] text-[#404944] mt-0.5 leading-relaxed">
            All listed shelters and stations provide <strong>free microchip scanning</strong>. No appointment needed.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-[#707973]">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by clinic name, service, or street..."
          className="w-full h-11 pl-10 pr-4 rounded-2xl bg-white border border-[#dbe5e0] focus:border-[#004732] focus:ring-1 focus:ring-[#004732] text-[14px] text-[#141d1a] placeholder-[#707973] outline-none shadow-sm"
        />
      </div>

      {/* Filter Categories */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#004732] text-white shadow-sm'
                : 'bg-white text-[#404944] border border-[#dbe5e0] hover:bg-[#ecf6f1]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Clinics List */}
      <div className="space-y-3.5">
        {filteredClinics.map((clinic) => {
          const is24h = clinic.category === '24/7 Emergency';
          return (
            <div
              key={clinic.id}
              className="bg-white rounded-3xl p-5 shadow-sm border border-[#e6f0eb] space-y-3 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        is24h
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : clinic.category === 'Microchip Station'
                          ? 'bg-[#aff0d2] text-[#002115]'
                          : 'bg-[#ecf6f1] text-[#004732]'
                      }`}
                    >
                      {clinic.category}
                    </span>
                    <span className="text-[11px] text-[#404944] font-medium">• {clinic.distance}</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-[#141d1a] leading-snug">
                    {clinic.name}
                  </h3>
                  <p className="text-[13px] text-[#404944] mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#707973]">
                      pin_drop
                    </span>
                    {clinic.address}
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-[#f2fcf6] px-2 py-1 rounded-xl text-[12px] font-bold text-[#004732] flex-shrink-0">
                  <span className="material-symbols-outlined text-[14px] text-[#613000] icon-filled">
                    star
                  </span>
                  <span>{clinic.rating}</span>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-[#ecf6f1] px-3 py-2 rounded-2xl flex items-center gap-2 text-[12px]">
                <span className="material-symbols-outlined text-[16px] text-[#004732]">schedule</span>
                <span className="font-semibold text-[#141d1a]">{clinic.hours}</span>
              </div>

              {/* Services tags */}
              <div className="flex flex-wrap gap-1.5">
                {clinic.services.map((serv, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full bg-[#f2fcf6] text-[#09513b] text-[11px] font-medium border border-[#dbe5e0]/60"
                  >
                    {serv}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#f2fcf6]">
                <button
                  onClick={() => onCallPhone(clinic.phone)}
                  className="py-2.5 px-3 rounded-full bg-[#e6f0eb] hover:bg-[#e0eae5] text-[#141d1a] font-semibold text-[13px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#004732]">call</span>
                  <span>{clinic.phone}</span>
                </button>

                <button
                  onClick={() => onOpenDirections(clinic.address)}
                  className="py-2.5 px-3 rounded-full bg-[#004732] hover:bg-[#1e5f48] text-white font-bold text-[13px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">directions</span>
                  <span>Directions</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
