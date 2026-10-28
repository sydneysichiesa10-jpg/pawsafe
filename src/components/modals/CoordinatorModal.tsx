import React, { useState } from 'react';
import { Pet, UserProfile } from '../../types';

interface CoordinatorModalProps {
  pet: Pet;
  userProfile?: UserProfile;
  onClose: () => void;
}

export const CoordinatorModal: React.FC<CoordinatorModalProps> = ({ pet, userProfile, onClose }) => {
  // If user is logged in, greet them by their username (or nickname); if not logged in, greet as Guest
  const recipientName = userProfile?.isLoggedIn
    ? (userProfile.username || userProfile.nickname || userProfile.fullName || 'Guest')
    : 'Guest';

  const [messages, setMessages] = useState<Array<{ sender: 'coordinator' | 'user'; text: string; time: string }>>([
    {
      sender: 'coordinator',
      text: `Hi ${recipientName}! I'm ${pet.shelter.coordinator}, adoption coordinator at ${pet.shelter.name}. How can I help you with ${pet.name} today?`,
      time: '10:14 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const quickQuestions = [
    `Is ${pet.name} tested with cats?`,
    `Can I do the 7-day foster trial first?`,
    `What is ${pet.name}'s daily routine?`,
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: text.trim(),
      time: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let reply = `That's a wonderful question! ${pet.name} has been evaluated by our lead trainer. He is very patient and does great in structured environments. We'd love to have you meet him in person!`;
      if (text.toLowerCase().includes('cat')) {
        reply = `${pet.name} passed our indoor cat test with curious sniffing and no prey drive. We still recommend slow, supervised introductions with baby gates for the first few days!`;
      } else if (text.toLowerCase().includes('trial') || text.toLowerCase().includes('foster')) {
        reply = `Yes, absolutely! Every adoption comes with our 7-Day Trial Foster program. We provide a crate, collar, harness, starter food, and 24/7 volunteer text support while you try everyday life together.`;
      }
      setMessages((prev) => [
        ...prev,
        {
          sender: 'coordinator',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full sm:max-w-md rounded-t-[32px] sm:rounded-[32px] p-5 shadow-2xl flex flex-col h-[520px] max-h-[85vh] text-left border border-[#e6f0eb]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#f2fcf6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#aff0d2] text-[#004732] font-bold flex items-center justify-center text-[15px]">
              {pet.shelter.coordinator.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'CP'}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-[16px] font-bold text-[#141d1a]">{pet.shelter.coordinator}</h3>
                <span className="w-2 h-2 rounded-full bg-[#004732]" title="Active now" />
              </div>
              <p className="text-[12px] text-[#404944]">Adoption Lead • {pet.shelter.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ecf6f1] text-[#404944] hover:text-[#141d1a] flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Message stream */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#004732] text-white rounded-br-none shadow-sm'
                    : 'bg-[#ecf6f1] text-[#141d1a] rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-[#707973] px-1 mt-0.5">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Quick Question Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 border-t border-[#f2fcf6]">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-full bg-[#ecf6f1] text-[#004732] hover:bg-[#dbe5e0] text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input bar */}
        <div className="pt-2 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Message ${pet.shelter.coordinator}...`}
            className="flex-1 h-11 px-4 rounded-full bg-[#ecf6f1] text-[13px] outline-none border border-transparent focus:border-[#004732]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="w-11 h-11 rounded-full bg-[#004732] text-white flex items-center justify-center disabled:opacity-40 cursor-pointer shadow-sm hover:bg-[#1e5f48] transition-colors"
          >
            <span className="material-symbols-outlined text-[19px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
