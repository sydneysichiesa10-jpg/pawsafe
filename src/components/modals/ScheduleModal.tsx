import React, { useState } from 'react';
import { Pet } from '../../types';

interface ScheduleModalProps {
  pet: Pet;
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ pet, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('Saturday, Oct 24');
  const [selectedTime, setSelectedTime] = useState('1:00 PM');
  const [bringingExistingDog, setBringingExistingDog] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const dates = [
    { label: 'Tomorrow', date: 'Thursday, Oct 22' },
    { label: 'Friday', date: 'Friday, Oct 23' },
    { label: 'Saturday', date: 'Saturday, Oct 24' },
    { label: 'Sunday', date: 'Sunday, Oct 25' },
  ];

  const times = ['10:30 AM', '1:00 PM', '3:30 PM', '5:00 PM'];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full sm:max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl space-y-4 text-left border border-[#e6f0eb]">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#f2fcf6]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#004732]">
              calendar_month
            </span>
            <div>
              <h2 className="text-[18px] font-bold text-[#141d1a]">Meet &amp; Greet with {pet.name}</h2>
              <p className="text-[12px] text-[#404944]">{pet.shelter.campus}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ecf6f1] text-[#404944] hover:text-[#141d1a] flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {confirmed ? (
          <div className="py-5 text-center space-y-3.5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#aff0d2] text-[#004732] flex items-center justify-center mx-auto shadow-md">
              <span className="material-symbols-outlined text-[36px] icon-filled">event_available</span>
            </div>
            <div>
              <h3 className="text-[20px] font-bold text-[#141d1a]">You're Scheduled!</h3>
              <p className="text-[14px] text-[#404944] mt-1">
                {selectedDate} at <strong>{selectedTime}</strong>
              </p>
              <p className="text-[12px] text-[#707973] mt-0.5">
                {pet.shelter.name} Outdoor Play Yard • {pet.shelter.address}
              </p>
            </div>

            <div className="p-3 bg-[#ecf6f1] rounded-2xl text-[12px] text-[#004732] leading-relaxed">
              We'll have a shady playpen reserved with tennis balls, fresh water, and {pet.name}'s favorite squeaky plush toy ready!
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-full bg-[#004732] text-white font-bold text-[14px] cursor-pointer hover:bg-[#1e5f48] shadow-sm"
            >
              Add to Calendar &amp; Close
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Pick Date */}
            <div>
              <label className="text-[12px] font-bold text-[#141d1a] block mb-2">Select Date</label>
              <div className="grid grid-cols-2 gap-2">
                {dates.map((d) => (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => setSelectedDate(d.date)}
                    className={`p-2.5 rounded-2xl text-left transition-all cursor-pointer border ${
                      selectedDate === d.date
                        ? 'bg-[#004732] text-white border-[#004732] shadow-sm'
                        : 'bg-[#ecf6f1] text-[#141d1a] border-transparent hover:bg-[#e0eae5]'
                    }`}
                  >
                    <p className="text-[11px] opacity-80">{d.label}</p>
                    <p className="text-[13px] font-bold">{d.date}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Pick Time */}
            <div>
              <label className="text-[12px] font-bold text-[#141d1a] block mb-2">Select Time Window</label>
              <div className="grid grid-cols-4 gap-1.5">
                {times.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className={`py-2 px-1 text-center rounded-xl text-[12px] font-bold transition-all cursor-pointer border ${
                      selectedTime === t
                        ? 'bg-[#004732] text-white border-[#004732]'
                        : 'bg-[#ecf6f1] text-[#404944] border-transparent hover:bg-[#e0eae5]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Existing Dog Intro checkbox */}
            <div
              onClick={() => setBringingExistingDog(!bringingExistingDog)}
              className="p-3 rounded-2xl bg-[#ecf6f1] flex items-center justify-between cursor-pointer"
            >
              <div className="min-w-0 pr-2">
                <p className="text-[13px] font-bold text-[#141d1a]">Bringing an existing pet?</p>
                <p className="text-[11px] text-[#404944]">Our trainer or care team will facilitate a neutral supervised greeting</p>
              </div>
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center text-white ${
                  bringingExistingDog ? 'bg-[#004732]' : 'border-2 border-[#707973]'
                }`}
              >
                {bringingExistingDog && (
                  <span className="material-symbols-outlined text-[16px]">check</span>
                )}
              </div>
            </div>

            {/* Confirmation CTA */}
            <button
              onClick={() => setConfirmed(true)}
              className="w-full h-13 py-3.5 px-6 rounded-full bg-[#004732] hover:bg-[#1e5f48] text-white font-bold text-[15px] shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              <span>Confirm Appointment</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
