import React, { useState } from 'react';
import { UserProfile, VoucherReward, RedeemedVoucher } from '../../types';
import { VOUCHER_CATALOG } from '../../data/mockData';

interface VouchersModalProps {
  userProfile: UserProfile;
  onClose: () => void;
  onRedeemVoucher: (voucher: VoucherReward) => boolean;
  onNavigateToRadar: () => void;
}

export const VouchersModal: React.FC<VouchersModalProps> = ({
  userProfile,
  onClose,
  onRedeemVoucher,
  onNavigateToRadar,
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'my-vouchers'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'vet' | 'grooming' | 'supplies' | 'cafe'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);
  const [successRedeemedVoucher, setSuccessRedeemedVoucher] = useState<RedeemedVoucher | null>(null);

  const points = userProfile.achievementPoints ?? 0;
  const myVouchers = userProfile.redeemedVouchers ?? [];

  const filteredCatalog = VOUCHER_CATALOG.filter((v) => {
    if (selectedCategory === 'all') return true;
    return v.category === selectedCategory;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleRedeem = (voucher: VoucherReward) => {
    if (points < voucher.pointsCost) return;
    setRedeemingId(voucher.id);

    setTimeout(() => {
      const success = onRedeemVoucher(voucher);
      setRedeemingId(null);
      if (success) {
        // Find newest voucher
        const newest = (userProfile.redeemedVouchers || [])[0];
        if (newest) {
          setSuccessRedeemedVoucher(newest);
        }
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl border border-[#e6f0eb] flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#e6f0eb] bg-gradient-to-br from-[#004732] via-[#003827] to-[#1e5f48] text-white relative">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#fbbc04] text-[#332300] text-[11px] font-black flex items-center gap-1 shadow-sm">
              <span>🏆</span>
              Rescue Rewards
            </span>
            <span className="text-[11px] text-white/80">PawSafe Partner Perks</span>
          </div>

          <h2 className="text-[20px] font-bold text-white tracking-tight">
            Achievement Points & Vouchers
          </h2>

          {/* Points Balance Card */}
          <div className="mt-3 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fbbc04] text-[#332300] flex items-center justify-center font-black text-[20px] shadow-sm">
                ⭐
              </div>
              <div>
                <p className="text-[11px] text-white/80 font-medium">Your Current Balance</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-black text-white tracking-tight">{points}</span>
                  <span className="text-[12px] font-bold text-[#aff0d2]">PTS</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onNavigateToRadar();
              }}
              className="text-[11px] font-bold bg-[#aff0d2] text-[#002115] hover:bg-white px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1 shadow-sm"
            >
              <span>+ Earn More</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#e6f0eb] bg-[#f8fcf9] p-1.5 gap-1.5">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex-1 py-2 rounded-2xl text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'catalog'
                ? 'bg-white text-[#004732] shadow-xs border border-[#e6f0eb]'
                : 'text-[#404944] hover:bg-[#ecf6f1]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">storefront</span>
            <span>Redeem Store ({VOUCHER_CATALOG.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('my-vouchers')}
            className={`flex-1 py-2 rounded-2xl text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'my-vouchers'
                ? 'bg-white text-[#004732] shadow-xs border border-[#e6f0eb]'
                : 'text-[#404944] hover:bg-[#ecf6f1]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
            <span>My Vouchers ({myVouchers.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-[#141d1a] flex-1">
          {/* TAB 1: CATALOG */}
          {activeTab === 'catalog' && (
            <>
              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {[
                  { id: 'all', label: 'All Rewards' },
                  { id: 'vet', label: 'Vet Clinics' },
                  { id: 'grooming', label: 'Grooming' },
                  { id: 'supplies', label: 'Pet Supplies' },
                  { id: 'cafe', label: 'Pet Cafés' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#004732] text-white shadow-xs'
                        : 'bg-[#ecf6f1] text-[#404944] hover:bg-[#dbe5e0]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Earn Tips Banner */}
              <div className="bg-[#f2fcf6] p-3 rounded-2xl border border-[#dbe5e0]/60 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#004732]">radar</span>
                  <span className="text-[#404944]">
                    Earn <strong>+250 points</strong> for every animal saved on Radar!
                  </span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToRadar();
                  }}
                  className="font-bold text-[#004732] hover:underline"
                >
                  View Radar
                </button>
              </div>

              {/* Vouchers Grid */}
              <div className="space-y-3">
                {filteredCatalog.map((v) => {
                  const canAfford = points >= v.pointsCost;
                  const isRedeeming = redeemingId === v.id;

                  return (
                    <div
                      key={v.id}
                      className="bg-white rounded-2xl p-4 border border-[#e6f0eb] shadow-2xs hover:shadow-xs transition-all space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="px-2 py-0.5 rounded-md bg-[#fff9eb] text-[#855e00] font-bold text-[10px] border border-[#fde7b3]">
                              {v.badge}
                            </span>
                            <span className="text-[11px] font-semibold text-[#004732]">
                              {v.discount}
                            </span>
                          </div>
                          <h3 className="text-[14px] font-bold text-[#141d1a] leading-tight">
                            {v.title}
                          </h3>
                          <p className="text-[11px] text-[#707973] mt-0.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">location_on</span>
                            {v.partner}
                          </p>
                        </div>

                        {/* Points Cost Badge */}
                        <div className="flex flex-col items-end flex-shrink-0">
                          <span className="px-2.5 py-1 rounded-xl bg-[#ecf6f1] text-[#004732] text-[12px] font-black border border-[#dbe5e0]/60 flex items-center gap-1">
                            <span>⭐</span>
                            {v.pointsCost} pts
                          </span>
                        </div>
                      </div>

                      <p className="text-[12px] text-[#404944] leading-relaxed bg-[#f8fcf9] p-2.5 rounded-xl border border-[#e6f0eb]/60">
                        {v.description}
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-[#f2fcf6]">
                        <span className="text-[10px] text-[#707973] max-w-[200px] truncate">
                          {v.terms}
                        </span>

                        <button
                          onClick={() => handleRedeem(v)}
                          disabled={!canAfford || isRedeeming}
                          className={`py-1.5 px-3.5 rounded-full text-[12px] font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs active:scale-95 disabled:cursor-not-allowed ${
                            canAfford
                              ? 'bg-[#004732] hover:bg-[#1e5f48] text-white'
                              : 'bg-[#f2fcf6] text-[#707973] border border-[#dbe5e0]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {canAfford ? 'shopping_bag' : 'lock'}
                          </span>
                          <span>
                            {isRedeeming
                              ? 'Redeeming...'
                              : canAfford
                              ? 'Redeem Voucher'
                              : `Need ${v.pointsCost - points} more`}
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* TAB 2: MY VOUCHERS WALLET */}
          {activeTab === 'my-vouchers' && (
            <div className="space-y-3">
              {myVouchers.length === 0 ? (
                <div className="text-center py-10 px-4 space-y-3 bg-[#f8fcf9] rounded-2xl border border-dashed border-[#dbe5e0]">
                  <div className="w-12 h-12 rounded-full bg-[#ecf6f1] text-[#004732] flex items-center justify-center mx-auto text-[24px]">
                    🎟️
                  </div>
                  <h3 className="text-[15px] font-bold text-[#141d1a]">No Vouchers Redeemed Yet</h3>
                  <p className="text-[12px] text-[#707973] max-w-xs mx-auto">
                    You have <strong className="text-[#004732]">{points} pts</strong> available. Browse the reward store to redeem partner vet, grooming, and café discounts!
                  </p>
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="py-2 px-4 rounded-full bg-[#004732] text-white text-[12px] font-bold hover:bg-[#1e5f48] transition-all cursor-pointer shadow-xs inline-flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[15px]">storefront</span>
                    <span>Browse Rewards Store</span>
                  </button>
                </div>
              ) : (
                myVouchers.map((mv) => (
                  <div
                    key={mv.id}
                    className="bg-white rounded-2xl border-2 border-[#004732]/20 overflow-hidden shadow-sm space-y-0"
                  >
                    {/* Voucher Top Ribbon */}
                    <div className="bg-[#004732] text-white px-4 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-[#aff0d2]">confirmation_number</span>
                        <span className="text-[12px] font-bold">{mv.discount}</span>
                      </div>
                      <span className="text-[10px] font-semibold bg-white/20 px-2 py-0.5 rounded-full text-white">
                        Active Pass
                      </span>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="text-[14px] font-bold text-[#141d1a] leading-tight">
                          {mv.title}
                        </h4>
                        <p className="text-[11px] text-[#707973] mt-0.5">{mv.partner}</p>
                      </div>

                      {/* Promo Code Box */}
                      <div className="bg-[#f2fcf6] p-3 rounded-xl border border-[#dbe5e0] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-[#707973] uppercase tracking-wider block">
                            Voucher Promo Code
                          </span>
                          <span className="text-[15px] font-mono font-bold text-[#004732] tracking-wider">
                            {mv.code}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(mv.code)}
                          className={`py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                            copiedCode === mv.code
                              ? 'bg-[#004732] text-white'
                              : 'bg-white text-[#004732] border border-[#dbe5e0] hover:bg-[#ecf6f1]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {copiedCode === mv.code ? 'check' : 'content_copy'}
                          </span>
                          <span>{copiedCode === mv.code ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>

                      {/* Barcode & Redemption Instructions */}
                      <div className="flex items-center justify-between text-[11px] text-[#707973] pt-1 border-t border-[#f2fcf6]">
                        <span>Expires: {mv.expiresAt}</span>
                        <span className="text-[#004732] font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">qr_code_scanner</span>
                          Show code at checkout
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-[#e6f0eb] bg-[#f8fcf9] flex items-center justify-between text-[11px] text-[#404944]">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#004732]">verified</span>
            Vouchers verified by PawSafe Indonesia
          </span>
          <button
            onClick={onClose}
            className="font-bold text-[#004732] hover:underline cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
