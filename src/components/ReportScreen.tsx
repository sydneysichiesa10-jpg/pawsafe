import React, { useState } from 'react';
import { RadarSighting } from '../types';

interface ReportScreenProps {
  onSightingReported: (newSighting: RadarSighting) => void;
  onNavigateToRadar: () => void;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({
  onSightingReported,
  onNavigateToRadar,
}) => {
  const [animalType, setAnimalType] = useState<'dog' | 'cat' | 'puppies' | 'reptile' | 'bird' | 'other'>('dog');
  const [urgency, setUrgency] = useState<'critical' | 'urgent' | 'moderate'>('urgent');
  const [location, setLocation] = useState('Jl. Kemang Raya & Kemang Timur, Jakarta Selatan');
  const [description, setDescription] = useState('');
  const [hasCollar, setHasCollar] = useState<'yes-tags' | 'yes-no-tags' | 'none' | 'unknown'>('none');
  const [photoPreview, setPhotoPreview] = useState<string>(
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<RadarSighting | null>(null);

  const samplePhotos = [
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1563281577-a7be47e20db9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=600&q=80',
  ];

  const handleUseGPS = () => {
    setLocation('Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan (GPS ±4m)');
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPhotoPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newSighting: RadarSighting = {
      id: `sight-${Date.now()}`,
      animalType,
      title: `${animalType.toUpperCase()}: ${urgency.toUpperCase()} Rescue Report`,
      description: description || `Stray ${animalType} spotted at ${location}. Collar: ${hasCollar}.`,
      location: location || 'East Austin, TX',
      coordinates: { x: 50 + Math.floor(Math.random() * 20 - 10), y: 50 + Math.floor(Math.random() * 20 - 10) },
      distance: '0.4 mi away',
      timeAgo: 'Just now',
      urgency,
      status: 'Searching',
      respondersCount: 1,
      image: photoPreview,
      reportedBy: 'You (Sydney)',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedReport(newSighting);
      onSightingReported(newSighting);
    }, 900);
  };

  if (submittedReport) {
    return (
      <div className="flex flex-col items-center max-w-md mx-auto px-4 sm:px-5 pt-6 pb-32 animate-fadeIn text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#aff0d2] text-[#004732] flex items-center justify-center shadow-lg">
          <span className="material-symbols-outlined text-[36px] icon-filled">verified</span>
        </div>

        <div>
          <h2 className="text-[22px] font-bold text-[#141d1a]">Alert Broadcasted to Network!</h2>
          <p className="text-[14px] text-[#404944] mt-1 max-w-xs mx-auto">
            18 volunteers within 3 km have been notified with high priority. Responders are mobilizing.
          </p>
        </div>

        {/* Card of what was reported */}
        <div className="w-full bg-white rounded-3xl p-5 shadow-sm border border-[#e6f0eb] text-left space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={submittedReport.image}
              alt="Reported Stray"
              className="w-16 h-16 rounded-2xl object-cover shadow-sm"
            />
            <div>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdad2] text-[#822714] text-[11px] font-bold">
                {submittedReport.urgency.toUpperCase()}
              </span>
              <h3 className="text-[16px] font-bold text-[#141d1a] mt-1">{submittedReport.title}</h3>
              <p className="text-[12px] text-[#404944]">{submittedReport.location}</p>
            </div>
          </div>

          <div className="p-3 bg-[#ecf6f1] rounded-2xl text-[13px] text-[#004732] flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#004732]">satellite_alt</span>
            <span>Live status tracker assigned: <strong>#RES-2940</strong></span>
          </div>
        </div>

        <div className="w-full space-y-2 pt-2">
          <button
            onClick={onNavigateToRadar}
            className="w-full py-3.5 px-6 rounded-full bg-[#004732] hover:bg-[#1e5f48] text-white font-bold text-[15px] shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">explore</span>
            <span>Track on Live Radar</span>
          </button>

          <button
            onClick={() => setSubmittedReport(null)}
            className="w-full py-3 px-6 rounded-full bg-[#ecf6f1] hover:bg-[#e0eae5] text-[#141d1a] font-semibold text-[14px] transition-all cursor-pointer"
          >
            File Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-32 animate-fadeIn max-w-md mx-auto px-4 sm:px-5 pt-2">
      {/* Emergency Hotline Header */}
      <div className="bg-[#ffdad6]/60 border border-[#ba1a1a]/20 rounded-3xl p-4 mb-4 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center flex-shrink-0 animate-pulse">
            <span className="material-symbols-outlined text-[20px]">emergency</span>
          </div>
          <div>
            <h2 className="text-[14px] font-bold text-[#ba1a1a]">Immediate Danger?</h2>
            <p className="text-[12px] text-[#404944]">Animal injured or on active highway</p>
          </div>
        </div>
        <a
          href="tel:112"
          className="px-3.5 py-1.5 rounded-full bg-[#ba1a1a] text-white font-bold text-[12px] hover:bg-[#93000a] transition-all shadow-sm flex items-center gap-1 flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[15px]">call</span>
          <span>Call 112 / Rescue</span>
        </a>
      </div>

      <div className="pb-3">
        <h1 className="text-[22px] font-bold text-[#141d1a] tracking-tight">Report Stray / SOS</h1>
        <p className="text-[13px] text-[#404944]">
          Help our network of foster volunteers respond swiftly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Animal Type Selector */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#e6f0eb] space-y-2.5">
          <label className="text-[13px] font-bold text-[#141d1a] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[17px] text-[#004732]">pets</span>
            What kind of animal?
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[
              { id: 'dog', label: 'Dog', icon: 'pets' },
              { id: 'cat', label: 'Cat', icon: 'cruelty_free' },
              { id: 'reptile', label: 'Reptile', icon: 'pest_control' },
              { id: 'bird', label: 'Bird', icon: 'flutter' },
              { id: 'puppies', label: 'Litter/Pups', icon: 'crib' },
              { id: 'other', label: 'Other/Wild', icon: 'nature' },
            ].map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setAnimalType(t.id as any)}
                className={`py-2.5 px-2 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border ${
                  animalType === t.id
                    ? 'bg-[#004732] text-white border-[#004732] shadow-sm font-bold'
                    : 'bg-[#ecf6f1] text-[#404944] border-transparent hover:bg-[#e0eae5]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] mb-0.5">{t.icon}</span>
                <span className="text-[11px] truncate w-full text-center">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Urgency Level */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#e6f0eb] space-y-2.5">
          <label className="text-[13px] font-bold text-[#141d1a] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[17px] text-[#a13e28]">warning</span>
            Urgency Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                id: 'critical',
                label: 'Critical SOS',
                sub: 'Injured / Severe',
                badge: 'bg-[#ffdad6] text-[#ba1a1a]',
              },
              {
                id: 'urgent',
                label: 'High Priority',
                sub: 'In traffic / Lost',
                badge: 'bg-[#ffdad2] text-[#822714]',
              },
              {
                id: 'moderate',
                label: 'Safe Sighting',
                sub: 'Resting / Calmed',
                badge: 'bg-[#aff0d2] text-[#002115]',
              },
            ].map((u) => (
              <button
                type="button"
                key={u.id}
                onClick={() => setUrgency(u.id as any)}
                className={`p-2.5 rounded-2xl text-left transition-all cursor-pointer border ${
                  urgency === u.id
                    ? 'ring-2 ring-[#a13e28] border-transparent shadow-sm bg-white'
                    : 'bg-[#ecf6f1] border-transparent hover:bg-[#e0eae5]'
                }`}
              >
                <span className={`inline-block px-1.5 py-0.5 rounded-full text-[10px] font-bold mb-1 ${u.badge}`}>
                  {u.label}
                </span>
                <p className="text-[11px] text-[#404944] font-medium leading-tight">{u.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Rescue Photo Evidence Uploader - matching markdown spec */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#e6f0eb] space-y-2.5">
          <label className="text-[13px] font-bold text-[#141d1a] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px] text-[#004732]">photo_camera</span>
              Photo Evidence (Speeds Up Rescue)
            </span>
            <span className="text-[11px] text-[#707973] font-normal">Optional</span>
          </label>

          <div className="relative border-2 border-dashed border-[#1e5f48]/40 bg-[#f4efeb] rounded-[20px] p-4 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-[#ecf6f1] transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            {photoPreview ? (
              <div className="flex items-center gap-3 w-full">
                <img
                  src={photoPreview}
                  alt="Rescue Photo"
                  className="w-20 h-20 rounded-2xl object-cover shadow-sm ring-2 ring-[#004732]/20"
                />
                <div className="text-left min-w-0">
                  <p className="text-[13px] font-bold text-[#141d1a]">Photo Attached</p>
                  <p className="text-[11px] text-[#404944] mt-0.5">
                    Click to replace with your camera or camera roll.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-2">
                <div className="w-12 h-12 rounded-full bg-[#1e5f48]/10 text-[#004732] flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[24px]">add_a_photo</span>
                </div>
                <p className="text-[13px] font-semibold text-[#141d1a]">Tap to snap photo or upload</p>
                <p className="text-[11px] text-[#707973]">JPEG, PNG up to 10MB</p>
              </div>
            )}
          </div>

          {/* Quick preset thumbnail pills */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] text-[#707973]">Quick sample:</span>
            {samplePhotos.map((url, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPhotoPreview(url)}
                className="w-8 h-8 rounded-xl overflow-hidden ring-1 ring-[#dbe5e0] hover:ring-[#004732] transition-all cursor-pointer"
              >
                <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Location Input with GPS button */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#e6f0eb] space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[13px] font-bold text-[#141d1a] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px] text-[#a13e28]">pin_drop</span>
              Location / Crossroads
            </label>
            <button
              type="button"
              onClick={handleUseGPS}
              className="text-[11px] text-[#004732] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">my_location</span>
              Use GPS
            </button>
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Jl. Kemang Timur No. 48, Jakarta Selatan"
            className="w-full h-[52px] px-4 rounded-[16px] bg-white border border-[#1b2421]/15 focus:border-[#004732] focus:ring-1 focus:ring-[#004732] text-[14px] text-[#141d1a] outline-none"
            required
          />
        </div>

        {/* Collar Status */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#e6f0eb] space-y-2">
          <label className="text-[13px] font-bold text-[#141d1a]">Does animal have a collar?</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'yes-tags', label: 'Yes, with tags' },
              { id: 'yes-no-tags', label: 'Collar, no tags' },
              { id: 'none', label: 'No collar visible' },
              { id: 'unknown', label: 'Could not see' },
            ].map((c) => (
              <button
                type="button"
                key={c.id}
                onClick={() => setHasCollar(c.id as any)}
                className={`p-2.5 rounded-xl text-[12px] font-semibold text-left transition-all cursor-pointer ${
                  hasCollar === c.id
                    ? 'bg-[#004732] text-white shadow-sm'
                    : 'bg-[#ecf6f1] text-[#404944] hover:bg-[#e0eae5]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description textarea */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#e6f0eb] space-y-2">
          <label className="text-[13px] font-bold text-[#141d1a]">
            Description &amp; Behavior Notes
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Color, markings, behavior (e.g. timid, wagging tail, limping on front paw)..."
            className="w-full p-3.5 rounded-2xl bg-white border border-[#1b2421]/15 focus:border-[#004732] focus:ring-1 focus:ring-[#004732] text-[14px] text-[#141d1a] outline-none"
          />
        </div>

        {/* Urgent Action Submit Button - matching markdown spec */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 py-3.5 px-6 rounded-full bg-[#a13e28] hover:bg-[#822714] text-white font-bold text-[16px] tracking-wide shadow-[0px_12px_28px_-4px_rgba(224,109,83,0.35)] transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="material-symbols-outlined text-[22px]">campaign</span>
                <span>Broadcast Emergency Rescue Alert</span>
              </>
            )}
          </button>
          <p className="text-[12px] text-center text-[#707973] mt-2">
            Dispatches alert to verified PawSafe Indonesia volunteer triage group.
          </p>
        </div>
      </form>
    </div>
  );
};
