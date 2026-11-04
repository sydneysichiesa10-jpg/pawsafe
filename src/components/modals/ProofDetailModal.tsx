import React from 'react';
import { RadarSighting } from '../../types';

interface ProofDetailModalProps {
  sighting: RadarSighting;
  onClose: () => void;
  onOpenDirections?: (address: string) => void;
}

export const ProofDetailModal: React.FC<ProofDetailModalProps> = ({
  sighting,
  onClose,
  onOpenDirections,
}) => {
  const proof = sighting.savedProof;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl border border-[#e6f0eb] flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#e6f0eb] bg-[#004732] text-white relative">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          <div className="flex items-center gap-1.5 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#aff0d2] text-[#002115] text-[11px] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Animal Safely Rescued
            </span>
            <span className="text-[11px] text-[#aff0d2] font-semibold">• PawSafe Verified</span>
          </div>

          <h2 className="text-[18px] font-bold text-white tracking-tight leading-snug">
            {sighting.title}
          </h2>
          <p className="text-[12px] text-white/80 mt-0.5 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">location_on</span>
            {sighting.location}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-[#141d1a]">
          {/* Rescue Proof Picture */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12px] font-bold text-[#141d1a] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#004732]">photo_camera</span>
                Official Rescue Proof Picture
              </span>
              <span className="text-[10px] font-bold bg-[#ecf6f1] text-[#004732] px-2 py-0.5 rounded-full">
                {proof?.rescuedAt || 'Verified Safe'}
              </span>
            </div>

            <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-[#e6f0eb] border border-[#dbe5e0] shadow-sm">
              <img
                src={proof?.photoUrl || sighting.image}
                alt={`Proof photo of ${sighting.title}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#002115]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold flex items-center gap-1.5 shadow-md">
                <span className="material-symbols-outlined text-[15px] text-[#aff0d2]">verified</span>
                <span>Verified Rescue Proof</span>
              </div>
            </div>
          </div>

          {/* Before & After comparison card */}
          <div className="bg-[#f2fcf6] p-3 rounded-2xl border border-[#dbe5e0]/60 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#404944]">
              <span>Original Sighting Photo</span>
              <span className="text-[#004732]">Reported: {sighting.timeAgo}</span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={sighting.image}
                alt="Original sighting"
                className="w-14 h-14 rounded-xl object-cover border border-[#dbe5e0] flex-shrink-0"
              />
              <div className="text-[12px] text-[#404944] min-w-0">
                <p className="line-clamp-2 italic">"{sighting.description}"</p>
                <p className="text-[11px] text-[#707973] mt-0.5">Reported by {sighting.reportedBy}</p>
              </div>
            </div>
          </div>

          {/* Rescuer & Location Info */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-3 rounded-2xl border border-[#e6f0eb] shadow-2xs">
              <span className="text-[10px] font-bold text-[#707973] uppercase tracking-wider block">
                Saved By
              </span>
              <p className="text-[13px] font-bold text-[#004732] mt-0.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">volunteer_activism</span>
                {proof?.rescuerName || 'PawSafe Hero'}
              </p>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-[#e6f0eb] shadow-2xs">
              <span className="text-[10px] font-bold text-[#707973] uppercase tracking-wider block">
                Current Safe Hub
              </span>
              <p className="text-[13px] font-bold text-[#141d1a] mt-0.5 truncate">
                {proof?.clinicOrShelter || 'PawSafe Haven Sanctuary'}
              </p>
            </div>
          </div>

          {/* Notes */}
          {proof?.notes && (
            <div className="bg-[#ecf6f1] p-3.5 rounded-2xl border border-[#dbe5e0]/70">
              <p className="text-[11px] font-bold text-[#004732] mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">clinical_notes</span>
                Rescuer Log & Notes
              </p>
              <p className="text-[12px] text-[#404944] leading-relaxed">
                {proof.notes}
              </p>
            </div>
          )}

          {/* Points Awarded Info */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#fff9eb] border border-[#fde7b3] text-[#7a5500]">
            <div className="flex items-center gap-2">
              <span className="text-[18px]">🏆</span>
              <div>
                <p className="text-[12px] font-bold text-[#634500]">Achievement Points Rewarded</p>
                <p className="text-[10px] text-[#855e00]">+250 Hero Points allocated for this rescue</p>
              </div>
            </div>
            <span className="text-[11px] font-black bg-[#fbbc04] text-[#3b2a00] px-2 py-0.5 rounded-full">
              +250 PTS
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#e6f0eb] bg-[#f8fcf9] flex items-center gap-2">
          {onOpenDirections && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenDirections(proof?.clinicOrShelter || sighting.location);
              }}
              className="flex-1 py-2.5 px-3 rounded-full bg-[#ecf6f1] hover:bg-[#e0eae5] text-[#004732] text-[12px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">directions</span>
              <span>Directions to Hub</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-full bg-[#004732] hover:bg-[#1e5f48] text-white text-[12px] font-bold shadow-sm cursor-pointer transition-colors"
          >
            Close Proof
          </button>
        </div>
      </div>
    </div>
  );
};
