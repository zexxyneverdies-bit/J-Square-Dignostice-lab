import React from 'react';
import { Calendar, MessageSquare, FileText, CheckCircle2, ShieldCheck, Clock, MapPin, Sparkles, Phone, Search, UserCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data/packages';
import { BrandLogo } from './BrandLogo';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenReportSearch: () => void;
  onOpenPrescriptionModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenReportSearch, onOpenPrescriptionModal }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0D1526] to-[#0F172A] text-white pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-800">
      {/* Subtle dotted-grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Soft red/maroon radial glow at bottom-left corner */}
      <div className="absolute -bottom-28 -left-28 w-[420px] h-[420px] rounded-full bg-[#DC2626]/15 blur-3xl pointer-events-none" />
      {/* Subtle emerald radial glow at top-right corner */}
      <div className="absolute -top-28 -right-28 w-[420px] h-[420px] rounded-full bg-[#0F6B3A]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Supporting copy, CTAs, Search & Trust Chips */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Free Home Sample Collection Banner with Red Medical Accent */}
            <div className="fade-up-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold mb-6 shadow-xs backdrop-blur-sm">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#DC2626] animate-ping" />
              <span className="font-bold text-[#DC2626]">FREE HOME SAMPLE COLLECTION</span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-emerald-400 font-semibold hidden sm:inline">Across Mumbai &amp; Navi Mumbai</span>
            </div>

            {/* Main Heading in Crisp White and Brand Medical Green */}
            <h1 className="fade-up-2 text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-display font-extrabold tracking-tight text-white leading-[1.15] text-balance mb-5">
              Trusted Diagnostic Care <br className="hidden sm:inline" />
              <span className="text-[#10B981] drop-shadow-sm">
                for You &amp; Your Family
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="fade-up-3 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              Accurate Testing, Caring Service &amp; Convenient Home Sample Collection.
              Supervised directly by Consultant Pathologist <strong className="text-white font-semibold">Dr. Patil Mohit Ashok</strong>, delivering digital reports in 6–12 hours.
            </p>

            {/* CTAs: Book Now (Primary Medical Green), WhatsApp (Bright Green), Secondary (Dark Glass) */}
            <div className="fade-up-4 flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-8">
              {/* Primary Book Now Button */}
              <button
                onClick={onOpenBooking}
                className="btn-scale w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-[#0F6B3A] hover:bg-[#0c572f] active:bg-[#083c20] rounded-xl shadow-lg shadow-[#0F6B3A]/30 transition-all cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>BOOK NOW</span>
              </button>

              {/* Doctor Prescription Button */}
              {onOpenPrescriptionModal && (
                <button
                  onClick={onOpenPrescriptionModal}
                  className="btn-scale w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
                  title="Doctor prescription"
                  aria-label="Doctor Prescription"
                >
                  <FileText className="w-5 h-5 text-emerald-200" />
                  <span>Doctor Prescription</span>
                </button>
              )}

              {/* WhatsApp Button (Bright Green #25D366) */}
              <a
                href={`https://wa.me/918691027116?text=${encodeURIComponent('Hello J Square Lab! I would like to book a blood test / health package with free home collection.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-scale w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-lg shadow-[#25D366]/30 transition-all cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 text-white" />
                <span>WHATSAPP</span>
              </a>

              {/* Secondary Download Report (Dark Glass Style) */}
              <button
                onClick={onOpenReportSearch}
                className="btn-scale w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-teal-500/30 rounded-xl transition-all cursor-pointer backdrop-blur-sm"
              >
                <FileText className="w-4 h-4 text-[#10B981]" />
                <span>DOWNLOAD REPORT</span>
              </button>

              {/* Secondary Call (Dark Glass Style) */}
              <a
                href={`tel:${CONTACT_INFO.receptionPhoneRaw}`}
                className="btn-scale w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-teal-500/30 rounded-xl transition-all cursor-pointer backdrop-blur-sm"
              >
                <Phone className="w-4 h-4 text-[#10B981]" />
                <span>CALL NOW</span>
              </a>
            </div>

            {/* Search Bar & Trust Feature Chips below search bar */}
            <div className="fade-up-5 w-full max-w-xl space-y-3.5">
              {/* Quick Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search 100+ diagnostic tests & health packages..."
                  onClick={onOpenBooking}
                  readOnly
                  className="w-full pl-10 pr-28 py-3 bg-white/5 hover:bg-white/10 border border-white/10 focus:border-emerald-500/50 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-400 cursor-pointer transition-all shadow-inner backdrop-blur-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Quick Book
                </span>
              </div>

              {/* Trust feature chips below search bar: dark rounded pills with a small icon, subtle border */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 backdrop-blur-sm hover:border-emerald-500/40 transition-colors">
                  <Clock className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>6:30 AM – 9:00 PM (All 7 Days)</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 backdrop-blur-sm hover:border-emerald-500/40 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Mumbai &amp; Navi Mumbai Doorstep</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 backdrop-blur-sm hover:border-emerald-500/40 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>100% Calibrated Analyzers</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 backdrop-blur-sm hover:border-emerald-500/40 transition-colors">
                  <UserCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>MD Pathologist Supervised</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Cards on the Dark Hero (Package Card with Glassmorphism) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Glassmorphic Package Card Container with subtle floating loop animation */}
              <div className="animate-float rounded-2xl bg-[#10243A]/70 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/60 overflow-hidden card-lift">
                
                {/* Header preview ribbon in Dark Navy with Yellow badge & Red dot */}
                <div className="p-5 border-b border-white/10">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    {/* Small red dot for Most Booked Family Package */}
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-pulse shrink-0" />
                      <span>Most Booked Family Package</span>
                    </span>

                    {/* Yellow badge (#FACC15, dark text) for Save ₹1,000 */}
                    <span className="bg-[#FACC15] text-[#0B1220] font-black text-xs px-2.5 py-1 rounded-md shadow-xs uppercase tracking-wide">
                      Save ₹1,000
                    </span>
                  </div>

                  {/* Logo Brand Header */}
                  <div className="flex items-center justify-between gap-3 bg-[#0B1220]/80 p-3 rounded-xl border border-white/10">
                    <BrandLogo size="md" layout="horizontal" theme="dark" />
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
                      NABL Compliant
                    </span>
                  </div>
                </div>

                {/* Laboratory Package Details & Pricing */}
                <div className="p-6 space-y-4">
                  {/* Package title & Price Showcase */}
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      Regular Health Profile &amp; Full Body Checkup
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      80+ Critical Parameters: CBC, Liver (LFT), Kidney (KFT), Lipid, HbA1c, Fasting Blood Sugar, Thyroid, Urine Routine.
                    </p>
                  </div>

                  {/* Pricing presentation: old price struck through in grey, new price in large bold green */}
                  <div className="flex items-baseline gap-3 pt-1 pb-2 border-b border-white/10">
                    <span className="text-3xl sm:text-4xl font-extrabold font-display text-[#10B981] font-mono">
                      ₹999
                    </span>
                    <span className="text-base text-slate-400 line-through font-mono">
                      ₹1,999
                    </span>
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      50% OFF
                    </span>
                  </div>

                  {/* Turnaround visual bar */}
                  <div className="relative rounded-xl bg-[#0B1220]/80 p-3 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-300">
                      <span>Report Delivery Turnaround</span>
                      <span className="font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded text-[10px] border border-emerald-500/30">
                        6 – 12 Hours
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#0F6B3A] via-emerald-400 to-[#10B981] h-full w-[90%] rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Home Collection</span>
                      <span>Automated Analysis</span>
                      <span>WhatsApp PDF</span>
                    </div>
                  </div>

                  {/* Highlights checklist */}
                  <div className="space-y-2 pt-1 text-xs text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span><strong className="text-white">Free Doorstep Sample Collection:</strong> Phlebotomist visits at your selected morning or evening slot.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span><strong className="text-white">100% Sterile Single-Use Vacutainer Tubes:</strong> Zero needle reuse with barcoded sample traceability.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span><strong className="text-white">Certified Pathologist Reports:</strong> Personally verified by Dr. Patil Mohit Ashok (MD Pathology).</span>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <button
                    onClick={onOpenBooking}
                    className="btn-scale w-full py-3 px-4 bg-[#0F6B3A] hover:bg-[#0c572f] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-[#0F6B3A]/30 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>Book This Package Doorstep</span>
                    <span className="font-bold underline text-emerald-200">₹999 Only &rarr;</span>
                  </button>
                </div>
              </div>

              {/* Floating doctor review badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-[#0B1220]/90 backdrop-blur-md rounded-xl p-3 shadow-xl border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-950/80 text-emerald-400 font-black flex items-center justify-center text-xs border border-emerald-500/30">
                  MD
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Dr. Patil Mohit Ashok</div>
                  <div className="text-[11px] text-slate-400">Consultant Pathologist Review</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
