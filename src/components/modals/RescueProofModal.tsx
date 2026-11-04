import React, { useState } from 'react';
import { RadarSighting, RadarSavedProof, UserProfile } from '../../types';

interface RescueProofModalProps {
  sighting: RadarSighting;
  userProfile: UserProfile;
  onClose: () => void;
  onSubmitProof: (sightingId: string, proof: RadarSavedProof) => void;
}

const PROOF_PRESETS = [
  {
    id: 'crate',
    title: 'Secured in Carrier / Crate',
    url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80',
    description: 'Animal safely placed into ventilated pet transport crate',
  },
  {
    id: 'clinic',
    title: 'At Vet Triage Clinic',
    url: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=600&q=80',
    description: 'Under medical exam at partner triage clinic',
  },
  {
    id: 'blanket',
    title: 'Safe in Warm Towel/Blanket',
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    description: 'Calmed and secured with protective slip blanket',
  },
  {
    id: 'foster',
    title: 'Resting in Foster Care',
    url: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80',
    description: 'Safely resting in home quarantine or foster sanctuary',
  },
];

export const RescueProofModal: React.FC<RescueProofModalProps> = ({
  sighting,
  userProfile,
  onClose,
  onSubmitProof,
}) => {
  const [selectedPresetUrl, setSelectedPresetUrl] = useState<string>(PROOF_PRESETS[0].url);
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string>('');
  const [rescuerName, setRescuerName] = useState<string>(
    userProfile.isLoggedIn ? userProfile.fullName : 'Volunteer Rescuer'
  );
  const [destination, setDestination] = useState<string>(
    'PawSafe Haven Kemang Sanctuary'
  );
  const [notes, setNotes] = useState<string>(
    'Animal safely caught and secured. Water provided and transported for triage checkup.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activePhoto = customPhotoUrl || selectedPresetUrl;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCustomPhotoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const now = new Date();
    const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} WIB`;

    const proof: RadarSavedProof = {
      photoUrl: activePhoto,
      rescuerName: rescuerName.trim() || 'Verified Rescuer',
      rescuedAt: timeStr,
      notes: notes.trim(),
      clinicOrShelter: destination.trim(),
    };

    setTimeout(() => {
      onSubmitProof(sighting.id, proof);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl border border-[#e6f0eb] flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#e6f0eb] bg-gradient-to-r from-[#004732] to-[#1e5f48] text-white relative">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#aff0d2] text-[#002115] text-[11px] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">volunteer_activism</span>
              Mark as Rescued
            </span>
            <span className="text-[11px] text-white/80">• Live Radar</span>
          </div>

          <h2 className="text-[18px] font-bold text-white tracking-tight leading-tight">
            Submit Rescue Proof
          </h2>
          <p className="text-[12px] text-white/80 mt-0.5 line-clamp-1">
            {sighting.title}
          </p>
        </div>

        {/* Achievement Reward Banner */}
        <div className="bg-[#fff9eb] border-b border-[#fde7b3] px-5 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#fbbc04]/20 text-[#7a5500] flex items-center justify-center font-black text-[16px]">
              🏆
            </div>
            <div>
              <p className="text-[12px] font-bold text-[#634500]">
                +250 Achievement Points
              </p>
              <p className="text-[10px] text-[#7a5500]">
                Awarded instantly to redeem discount vouchers!
              </p>
            </div>
          </div>
          <span className="text-[11px] font-black bg-[#fbbc04] text-[#3b2a00] px-2.5 py-1 rounded-full shadow-sm">
            +250 PTS
          </span>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-[#141d1a]">
          {/* Proof Photo Selection */}
          <div>
            <label className="block text-[12px] font-bold text-[#141d1a] mb-1.5 flex items-center justify-between">
              <span>Proof Photo of Rescued Animal *</span>
              <span className="text-[11px] text-[#004732] font-semibold">Photo verification</span>
            </label>

            {/* Main Preview */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-[#e6f0eb] mb-2.5 border border-[#dbe5e0] group">
              <img
                src={activePhoto}
                alt="Rescue Proof Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-2.5 flex items-center justify-between text-white text-[11px]">
                <span className="flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[15px] text-[#aff0d2]">verified</span>
                  Selected Proof Photo
                </span>
                <span className="text-[10px] text-white/70">Verified by PawSafe</span>
              </div>
            </div>

            {/* Quick Presets Carousel */}
            <p className="text-[11px] text-[#707973] mb-1.5 font-medium">
              Choose quick proof picture or upload your own:
            </p>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {PROOF_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setCustomPhotoUrl('');
                    setSelectedPresetUrl(preset.url);
                  }}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activePhoto === preset.url
                      ? 'border-[#004732] ring-2 ring-[#004732]/30 scale-102'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                  title={preset.title}
                >
                  <img src={preset.url} alt={preset.title} className="w-full h-full object-cover" />
                  {activePhoto === preset.url && (
                    <div className="absolute inset-0 bg-[#004732]/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-[16px] font-bold">check</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Upload Custom Photo Option */}
            <label className="flex items-center justify-center gap-2 w-full py-2 px-3 border border-dashed border-[#004732]/40 bg-[#ecf6f1] hover:bg-[#dff0e7] rounded-xl text-[12px] font-semibold text-[#004732] cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-[17px]">photo_camera</span>
              <span>Upload Proof Photo From Device</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Rescuer Name & Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#404944] mb-1">
                Rescuer Name / Handle
              </label>
              <input
                type="text"
                value={rescuerName}
                onChange={(e) => setRescuerName(e.target.value)}
                required
                className="w-full text-[13px] px-3 py-2 rounded-xl border border-[#dbe5e0] focus:outline-none focus:border-[#004732] bg-[#f8fcf9]"
                placeholder="e.g. Sydney (Rescuer)"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#404944] mb-1">
                Safe Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
                className="w-full text-[13px] px-3 py-2 rounded-xl border border-[#dbe5e0] focus:outline-none focus:border-[#004732] bg-[#f8fcf9]"
                placeholder="e.g. Kemang Haven Clinic"
              />
            </div>
          </div>

          {/* Rescue Triage Notes */}
          <div>
            <label className="block text-[11px] font-bold text-[#404944] mb-1">
              Rescue Notes & Condition
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-[12px] px-3 py-2 rounded-xl border border-[#dbe5e0] focus:outline-none focus:border-[#004732] bg-[#f8fcf9] resize-none"
              placeholder="Describe condition, microchip check, or clinic intake..."
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-full border border-[#dbe5e0] text-[#404944] hover:bg-[#ecf6f1] text-[13px] font-semibold cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-full bg-[#004732] hover:bg-[#1e5f48] text-white text-[13px] font-bold shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>{isSubmitting ? 'Confirming...' : 'Verify Rescue (+250 pts)'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
