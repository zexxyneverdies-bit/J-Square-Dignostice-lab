import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { CONTACT_INFO } from '../data/packages';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  return (
    <div
      className="fixed right-3 sm:right-6 bottom-3 sm:bottom-6 z-50 flex flex-col items-end gap-2 sm:gap-2.5 pointer-events-auto no-print"
      aria-label="Quick Action Buttons"
    >
      {/* 1. "Book Free Home Collection" - Green pill with calendar icon */}
      <button
        onClick={onOpenBooking}
        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#0F6B3A] hover:bg-[#0c572f] text-white text-[11px] sm:text-xs font-bold shadow-lg shadow-[#0F6B3A]/30 transition-all duration-200 hover:-translate-y-1 active:scale-95 cursor-pointer"
        aria-label="Book Free Home Collection"
      >
        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
        <span className="whitespace-nowrap">Book Free Home Collection</span>
      </button>

      {/* 2. "Call Now" - Dark teal pill with phone icon + Pulse Ring Animation */}
      <a
        href={`tel:${CONTACT_INFO.receptionPhoneRaw}`}
        className="animate-pulse-ring-teal inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#115E59] hover:bg-[#0F766E] text-white text-[11px] sm:text-xs font-bold shadow-lg shadow-teal-950/30 transition-all duration-200 hover:-translate-y-1 active:scale-95 cursor-pointer"
        aria-label="Call Now"
      >
        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-emerald-300" />
        <span className="whitespace-nowrap">Call Now</span>
      </a>

      {/* 3. Round WhatsApp button (green) + Pulse Ring Animation */}
      <a
        href={`https://wa.me/918691027116?text=${encodeURIComponent('Hello J Square Lab! I would like to book a blood test with free home collection.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="animate-pulse-ring-green flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl shadow-[#25D366]/40 transition-all duration-200 hover:-translate-y-1 active:scale-95 cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
      </a>
    </div>
  );
};
