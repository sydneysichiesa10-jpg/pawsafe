import React, { useState } from 'react';
import { Pet, UserProfile } from '../../types';

interface ApplyModalProps {
  pet: Pet;
  userProfile?: UserProfile;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ pet, userProfile, onClose }) => {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState(userProfile?.isLoggedIn ? userProfile.fullName : '');
  const [email, setEmail] = useState(userProfile?.isLoggedIn ? userProfile.email : '');
  const [phone, setPhone] = useState(userProfile?.isLoggedIn ? userProfile.phone : '');
  const [housingType, setHousingType] = useState('House with Fenced Yard');
  const [hasPets, setHasPets] = useState('Yes, 1 friendly dog');
  const [hoursAlone, setHoursAlone] = useState('2-4 hours');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full sm:max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 text-left border border-[#e6f0eb]">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#f2fcf6]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#004732]">
              assignment_turned_in
            </span>
            <div>
              <h2 className="text-[18px] font-bold text-[#141d1a]">Adopt {pet.name}</h2>
              <p className="text-[12px] text-[#404944]">PawSafe Haven Indonesia 4-Minute Application</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ecf6f1] text-[#404944] hover:text-[#141d1a] flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#aff0d2] text-[#004732] flex items-center justify-center mx-auto shadow-md">
              <span className="material-symbols-outlined text-[36px] icon-filled">check_circle</span>
            </div>
            <div>
              <h3 className="text-[20px] font-bold text-[#141d1a]">Application Received!</h3>
              <p className="text-[13px] text-[#404944] mt-1">
                Your application for <strong>{pet.name}</strong> was submitted to{' '}
                {pet.shelter.coordinator} at {pet.shelter.name}.
              </p>
            </div>
            <div className="p-3 bg-[#ecf6f1] rounded-2xl text-[12px] text-[#004732] font-semibold text-center">
              Application ID: #PAW-2026-{Math.floor(1000 + Math.random() * 9000)}
            </div>
            <p className="text-[12px] text-[#707973]">
              Next step: An adoption counselor will review your application and contact you within 24 hours to coordinate the Meet &amp; Greet.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-full bg-[#004732] text-white font-bold text-[14px] cursor-pointer hover:bg-[#1e5f48] shadow-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step Indicators */}
            <div className="flex items-center justify-between px-2 text-[12px] font-bold">
              <span className={step >= 1 ? 'text-[#004732]' : 'text-[#707973]'}>1. Contact</span>
              <span className="text-[#dbe5e0]">──</span>
              <span className={step >= 2 ? 'text-[#004732]' : 'text-[#707973]'}>2. Home</span>
              <span className="text-[#dbe5e0]">──</span>
              <span className={step >= 3 ? 'text-[#004732]' : 'text-[#707973]'}>3. Lifestyle</span>
            </div>

            {step === 1 && (
              <div className="space-y-3 animate-fadeIn">
                <div>
                  <label className="text-[12px] font-bold text-[#141d1a]">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-2xl bg-[#ecf6f1] border border-transparent focus:border-[#004732] outline-none text-[14px] mt-1"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-bold text-[#141d1a]">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-2xl bg-[#ecf6f1] border border-transparent focus:border-[#004732] outline-none text-[14px] mt-1"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-bold text-[#141d1a]">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-2xl bg-[#ecf6f1] border border-transparent focus:border-[#004732] outline-none text-[14px] mt-1"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 rounded-full bg-[#004732] text-white font-bold text-[14px] cursor-pointer hover:bg-[#1e5f48] shadow-sm mt-2"
                >
                  Continue to Home &amp; Yard
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3 animate-fadeIn">
                <div>
                  <label className="text-[12px] font-bold text-[#141d1a]">Living Setup</label>
                  <select
                    value={housingType}
                    onChange={(e) => setHousingType(e.target.value)}
                    className="w-full h-11 px-3 rounded-2xl bg-[#ecf6f1] border border-transparent focus:border-[#004732] outline-none text-[14px] mt-1"
                  >
                    <option>House with Fenced Yard / Garden</option>
                    <option>House (Terrarium / Indoor Habitat Space)</option>
                    <option>Apartment / Condo (Pet-friendly)</option>
                    <option>Townhouse / Patio Home</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-bold text-[#141d1a]">Other Pets in Home</label>
                  <input
                    type="text"
                    value={hasPets}
                    onChange={(e) => setHasPets(e.target.value)}
                    placeholder="e.g. 1 golden retriever, 1 cat"
                    className="w-full h-11 px-3.5 rounded-2xl bg-[#ecf6f1] border border-transparent focus:border-[#004732] outline-none text-[14px] mt-1"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 rounded-full bg-[#ecf6f1] text-[#141d1a] font-semibold text-[14px] cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-2/3 py-3 rounded-full bg-[#004732] text-white font-bold text-[14px] cursor-pointer hover:bg-[#1e5f48] shadow-sm"
                  >
                    Continue to Lifestyle
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3 animate-fadeIn">
                <div>
                  <label className="text-[12px] font-bold text-[#141d1a]">Hours Alone on Weekdays</label>
                  <select
                    value={hoursAlone}
                    onChange={(e) => setHoursAlone(e.target.value)}
                    className="w-full h-11 px-3 rounded-2xl bg-[#ecf6f1] border border-transparent focus:border-[#004732] outline-none text-[14px] mt-1"
                  >
                    <option>0-2 hours (Work from home)</option>
                    <option>2-4 hours</option>
                    <option>4-6 hours (Dog walker visit)</option>
                    <option>6-8 hours</option>
                  </select>
                </div>
                <div className="p-3 bg-[#004732]/5 rounded-2xl text-[12px] text-[#404944] leading-relaxed">
                  PawSafe and our partner sanctuaries in Indonesia do not require perfection—we match real pets with real, loving humans. Your 7-day foster trial is included with full support.
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 py-3.5 rounded-full bg-[#ecf6f1] text-[#141d1a] font-semibold text-[14px] cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3.5 rounded-full bg-[#004732] text-white font-bold text-[14px] cursor-pointer hover:bg-[#1e5f48] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>Submit Application</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
