import React from 'react';

interface NotificationsModalProps {
  onClose: () => void;
  onNavigateToRadar: () => void;
  onNavigateToAdopt: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  onClose,
  onNavigateToRadar,
  onNavigateToAdopt,
}) => {
  const notifications = [
    {
      id: 1,
      type: 'sos',
      title: 'Urgent SOS Nearby: Box of 3 Pups',
      time: '18m ago',
      desc: 'Jl. Asia Afrika & Cikapundung, Bandung. 2 volunteers requested for transport.',
      action: 'radar',
    },
    {
      id: 2,
      type: 'adopt',
      title: 'Barnaby Adoption Interest',
      time: '1h ago',
      desc: '2 meet & greets scheduled this Saturday at PawSafe Haven Kemang.',
      action: 'adopt',
    },
    {
      id: 3,
      type: 'foster',
      title: 'Foster Match Needed',
      time: '3h ago',
      desc: 'Small terrier (Pip) completed medical triage and ready for home foster in Sleman, Yogyakarta.',
      action: 'adopt',
    },
    {
      id: 4,
      type: 'info',
      title: 'PawSafe Indonesia Volunteer Badge',
      time: 'Yesterday',
      desc: 'Thank you for clocking 18 triage response hours across Jakarta!',
      action: null,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full sm:max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl space-y-4 text-left border border-[#e6f0eb]">
        <div className="flex items-center justify-between pb-2 border-b border-[#f2fcf6]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#004732]">
              notifications
            </span>
            <h3 className="text-[18px] font-bold text-[#141d1a]">Rescue Alerts</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ecf6f1] text-[#404944] hover:text-[#141d1a] flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (n.action === 'radar') {
                  onNavigateToRadar();
                  onClose();
                } else if (n.action === 'adopt') {
                  onNavigateToAdopt();
                  onClose();
                }
              }}
              className="p-3.5 rounded-2xl bg-[#ecf6f1] hover:bg-[#e0eae5] transition-all cursor-pointer space-y-1"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    n.type === 'sos'
                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                      : n.type === 'adopt'
                      ? 'bg-[#aff0d2] text-[#002115]'
                      : 'bg-white text-[#404944]'
                  }`}
                >
                  {n.type.toUpperCase()}
                </span>
                <span className="text-[11px] text-[#707973]">{n.time}</span>
              </div>
              <h4 className="text-[14px] font-bold text-[#141d1a]">{n.title}</h4>
              <p className="text-[12px] text-[#404944] leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
