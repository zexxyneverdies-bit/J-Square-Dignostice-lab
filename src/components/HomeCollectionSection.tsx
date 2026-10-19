import React from 'react';
import { Home, Clock, ShieldCheck, Thermometer, CheckCircle2, Calendar, Phone, MapPin } from 'lucide-react';
import { COLLECTION_TIME_SLOTS, CONTACT_INFO, SERVICE_AREAS } from '../data/packages';

interface HomeCollectionSectionProps {
  onOpenBooking: () => void;
}

export const HomeCollectionSection: React.FC<HomeCollectionSectionProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      step: '01',
      title: 'Book Your Slot',
      desc: 'Pick your preferred diagnostic package, date, and morning or evening time slot online or over phone.'
    },
    {
      step: '02',
      title: 'Sterile Doorstep Visit',
      desc: 'Certified phlebotomist arrives with sterile single-use vacutainer needles and personal protective equipment.'
    },
    {
      step: '03',
      title: 'Cold-Chain Transit',
      desc: 'Samples are barcoded on-the-spot and transported in insulated temperature-controlled cold boxes.'
    },
    {
      step: '04',
      title: 'Doctor-Verified Report',
      desc: 'Automated analyzer results reviewed by Dr. Patil Mohit Ashok and sent directly to your WhatsApp in 6–12h.'
    }
  ];

  return (
    <section id="home-collection" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EBF7F0] text-[#008F3F] text-xs font-bold mb-3 border border-[#B4E2C7]">
              <Home className="w-3.5 h-3.5 text-[#008F3F]" />
              <span>Complimentary Doorstep Convenience</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#10243A] tracking-tight leading-tight">
              Free Home Sample Collection Across Mumbai &amp; Navi Mumbai
            </h2>

            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              No need to travel to the lab or stand in queues while fasting. Our trained phlebotomy specialists bring high-standard pathology care directly to your living room at <strong className="text-[#008F3F]">zero collection fee</strong>.
            </p>

            {/* Badges / Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4FAF6] border border-[#B4E2C7]/60">
                <Thermometer className="w-5 h-5 text-[#008F3F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#10243A]">Strict Cold-Chain Integrity</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Continuous 2°C – 8°C chilled storage boxes ensure specimen enzyme preservation.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4FAF6] border border-[#B4E2C7]/60">
                <ShieldCheck className="w-5 h-5 text-[#008F3F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#10243A]">100% Sterile Single-Use Kits</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Vacutainer tubes and needles unsealed directly in front of the patient.</p>
                </div>
              </div>
            </div>

            {/* Booking CTA row */}
            <div className="flex flex-wrap items-center gap-3.5 mt-8">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 bg-[#008F3F] hover:bg-[#007A35] active:bg-[#005F2A] text-white rounded-xl text-sm font-bold shadow-md shadow-[#008F3F]/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Schedule Doorstep Collection
              </button>

              <a
                href={`tel:${CONTACT_INFO.receptionPhoneRaw}`}
                className="px-5 py-3.5 bg-slate-50 hover:bg-[#EBF7F0] text-[#10243A] hover:text-[#008F3F] rounded-xl text-sm font-bold border border-slate-300 hover:border-[#008F3F] transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#008F3F]" />
                Call +91 86910 27116
              </a>
            </div>
          </div>

          {/* Right Column: Time Slots in Dark Navy Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#10243A] text-white p-6 sm:p-7 shadow-xl border border-[#1A3654]">
              <div className="flex items-center justify-between pb-4 border-b border-[#1A3654]">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#008F3F]" />
                  <span className="font-bold text-sm tracking-wide">Daily Collection Slots</span>
                </div>
                <span className="text-[11px] font-mono text-[#008F3F] bg-[#0A1726] px-2 py-0.5 rounded border border-[#008F3F]/40 font-bold">
                  All 7 Days
                </span>
              </div>

              {/* Time Slots List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-5">
                {COLLECTION_TIME_SLOTS.map((slot, index) => (
                  <div
                    key={index}
                    className="p-2.5 rounded-lg bg-[#1A3654]/80 border border-slate-700/60 text-xs font-mono flex items-center justify-between"
                  >
                    <span className="text-slate-200">{slot}</span>
                    <span className="w-2 h-2 rounded-full bg-[#008F3F]" />
                  </div>
                ))}
              </div>

              {/* Service Areas */}
              <div className="pt-4 border-t border-[#1A3654]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 mb-2">
                  <MapPin className="w-4 h-4 text-[#008F3F]" />
                  <span>Coverage Across Mumbai &amp; Navi Mumbai:</span>
                </div>
                <ul className="text-[11px] text-slate-400 space-y-1">
                  {SERVICE_AREAS.slice(0, 4).map((area, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008F3F] shrink-0" />
                      <span>{area}</span>
                    </li>
                  ))}
                  <li className="text-emerald-300 font-semibold pt-1">
                    + Navi Mumbai (Vashi, Nerul, Belapur, Kharghar, Panvel) &amp; Thane
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Process Bar */}
        <div className="pt-8 border-t border-slate-200">
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-[#10243A]">How Home Sample Collection Works</h3>
            <p className="text-xs text-slate-500 mt-1">Simple, sanitary, and certified four-step diagnostic procedure</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, index) => (
              <div key={index} className="relative p-5 rounded-xl bg-[#F4FAF6] border border-[#B4E2C7]/50">
                <span className="text-2xl font-mono font-black text-[#008F3F]/30">
                  {s.step}
                </span>
                <h4 className="text-sm font-bold text-[#10243A] mt-1 mb-1.5">
                  {s.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
