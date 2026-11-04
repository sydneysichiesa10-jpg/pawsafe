import React, { useState } from 'react';
import { RadarSighting, RadarSavedProof, UserProfile } from '../types';
import { AnimalSpeciesTag, getAnimalDetails } from './AnimalBadge';
import { RescueProofModal } from './modals/RescueProofModal';
import { ProofDetailModal } from './modals/ProofDetailModal';

interface RadarScreenProps {
  onOpenReport: () => void;
  onOpenDirections: (address: string) => void;
  currentLocation?: string;
  userProfile: UserProfile;
  sightings: RadarSighting[];
  onUpdateSighting: (updated: RadarSighting) => void;
  onOpenVouchers: () => void;
  onAwardPoints: (points: number, reason: string) => void;
}

export const RadarScreen: React.FC<RadarScreenProps> = ({
  onOpenReport,
  onOpenDirections,
  currentLocation = 'Jakarta (Selatan & Pusat)',
  userProfile,
  sightings,
  onUpdateSighting,
  onOpenVouchers,
  onAwardPoints,
}) => {
  const [selectedSighting, setSelectedSighting] = useState<RadarSighting | null>(sightings[0] || null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'urgent' | 'secured'>('all');
  const [respondedIds, setRespondedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'radar' | 'list'>('radar');

  // Modal states
  const [proofModalSighting, setProofModalSighting] = useState<RadarSighting | null>(null);
  const [inspectProofSighting, setInspectProofSighting] = useState<RadarSighting | null>(null);

  const filtered = sightings.filter((s) => {
    if (activeFilter === 'all') return true;
    return s.urgency === activeFilter;
  });

  const handleRespond = (sightingId: string) => {
    if (respondedIds.includes(sightingId)) {
      setRespondedIds(respondedIds.filter((id) => id !== sightingId));
      const target = sightings.find((s) => s.id === sightingId);
      if (target) {
        onUpdateSighting({ ...target, respondersCount: Math.max(0, target.respondersCount - 1) });
      }
    } else {
      setRespondedIds([...respondedIds, sightingId]);
      const target = sightings.find((s) => s.id === sightingId);
      if (target) {
        onUpdateSighting({
          ...target,
          respondersCount: target.respondersCount + 1,
          status: 'Volunteer En Route',
        });
      }
    }
  };

  const handleConfirmRescue = (sightingId: string, proof: RadarSavedProof) => {
    const target = sightings.find((s) => s.id === sightingId);
    if (!target) return;

    const updated: RadarSighting = {
      ...target,
      isSaved: true,
      status: 'Rescued',
      urgency: 'secured',
      savedProof: proof,
    };

    onUpdateSighting(updated);
    if (selectedSighting?.id === sightingId) {
      setSelectedSighting(updated);
    }
    onAwardPoints(250, `for safely rescuing ${target.title}!`);
  };

  return (
    <div className="flex flex-col w-full pb-32 animate-fadeIn max-w-md mx-auto px-4 sm:px-5 pt-2">
      {/* Top Banner with Rescue Karma / Points Tracker */}
      <div className="flex items-center justify-between pb-2.5">
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
              viewMode === 'radar' ? 'bg-[#004732] text-white shadow-xs' : 'text-[#404944]'
            }`}
          >
            Radar Map
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
              viewMode === 'list' ? 'bg-[#004732] text-white shadow-xs' : 'text-[#404944]'
            }`}
          >
            Feed
          </button>
        </div>
      </div>

      {/* Achievement Points & Vouchers Callout Bar */}
      <div className="mb-3 p-2.5 bg-gradient-to-r from-[#004732] to-[#1e5f48] rounded-2xl text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-[#fbbc04] text-[#332300] flex items-center justify-center font-bold text-[14px] flex-shrink-0">
            ⭐
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-bold tracking-tight">Rescue Karma:</span>
              <span className="text-[13px] font-black text-[#aff0d2]">
                {userProfile.achievementPoints ?? 0} pts
              </span>
            </div>
            <p className="text-[10px] text-white/80 truncate">
              Rescue stray animals to earn +250 pts per save
            </p>
          </div>
        </div>

        <button
          onClick={onOpenVouchers}
          className="py-1 px-3 bg-[#fbbc04] hover:bg-[#ffd24d] text-[#332300] font-black text-[11px] rounded-full transition-all cursor-pointer flex items-center gap-1 shadow-xs flex-shrink-0 active:scale-95"
        >
          <span>🏆 Vouchers</span>
          <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
        </button>
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
                ? 'bg-[#004732] text-white shadow-xs'
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

          {/* Interactive Sighting Pins on Radar Map with Animal Icons */}
          {filtered.map((s) => {
            const isSelected = selectedSighting?.id === s.id;
            const details = getAnimalDetails(s.animalType);

            let pinBg = details.pinBg;
            let borderStyle = 'border-white';
            if (s.isSaved) {
              pinBg = 'bg-[#004732] text-white';
              borderStyle = 'border-[#aff0d2] ring-2 ring-[#aff0d2]';
            } else if (s.urgency === 'critical') {
              pinBg = 'bg-[#ba1a1a] text-white';
              borderStyle = 'border-white animate-bounce';
            } else if (s.urgency === 'urgent') {
              pinBg = 'bg-[#fd8367] text-[#3d0600]';
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
                title={`${s.title} (${details.label})`}
              >
                <div
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center shadow-md relative ${pinBg} ${borderStyle}`}
                >
                  <span className="text-[16px] leading-none select-none">
                    {details.emoji}
                  </span>
                  {s.isSaved && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#004732] text-[#aff0d2] border border-white flex items-center justify-center text-[9px] font-black">
                      ✓
                    </span>
                  )}
                </div>
                {isSelected && (
                  <span className="text-[10px] font-bold text-white bg-[#141d1a]/90 backdrop-blur-md px-2 py-0.5 rounded-full mt-1 whitespace-nowrap shadow-md flex items-center gap-1">
                    <span>{details.emoji}</span>
                    <span>{s.title.slice(0, 16)}...</span>
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
            <span>{filtered.length} Animals on Radar</span>
          </div>
        </div>
      )}

      {/* Selected Sighting Detail Card (Quick preview in Radar mode) */}
      {viewMode === 'radar' && selectedSighting && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#e6f0eb] space-y-3 mb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              {/* Badges row: Animal Species Tag + Urgency Tag + Saved Badge */}
              <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                <AnimalSpeciesTag animalType={selectedSighting.animalType} />
                {selectedSighting.isSaved ? (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#004732] text-[#aff0d2] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">check_circle</span>
                    Saved & Safe
                  </span>
                ) : (
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
                )}
                <span className="text-[11px] text-[#404944]">• {selectedSighting.timeAgo}</span>
              </div>

              <h3 className="text-[16px] font-bold text-[#141d1a] leading-snug">
                {selectedSighting.title}
              </h3>
              <p className="text-[12px] text-[#404944] mt-0.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#004732]">
                  location_on
                </span>
                {selectedSighting.location} ({selectedSighting.distance})
              </p>
            </div>

            <div className="relative">
              <img
                src={selectedSighting.image}
                alt={selectedSighting.title}
                className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-xs border border-[#e6f0eb]"
              />
              <span className="absolute -bottom-1 -right-1 text-[16px] p-0.5 bg-white rounded-full shadow-xs">
                {getAnimalDetails(selectedSighting.animalType).emoji}
              </span>
            </div>
          </div>

          <p className="text-[13px] text-[#404944] leading-relaxed bg-[#ecf6f1] p-3 rounded-2xl">
            {selectedSighting.description}
          </p>

          {/* Rescue Proof Banner if already saved */}
          {selectedSighting.isSaved && selectedSighting.savedProof && (
            <div className="p-3 rounded-2xl bg-[#f2fcf6] border border-[#94d4b7] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={selectedSighting.savedProof.photoUrl}
                  alt="Proof thumbnail"
                  className="w-11 h-11 rounded-xl object-cover border border-[#004732]/30 flex-shrink-0 shadow-2xs"
                />
                <div className="min-w-0 text-[11px]">
                  <p className="font-bold text-[#004732] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Official Rescue Proof Verified
                  </p>
                  <p className="text-[#404944] truncate">
                    Saved by {selectedSighting.savedProof.rescuerName} • {selectedSighting.savedProof.rescuedAt}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setInspectProofSighting(selectedSighting)}
                className="py-1 px-2.5 rounded-full bg-[#004732] text-white hover:bg-[#1e5f48] text-[11px] font-bold flex items-center gap-1 flex-shrink-0 cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[13px]">visibility</span>
                <span>View Proof</span>
              </button>
            </div>
          )}

          <div className="flex items-center justify-between text-[12px] pt-0.5">
            <span className="text-[#004732] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">group</span>
              {selectedSighting.respondersCount} Volunteer(s) Responding
            </span>
            <span className="text-[#707973]">Reported by {selectedSighting.reportedBy}</span>
          </div>

          {/* Action Buttons: Respond, Directions, and Saved Button */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => handleRespond(selectedSighting.id)}
              className={`py-2 px-2 rounded-2xl text-[12px] font-bold transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer shadow-xs ${
                respondedIds.includes(selectedSighting.id)
                  ? 'bg-[#aff0d2] text-[#002115]'
                  : 'bg-[#004732] text-white hover:bg-[#1e5f48]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {respondedIds.includes(selectedSighting.id) ? 'check_circle' : 'volunteer_activism'}
              </span>
              <span>{respondedIds.includes(selectedSighting.id) ? 'En Route' : 'Respond'}</span>
            </button>

            <button
              onClick={() => onOpenDirections(selectedSighting.location)}
              className="py-2 px-2 rounded-2xl bg-[#ecf6f1] text-[#141d1a] hover:bg-[#e0eae5] text-[12px] font-semibold flex items-center justify-center gap-1 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px] text-[#004732]">directions</span>
              <span>Directions</span>
            </button>

            {/* Saved / Proof Button */}
            {selectedSighting.isSaved ? (
              <button
                type="button"
                onClick={() => setInspectProofSighting(selectedSighting)}
                className="py-2 px-2 rounded-2xl bg-[#004732] text-white hover:bg-[#1e5f48] text-[12px] font-bold flex items-center justify-center gap-1 cursor-pointer active:scale-95 shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px] text-[#aff0d2]">photo_library</span>
                <span>View Proof</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setProofModalSighting(selectedSighting)}
                className="py-2 px-2 rounded-2xl bg-[#fbbc04] hover:bg-[#ffd24d] text-[#332300] text-[12px] font-black flex items-center justify-center gap-1 cursor-pointer active:scale-95 shadow-xs"
                title="Mark as Safely Saved and Earn +250 Points"
              >
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Mark Saved</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Sighting List Feed */}
      <div className="space-y-3">
        <h2 className="text-[16px] font-bold text-[#141d1a] flex items-center justify-between">
          <span>Active Sightings Nearby</span>
          <span className="text-[12px] text-[#404944] font-normal">{filtered.length} total</span>
        </h2>

        {filtered.map((s) => {
          const details = getAnimalDetails(s.animalType);

          return (
            <div
              key={s.id}
              onClick={() => {
                setSelectedSighting(s);
                if (viewMode === 'list') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`bg-white rounded-3xl p-4 shadow-xs border transition-all cursor-pointer space-y-2.5 ${
                selectedSighting?.id === s.id
                  ? 'border-[#004732] ring-2 ring-[#004732]/20 shadow-sm'
                  : 'border-[#e6f0eb] hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <AnimalSpeciesTag animalType={s.animalType} />
                    {s.isSaved ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#004732] text-[#aff0d2] flex items-center gap-0.5">
                        <span>✓</span> Saved
                      </span>
                    ) : (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          s.urgency === 'critical'
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : s.urgency === 'urgent'
                            ? 'bg-[#ffdad2] text-[#822714]'
                            : 'bg-[#aff0d2] text-[#002115]'
                        }`}
                      >
                        {s.urgency.toUpperCase()}
                      </span>
                    )}
                    <span className="text-[11px] text-[#404944]">{s.timeAgo}</span>
                    <span className="text-[11px] text-[#707973]">({s.distance})</span>
                  </div>

                  <h3 className="text-[15px] font-bold text-[#141d1a] leading-snug truncate">
                    {s.title}
                  </h3>
                  <p className="text-[12px] text-[#404944] line-clamp-2 mt-0.5">{s.description}</p>
                </div>

                <div className="relative flex-shrink-0">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-14 h-14 rounded-2xl object-cover shadow-2xs border border-[#e6f0eb]"
                  />
                  <span className="absolute -bottom-1 -right-1 text-[14px] bg-white rounded-full p-0.5 shadow-2xs">
                    {details.emoji}
                  </span>
                </div>
              </div>

              {/* Card Footer with Saved Proof Button & Response status */}
              <div className="flex items-center justify-between pt-1 border-t border-[#f2fcf6]">
                <span className="text-[12px] font-medium text-[#004732] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">
                    {s.isSaved ? 'verified' : 'foster'}
                  </span>
                  Status: <strong>{s.status}</strong>
                </span>

                <div className="flex items-center gap-1.5">
                  {s.isSaved ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectProofSighting(s);
                      }}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#ecf6f1] text-[#004732] hover:bg-[#aff0d2]/50 cursor-pointer flex items-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">photo_library</span>
                      <span>Proof Pic</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProofModalSighting(s);
                      }}
                      className="text-[11px] font-black px-2.5 py-1 rounded-full bg-[#fbbc04] hover:bg-[#ffd24d] text-[#332300] cursor-pointer flex items-center gap-1 transition-colors shadow-2xs"
                    >
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      <span>Save +250pts</span>
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRespond(s.id);
                    }}
                    className={`text-[11px] font-bold px-3 py-1 rounded-full cursor-pointer transition-colors ${
                      respondedIds.includes(s.id)
                        ? 'bg-[#aff0d2] text-[#002115]'
                        : 'bg-[#ecf6f1] text-[#004732] hover:bg-[#aff0d2]/40'
                    }`}
                  >
                    {respondedIds.includes(s.id) ? 'Responding ✓' : 'Respond'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating SOS Report Action Button */}
      <button
        onClick={onOpenReport}
        className="fixed bottom-22 right-4 sm:right-auto sm:left-[calc(50%+140px)] z-30 w-14 h-14 rounded-full bg-[#a13e28] hover:bg-[#822714] text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0px_12px_28px_-4px_rgba(224,109,83,0.45)] ring-4 ring-white/60"
        title="Report Stray / Emergency SOS"
      >
        <span className="material-symbols-outlined text-[28px] animate-pulse">emergency</span>
      </button>

      {/* Rescue Proof Modal (Upload / Select Proof) */}
      {proofModalSighting && (
        <RescueProofModal
          sighting={proofModalSighting}
          userProfile={userProfile}
          onClose={() => setProofModalSighting(null)}
          onSubmitProof={handleConfirmRescue}
        />
      )}

      {/* Proof Detail Modal (View Full Proof Picture & Verification) */}
      {inspectProofSighting && (
        <ProofDetailModal
          sighting={inspectProofSighting}
          onClose={() => setInspectProofSighting(null)}
          onOpenDirections={onOpenDirections}
        />
      )}
    </div>
  );
};
