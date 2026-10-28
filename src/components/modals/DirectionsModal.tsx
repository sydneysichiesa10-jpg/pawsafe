import React, { useState } from 'react';

interface DirectionsModalProps {
  destination: string;
  onClose: () => void;
  onCallPhone?: (phone: string) => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({
  destination,
  onClose,
  onCallPhone,
}) => {
  const [transitMode, setTransitMode] = useState<'drive' | 'bike' | 'transit'>('drive');

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full sm:max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl space-y-4 text-left border border-[#e6f0eb]">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#f2fcf6]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#004732]">
              directions
            </span>
            <div>
              <h3 className="text-[18px] font-bold text-[#141d1a]">Directions</h3>
              <p className="text-[12px] text-[#404944] truncate max-w-[240px]">{destination}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ecf6f1] text-[#404944] hover:text-[#141d1a] flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Transit Mode Selector */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'drive', label: 'Drive', time: '6 min', icon: 'directions_car' },
            { id: 'bike', label: 'Bike', time: '14 min', icon: 'directions_bike' },
            { id: 'transit', label: 'Transit', time: '22 min', icon: 'directions_bus' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setTransitMode(mode.id as any)}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer border ${
                transitMode === mode.id
                  ? 'bg-[#004732] text-white border-[#004732] shadow-sm font-bold'
                  : 'bg-[#ecf6f1] text-[#404944] border-transparent hover:bg-[#e0eae5]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] mb-0.5">{mode.icon}</span>
              <span className="text-[12px]">{mode.label}</span>
              <span className="text-[10px] opacity-80">{mode.time}</span>
            </button>
          ))}
        </div>

        {/* Route Steps */}
        <div className="space-y-2.5 bg-[#ecf6f1] p-4 rounded-2xl">
          <div className="flex items-start gap-2.5 text-[13px]">
            <span className="material-symbols-outlined text-[18px] text-[#004732] flex-shrink-0 mt-0.5">
              navigation
            </span>
            <div>
              <p className="font-bold text-[#141d1a]">Head along main avenue toward destination</p>
              <p className="text-[11px] text-[#707973]">0.6 km</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-[13px]">
            <span className="material-symbols-outlined text-[18px] text-[#004732] flex-shrink-0 mt-0.5">
              turn_left
            </span>
            <div>
              <p className="font-bold text-[#141d1a]">Follow navigation toward rescue center</p>
              <p className="text-[11px] text-[#707973]">0.8 km</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-[13px]">
            <span className="material-symbols-outlined text-[18px] text-[#a13e28] flex-shrink-0 mt-0.5">
              pin_drop
            </span>
            <div>
              <p className="font-bold text-[#141d1a]">Arrive at destination</p>
              <p className="text-[11px] text-[#707973]">{destination}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-full bg-[#004732] hover:bg-[#1e5f48] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
            <span>Google Maps</span>
          </a>

          {onCallPhone ? (
            <button
              onClick={() => onCallPhone('(512) 555-PAWS')}
              className="py-3 px-4 rounded-full bg-[#ecf6f1] hover:bg-[#e0eae5] text-[#141d1a] text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#004732]">call</span>
              <span>Call Ahead</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="py-3 px-4 rounded-full bg-[#ecf6f1] hover:bg-[#e0eae5] text-[#141d1a] text-[13px] font-semibold flex items-center justify-center cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
