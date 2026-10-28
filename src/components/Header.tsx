import React from 'react';
import { PAWSAFE_LOGO, USER_AVATAR } from '../data/mockData';

interface HeaderProps {
  currentLocation: string;
  onOpenLocationPicker: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onOpenLocationPicker,
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 2,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#f2fcf6]/90 backdrop-blur-xl pt-safe shadow-[0_4px_20px_rgba(20,29,26,0.03)] border-b border-[#e6f0eb]/60">
      <div className="max-w-md mx-auto h-16 sm:h-20 px-4 sm:px-5 flex items-center justify-between gap-2">
        {/* Brand & Location */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            alt="PawSafe Logo"
            className="h-8 w-auto object-contain flex-shrink-0"
            src={PAWSAFE_LOGO}
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[19px] sm:text-[20px] tracking-tight text-[#004732] leading-tight truncate">
                PawSafe
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#a13e28] animate-pulse" title="Live Network Active" />
            </div>
            <button
              onClick={onOpenLocationPicker}
              className="flex items-center gap-0.5 text-[#404944] hover:text-[#004732] transition-colors text-left -ml-0.5 group cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px] text-[#004732] group-hover:scale-110 transition-transform">
                near_me
              </span>
              <span className="text-[12px] font-semibold truncate max-w-[140px] sm:max-w-[170px] text-[#404944]">
                {currentLocation}
              </span>
              <span className="material-symbols-outlined text-[14px] text-[#707973]">
                expand_more
              </span>
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          <button
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#404944] hover:bg-[#ecf6f1] transition-all relative active:scale-95 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#a13e28] ring-2 ring-[#f2fcf6]" />
            )}
          </button>

          <button
            onClick={onOpenProfile}
            className="flex items-center pl-1 focus:outline-none cursor-pointer group"
            title="Sydney Sichiesa • Rescuer Profile"
          >
            <img
              alt="Sydney Sichiesa Profile"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#004732]/25 shadow-sm group-hover:ring-[#004732] transition-all"
              src={USER_AVATAR}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
