import React from 'react';
import { Phone, MessageSquare, Mail, Clock, MapPin, Calendar, HeartHandshake } from 'lucide-react';
import { CONTACT_INFO } from '../data/packages';
import { BrandLogo } from './BrandLogo';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="contact" className="py-16 bg-[#F4FAF6] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Official Brand Logo */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex justify-center mb-4">
            <BrandLogo size="md" layout="horizontal" />
          </div>
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#EBF7F0] text-[#008F3F] text-xs font-bold border border-[#B4E2C7]">
              <HeartHandshake className="w-3.5 h-3.5 text-[#008F3F]" />
              Always Here For Your Family
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#10243A] tracking-tight">
            Contact J SQUARE LAB
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Reach our clinical pathology reception desk or direct helpline for immediate home collection bookings and test inquiries.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Main Reception Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs hover:border-[#008F3F] transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EBF7F0] text-[#008F3F] flex items-center justify-center mb-4 border border-[#B4E2C7]/50">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-500">
                Primary Reception Desk
              </span>
              <h3 className="text-xl font-bold text-[#10243A] mt-1 mb-2 font-mono">
                {CONTACT_INFO.receptionPhone}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Direct phone inquiries, test consultations, and immediate doorstep phlebotomy coordination.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex flex-col gap-2">
              <a
                href={`tel:${CONTACT_INFO.receptionPhoneRaw}`}
                className="w-full py-2.5 px-4 bg-[#008F3F] hover:bg-[#007A35] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Reception Now
              </a>
              <a
                href={`https://wa.me/918691027116?text=${encodeURIComponent('Hello J Square Lab! I have a question regarding tests and home sample collection.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-white hover:bg-[#EBF7F0] text-[#10243A] hover:text-[#008F3F] border border-slate-300 hover:border-[#008F3F] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#008F3F]" />
                WhatsApp Reception
              </a>
            </div>
          </div>

          {/* Saeeda Mam Direct Helpline Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs hover:border-[#008F3F] transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EBF7F0] text-[#008F3F] flex items-center justify-center mb-4 border border-[#B4E2C7]/50">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-500">
                Lab In-Charge &amp; Technician
              </span>
              <h3 className="text-xl font-bold text-[#10243A] mt-1 mb-1 font-mono">
                {CONTACT_INFO.saeedaPhone}
              </h3>
              <div className="text-xs font-bold text-[#008F3F] mb-2">
                Saeeda Mam
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Personalized collection scheduling, special pediatric / geriatric care, and urgent reporting requests.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex flex-col gap-2">
              <a
                href={`tel:${CONTACT_INFO.saeedaPhoneRaw}`}
                className="w-full py-2.5 px-4 bg-[#008F3F] hover:bg-[#007A35] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Saeeda Mam
              </a>
              <a
                href={`https://wa.me/918850172102?text=${encodeURIComponent('Hello Saeeda Mam! I would like assistance with a blood test / health checkup appointment.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-white hover:bg-[#EBF7F0] text-[#10243A] hover:text-[#008F3F] border border-slate-300 hover:border-[#008F3F] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#008F3F]" />
                WhatsApp Saeeda Mam
              </a>
            </div>
          </div>

          {/* Operating Hours & Lab Location Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs hover:border-[#008F3F] transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EBF7F0] text-[#008F3F] flex items-center justify-center mb-4 border border-[#B4E2C7]/50">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-500">
                Laboratory Operating Hours
              </span>
              <h3 className="text-lg font-bold text-[#10243A] mt-1 mb-2">
                {CONTACT_INFO.hours}
              </h3>
              <div className="flex items-start gap-2 text-xs text-slate-600 mt-2">
                <MapPin className="w-4 h-4 text-[#008F3F] shrink-0 mt-0.5" />
                <span>Service Region: <strong className="text-[#10243A]">Mumbai &amp; Navi Mumbai</strong> (Free Home Sample Collection)</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-600 mt-2">
                <Mail className="w-4 h-4 text-[#008F3F] shrink-0 mt-0.5" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-[#008F3F] hover:underline break-all font-semibold">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 bg-[#008F3F] hover:bg-[#007A35] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book Home Collection
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
