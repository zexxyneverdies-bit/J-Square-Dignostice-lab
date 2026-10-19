import React from 'react';
import { Calendar, Bike } from 'lucide-react';

interface OfferTickerProps {
  onOpenBooking: () => void;
}

export const OfferTicker: React.FC<OfferTickerProps> = ({ onOpenBooking }) => {
  // Pattern items:
  // [white pill button "BOOK NOW" with calendar icon] • [scooter icon + "free home visit till next monday"] • ["per visit charge ₹300"] • [yellow pill "NOW ₹0 • FREE"] • [white pill "BOOK NOW"]
  const renderTickerSegment = (keyPrefix: string) => (
    <div key={keyPrefix} className="inline-flex items-center gap-4 sm:gap-6 shrink-0 px-3">
      {/* 1. White pill button BOOK NOW */}
      <button
        onClick={onOpenBooking}
        className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white text-[#DC2626] text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-sm hover:bg-slate-100 transition-transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
      >
        <Calendar className="w-3.5 h-3.5 text-[#DC2626]" />
        <span>BOOK NOW</span>
      </button>

      <span className="text-white/40 font-bold">•</span>

      {/* 2. Scooter icon + free home visit till next monday */}
      <span className="inline-flex items-center gap-1.5 text-white font-bold text-xs sm:text-sm tracking-wide uppercase whitespace-nowrap">
        <Bike className="w-4 h-4 text-yellow-300 shrink-0" />
        <span>Free Home Visit Till Next Monday</span>
      </span>

      <span className="text-white/40 font-bold">•</span>

      {/* 3. per visit charge ₹300 (struck through) */}
      <span className="inline-flex items-center gap-1.5 text-white/90 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">
        <span>Per Visit Charge</span>
        <span className="line-through text-white/70 font-mono">₹300</span>
      </span>

      <span className="text-white/40 font-bold">•</span>

      {/* 4. Yellow pill NOW ₹0 • FREE */}
      <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full bg-[#FACC15] text-[#0F172A] text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-sm whitespace-nowrap">
        NOW ₹0 • FREE
      </span>

      <span className="text-white/40 font-bold">•</span>

      {/* 5. White pill BOOK NOW */}
      <button
        onClick={onOpenBooking}
        className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white text-[#DC2626] text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-sm hover:bg-slate-100 transition-transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
      >
        <Calendar className="w-3.5 h-3.5 text-[#DC2626]" />
        <span>BOOK NOW</span>
      </button>

      <span className="text-white/40 font-bold">•</span>
    </div>
  );

  return (
    <div
      className="relative w-full h-14 bg-[#DC2626] border-y border-red-700/60 overflow-hidden flex items-center shadow-md select-none pause-hover z-30"
      aria-label="Limited time free home collection announcement"
    >
      {/* Side shadow vignettes for smooth visual roll-in */}
      <div className="absolute left-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-r from-[#DC2626] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-l from-[#DC2626] to-transparent z-10 pointer-events-none" />

      {/* Marquee container with seamless duplication */}
      <div className="animate-marquee flex items-center">
        {renderTickerSegment('seg-1')}
        {renderTickerSegment('seg-2')}
        {renderTickerSegment('seg-3')}
        {renderTickerSegment('seg-4')}
      </div>
    </div>
  );
};
