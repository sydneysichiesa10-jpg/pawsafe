import React from 'react';

export type NavTab = 'radar' | 'report' | 'locate' | 'adopt' | 'settings';

interface BottomNavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-3 inset-x-3 sm:inset-x-0 sm:max-w-md sm:mx-auto z-40 pb-safe">
      <div className="bg-[#ffffff]/95 backdrop-blur-2xl rounded-full px-2 py-1.5 flex items-center justify-between shadow-[0_12px_36px_-6px_rgba(20,29,26,0.12),0_4px_12px_rgba(20,29,26,0.06)] ring-1 ring-[#dbe5e0]/60">
        {/* Radar Tab */}
        <button
          onClick={() => onTabChange('radar')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-full transition-all cursor-pointer ${
            currentTab === 'radar'
              ? 'text-[#004732] font-bold'
              : 'text-[#404944] hover:text-[#141d1a]'
          }`}
          type="button"
        >
          <span className={`material-symbols-outlined text-[23px] ${currentTab === 'radar' ? 'icon-filled' : ''}`}>
            explore
          </span>
          <span className="text-[11px] tracking-wide mt-0.5">Radar</span>
        </button>

        {/* Report Tab */}
        <button
          onClick={() => onTabChange('report')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-full transition-all cursor-pointer ${
            currentTab === 'report'
              ? 'text-[#a13e28] font-bold'
              : 'text-[#404944] hover:text-[#141d1a]'
          }`}
          type="button"
        >
          <span className={`material-symbols-outlined text-[23px] ${currentTab === 'report' ? 'icon-filled text-[#a13e28]' : ''}`}>
            emergency
          </span>
          <span className="text-[11px] tracking-wide mt-0.5">Report</span>
        </button>

        {/* Locate Tab */}
        <button
          onClick={() => onTabChange('locate')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-full transition-all cursor-pointer ${
            currentTab === 'locate'
              ? 'text-[#004732] font-bold'
              : 'text-[#404944] hover:text-[#141d1a]'
          }`}
          type="button"
        >
          <span className={`material-symbols-outlined text-[23px] ${currentTab === 'locate' ? 'icon-filled' : ''}`}>
            local_hospital
          </span>
          <span className="text-[11px] tracking-wide mt-0.5">Locate</span>
        </button>

        {/* Adopt Tab - Feature Highlighted */}
        <button
          onClick={() => onTabChange('adopt')}
          className="flex-1 flex flex-col items-center justify-center py-1 text-[#004732] transition-transform active:scale-95 min-h-[48px] rounded-full cursor-pointer"
          type="button"
        >
          {currentTab === 'adopt' ? (
            <span className="w-10 h-10 -my-1 rounded-full bg-[#004732] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[22px] font-bold icon-filled">
                pets
              </span>
            </span>
          ) : (
            <span className="w-10 h-10 -my-1 rounded-full bg-[#ecf6f1] text-[#004732] flex items-center justify-center hover:bg-[#aff0d2]/40 transition-colors">
              <span className="material-symbols-outlined text-[22px]">pets</span>
            </span>
          )}
          <span className={`text-[11px] mt-1 ${currentTab === 'adopt' ? 'text-[#004732] font-bold' : 'text-[#404944]'}`}>
            Adopt
          </span>
        </button>

        {/* Settings Tab */}
        <button
          onClick={() => onTabChange('settings')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-full transition-all cursor-pointer ${
            currentTab === 'settings'
              ? 'text-[#004732] font-bold'
              : 'text-[#404944] hover:text-[#141d1a]'
          }`}
          type="button"
        >
          <span className={`material-symbols-outlined text-[23px] ${currentTab === 'settings' ? 'icon-filled' : ''}`}>
            settings
          </span>
          <span className="text-[11px] tracking-wide mt-0.5">Settings</span>
        </button>
      </div>
    </nav>
  );
};
