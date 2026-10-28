import React, { useState } from 'react';
import { INDONESIAN_CITIES, IndonesianCityZone } from '../../data/mockData';

interface LocationModalProps {
  currentLocation: string;
  onSelectLocation: (loc: string) => void;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  currentLocation,
  onSelectLocation,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const regions = ['All', 'Jawa', 'Bali & Nusa Tenggara', 'Sumatera', 'Sulawesi & Kalimantan'];

  const filteredCities: IndonesianCityZone[] = INDONESIAN_CITIES.filter((city) => {
    const matchesSearch =
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.province.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || city.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full sm:max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl space-y-4 text-left border border-[#e6f0eb] max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#f2fcf6]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#aff0d2]/50 text-[#004732] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">near_me</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-[18px] font-bold text-[#141d1a]">Rescue Zone</h3>
                <span className="text-[11px] font-bold bg-[#ecf6f1] text-[#004732] px-2 py-0.5 rounded-full">
                  Indonesia
                </span>
              </div>
              <p className="text-[12px] text-[#404944]">Select active city &amp; volunteer hub</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ecf6f1] text-[#404944] hover:text-[#141d1a] flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#707973]">
            search
          </span>
          <input
            type="text"
            placeholder="Search Indonesian cities or provinces..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-2xl bg-[#ecf6f1] border border-transparent focus:border-[#004732] text-[13px] text-[#141d1a] placeholder-[#707973] outline-none"
          />
        </div>

        {/* Region filter chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedRegion === reg
                  ? 'bg-[#004732] text-white shadow-sm'
                  : 'bg-[#ecf6f1] text-[#404944] hover:bg-[#e0eae5]'
              }`}
            >
              {reg === 'All' ? 'All Regions' : reg}
            </button>
          ))}
        </div>

        {/* Cities list */}
        <div className="space-y-2 overflow-y-auto flex-1 pr-1">
          {filteredCities.map((city) => {
            const isSelected = currentLocation === city.name;
            return (
              <button
                key={city.name}
                onClick={() => {
                  onSelectLocation(city.name);
                  onClose();
                }}
                className={`w-full p-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer text-left border ${
                  isSelected
                    ? 'bg-[#004732] text-white font-bold shadow-sm border-[#004732]'
                    : 'bg-[#ecf6f1] text-[#141d1a] border-transparent hover:bg-[#e0eae5]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[20px] flex-shrink-0 ${
                      isSelected ? 'text-[#aff0d2]' : 'text-[#004732]'
                    }`}
                  >
                    location_on
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[14px] font-bold leading-tight truncate">{city.name}</span>
                    </div>
                    <p
                      className={`text-[12px] truncate mt-0.5 ${
                        isSelected ? 'text-[#aff0d2]' : 'text-[#404944]'
                      }`}
                    >
                      {city.province} • {city.activeVolunteers} active volunteers
                    </p>
                  </div>
                </div>

                {isSelected ? (
                  <span className="w-6 h-6 rounded-full bg-[#aff0d2] text-[#002115] flex items-center justify-center flex-shrink-0 shadow-sm ml-2">
                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-[#707973] font-semibold flex-shrink-0 ml-2">
                    Switch
                  </span>
                )}
              </button>
            );
          })}

          {filteredCities.length === 0 && (
            <div className="py-8 text-center text-[#707973] text-[13px]">
              No Indonesian rescue zone found matching "{searchQuery}".
            </div>
          )}
        </div>

        {/* Footer info note */}
        <div className="pt-2 border-t border-[#f2fcf6] flex items-center gap-2 text-[11px] text-[#707973]">
          <span className="material-symbols-outlined text-[16px] text-[#004732]">info</span>
          <span>Switching your city realigns volunteer radar alerts and emergency transport.</span>
        </div>
      </div>
    </div>
  );
};
