import React, { useState } from 'react';
import { RadarSighting } from '../types';
import { RADAR_SIGHTINGS } from '../data/mockData';

interface RadarScreenProps {
  onOpenReport: () => void;
  onOpenDirections: (address: string) => void;
  currentLocation?: string;
}

export const RadarScreen: React.FC<RadarScreenProps> = ({
  onOpenReport,
  onOpenDirections,
  currentLocation = 'Jakarta (Selatan & Pusat)',
}) => {
  const [sightings, setSightings] = useState<RadarSighting[]>(RADAR_SIGHTINGS);
  const [selectedSighting, setSelectedSighting] = useState<RadarSighting | null>(sightings[0]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'urgent' | 'secured'>('all');
  const [respondedIds, setRespondedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'radar' | 'list'>('radar');

  const getAnimalIcon = (type: string) => {
    switch (type) {
      case 'dog':
      case 'puppies':
        return 'pets';
      case 'cat':
        return 'cruelty_free';
      case 'reptile':
        return 'pest_control';
      case 'bird':
        return 'flutter';
      default:
        return 'nature';
    }
  };

  const filtered = sightings.filter((s) => {
    if (activeFilter === 'all') return true;
    return s.urgency === activeFilter;
  });

  const handleRespond = (sightingId: string) => {
    if (respondedIds.includes(sightingId)) {
      setRespondedIds(respondedIds.filter((id) => id !== sightingId));
      setSightings((prev) =>
        prev.map((s) => (s.id === sightingId ? { ...s, respondersCount: s.respondersCount - 1 } : s))
      );
    } else {
      setRespondedIds([...respondedIds, sightingId]);
      setSightings((prev) =>
        prev.map((s) =>
          s.id === sightingId
            ? { ...s, respondersCount: s.respondersCount + 1, status: 'Volunteer En Route' }
            : s
        )
      );
    }
  };

  return (
    <div className="flex flex-col w-full pb-32 animate-fadeIn max-w-md mx-auto px-4 sm:px-5 pt-2">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#141d1a] tracking-tight flex items-center gap-2">
            Rescue Radar
            <span className="w-2.5 h-2.5 rounded-full bg-[#a13e28] animate-ping" />
          </h1>
          <p className="text-[13px] text-[#404944]">
            Live volunteer dispatch • <span className="font-semibold text-[#004732]">{currentLocation}</span>
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-[#ecf6f1] p-1 rounded-full border border-[#dbe5e0]/60">
          <button
            onClick={() => setViewMode('radar')}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
              viewMode === 'radar' ? 'bg-[#004732] text-white shadow-sm' : 'text-[#404944]'
            }`}
          >
            Radar Map
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
              viewMode === 'list' ? 'bg-[#004732] text-white shadow-sm' : 'text-[#404944]'
            }`}
          >
            Feed
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3">
        {[
          { id: 'all', label: 'All Incidents' },
          { id: 'critical', label: 'Critical SOS' },
          { id: 'urgent', label: 'Urgent' },
          { id: 'secured', label: 'Secured Safe' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id as any)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === f.id
                ? 'bg-[#004732] text-white shadow-sm'
                : 'bg-white text-[#404944] border border-[#dbe5e0] hover:bg-[#ecf6f1]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Radar Map Graphic View */}
      {viewMode === 'radar' && (
        <div className="relative w-full aspect-square rounded-[32px] overflow-hidden bg-[#1e5f48] shadow-inner mb-4 flex items-center justify-center border border-[#94d4b7]/30">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                'radial-gradient(circle at center, #aff0d2 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Concentric radar rings */}
          <div className="absolute w-[85%] h-[85%] rounded-full border border-[#aff0d2]/25" />
          <div className="absolute w-[60%] h-[60%] rounded-full border border-[#aff0d2]/35" />
          <div className="absolute w-[35%] h-[35%] rounded-full border border-[#aff0d2]/45" />

          {/* Crosshairs */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-[#aff0d2]/20" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-[#aff0d2]/20" />

          {/* Radar sweeping beam */}
          <div
            className="absolute inset-0 origin-center pointer-events-none"
            style={{
              animation: 'spin 6s linear infinite',
              background:
                'conic-gradient(from 0deg, rgba(175, 240, 210, 0.45) 0deg, rgba(175, 240, 210, 0) 60deg, transparent 360deg)',
            }}
          />

          {/* Center User Location Pin */}
          <div className="relative z-10 flex flex-col items-center">
            <span className="w-5 h-5 rounded-full bg-white ring-4 ring-[#aff0d2]/60 shadow-lg flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#004732]" />
            </span>
            <span className="text-[10px] font-bold text-white bg-[#002115]/80 backdrop-blur-md px-2 py-0.5 rounded-full mt-1">
              You
            </span>
          </div>

          {/* Interactive Sighting Pins on Radar Map */}
          {filtered.map((s) => {
            const isSelected = selectedSighting?.id === s.id;
            let pinColor = 'bg-[#ffdad2] text-[#822714] border-[#a13e28]';
            if (s.urgency === 'critical') {
              pinColor = 'bg-[#ba1a1a] text-white border-white animate-bounce';
            } else if (s.urgency === 'urgent') {
              pinColor = 'bg-[#fd8367] text-[#3d0600] border-white';
            } else if (s.urgency === 'secured') {
              pinColor = 'bg-[#aff0d2] text-[#002115] border-white';
            }

            return (
              <button
                key={s.id}
                onClick={() => setSelectedSighting(s)}
                style={{
                  left: `${s.coordinates.x}%`,
                  top: `${s.coordinates.y}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer transition-transform hover:scale-125 ${
                  isSelected ? 'scale-125 z-30' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-md ${pinColor}`}
                >
                  <span className="material-symbols-outlined text-[17px]">
                    {getAnimalIcon(s.animalType)}
                  </span>
                </div>
                {isSelected && (
                  <span className="text-[10px] font-bold text-white bg-[#141d1a]/90 backdrop-blur-md px-2 py-0.5 rounded-full mt-1 whitespace-nowrap shadow-md">
                    {s.title.slice(0, 18)}...
                  </span>
                )}
              </button>
            );
          })}

          {/* Radar HUD Info Overlay */}
          <div className="absolute top-3 left-3 bg-[#002115]/70 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-medium flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#aff0d2] animate-pulse" />
            <span>Scan Radius: 5.0 mi</span>
          </div>

          <div className="absolute bottom-3 left-3 bg-[#002115]/70 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-medium flex items-center gap-1 pointer-events-none">
            <span className="material-symbols-outlined text-[14px] text-[#aff0d2]">near_me</span>
            <span>{filtered.length} Active Targets</span>
          </div>
        </div>
      )}

      {/* Selected Sighting Detail Card (Quick preview in Radar mode) */}
      {viewMode === 'radar' && selectedSighting && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#e6f0eb] space-y-3 mb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    selectedSighting.urgency === 'critical'
                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                      : selectedSighting.urgency === 'urgent'
                      ? 'bg-[#ffdad2] text-[#822714]'
                      : 'bg-[#aff0d2] text-[#002115]'
                  }`}
                >
                  {selectedSighting.urgency.toUpperCase()}
                </span>
                <span className="text-[11px] text-[#404944]">• {selectedSighting.timeAgo}</span>
              </div>
              <h3 className="text-[17px] font-bold text-[#141d1a] leading-snug">
                {selectedSighting.title}
              </h3>
              <p className="text-[13px] text-[#404944] mt-0.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#004732]">
                  location_on
                </span>
                {selectedSighting.location} ({selectedSighting.distance})
              </p>
            </div>

            <img
              src={selectedSighting.image}
              alt={selectedSighting.title}
              className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-sm"
            />
          </div>

          <p className="text-[13px] text-[#404944] leading-relaxed bg-[#ecf6f1] p-3 rounded-2xl">
            {selectedSighting.description}
          </p>

          <div className="flex items-center justify-between text-[12px] pt-1">
            <span className="text-[#004732] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">group</span>
              {selectedSighting.respondersCount} Volunteer(s) Responding
            </span>
            <span className="text-[#707973]">Reported by {selectedSighting.reportedBy}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => handleRespond(selectedSighting.id)}
              className={`py-2.5 px-3 rounded-full text-[13px] font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                respondedIds.includes(selectedSighting.id)
                  ? 'bg-[#aff0d2] text-[#002115]'
                  : 'bg-[#004732] text-white hover:bg-[#1e5f48]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {respondedIds.includes(selectedSighting.id) ? 'check_circle' : 'volunteer_activism'}
              </span>
              <span>{respondedIds.includes(selectedSighting.id) ? 'En Route' : 'I Can Respond'}</span>
            </button>

            <button
              onClick={() => onOpenDirections(selectedSighting.location)}
              className="py-2.5 px-3 rounded-full bg-[#ecf6f1] text-[#141d1a] hover:bg-[#e0eae5] text-[13px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px] text-[#004732]">directions</span>
              <span>Directions</span>
            </button>
          </div>
        </div>
      )}

      {/* Sighting List Feed */}
      <div className="space-y-3">
        <h2 className="text-[16px] font-bold text-[#141d1a] flex items-center justify-between">
          <span>Active Sightings Nearby</span>
          <span className="text-[12px] text-[#404944] font-normal">{filtered.length} total</span>
        </h2>

        {filtered.map((s) => (
          <div
            key={s.id}
            onClick={() => {
              setSelectedSighting(s);
              if (viewMode === 'list') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="bg-white rounded-3xl p-4 shadow-sm border border-[#e6f0eb] hover:shadow-md transition-all cursor-pointer space-y-2.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      s.urgency === 'critical'
                        ? 'bg-[#ffdad6] text-[#ba1a1a]'
                        : s.urgency === 'urgent'
                        ? 'bg-[#ffdad2] text-[#822714]'
                        : 'bg-[#aff0d2] text-[#002115]'
                    }`}
                  >
                    {s.urgency.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-[#404944]">{s.timeAgo}</span>
                  <span className="text-[11px] text-[#707973]">({s.distance})</span>
                </div>
                <h3 className="text-[15px] font-bold text-[#141d1a] leading-snug truncate">
                  {s.title}
                </h3>
                <p className="text-[12px] text-[#404944] line-clamp-2 mt-0.5">{s.description}</p>
              </div>

              <img
                src={s.image}
                alt={s.title}
                className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 shadow-sm"
              />
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#f2fcf6]">
              <span className="text-[12px] font-medium text-[#004732] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">foster</span>
                Status: {s.status}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRespond(s.id);
                }}
                className={`text-[12px] font-bold px-3 py-1 rounded-full cursor-pointer transition-colors ${
                  respondedIds.includes(s.id)
                    ? 'bg-[#aff0d2] text-[#002115]'
                    : 'bg-[#ecf6f1] text-[#004732] hover:bg-[#aff0d2]/40'
                }`}
              >
                {respondedIds.includes(s.id) ? 'Responding ✓' : 'Respond'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating SOS Report Action Button - matching markdown specs */}
      <button
        onClick={onOpenReport}
        className="fixed bottom-22 right-4 sm:right-auto sm:left-[calc(50%+140px)] z-30 w-14 h-14 rounded-full bg-[#a13e28] hover:bg-[#822714] text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0px_12px_28px_-4px_rgba(224,109,83,0.45)] ring-4 ring-white/60"
        title="Report Stray / Emergency SOS"
      >
        <span className="material-symbols-outlined text-[28px] animate-pulse">emergency</span>
      </button>
    </div>
  );
};
