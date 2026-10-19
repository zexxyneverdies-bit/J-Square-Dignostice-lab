import React from 'react';
import { UserCheck, ShieldCheck, Award, Heart, Phone, Mail, Clock } from 'lucide-react';
import { CONTACT_INFO } from '../data/packages';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-[#F4FAF6] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#EBF7F0] text-[#008F3F] text-xs font-bold mb-3 border border-[#B4E2C7]">
            <Award className="w-3.5 h-3.5 text-[#008F3F]" />
            Empirical Medical Integrity
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#10243A] tracking-tight">
            About J SQUARE LAB &amp; DIAGNOSTIC
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {CONTACT_INFO.tagline}. Serving Mumbai and Navi Mumbai with dedicated clinical pathology, automated analyzers, and attentive patient care.
          </p>
        </div>

        {/* Doctor & Lab Technician Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          
          {/* Medical Pathology Doctor Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs hover:border-[#008F3F]/60 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-[#10243A] text-white font-black text-xl flex items-center justify-center shadow-md border-2 border-[#008F3F]">
                  DR
                </div>
                <div>
                  <div className="text-xs font-mono font-bold uppercase text-[#008F3F] tracking-wider">
                    Medical / Pathology Doctor
                  </div>
                  <h3 className="text-xl font-bold text-[#10243A] leading-tight">
                    {CONTACT_INFO.doctor}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Consultant Pathologist &amp; Clinical Laboratory Director
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Supervising every biochemical test, hematological smear, tumor marker evaluation, and clinical pathology validation. Ensuring zero diagnostic margin for error and strict compliance with national quality control guidelines.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 text-[#008F3F] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#008F3F]" />
                100% Doctor Certified Reports
              </span>
              <span>Mumbai &amp; Navi Mumbai</span>
            </div>
          </div>

          {/* Chief Lab Technician Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs hover:border-[#008F3F]/60 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-[#008F3F] text-white font-black text-xl flex items-center justify-center shadow-md border-2 border-[#005F2A]">
                  LT
                </div>
                <div>
                  <div className="text-xs font-mono font-bold uppercase text-[#008F3F] tracking-wider">
                    Lab Technician &amp; Patient Care
                  </div>
                  <h3 className="text-xl font-bold text-[#10243A] leading-tight">
                    Saeeda
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Lead Medical Lab Technician &amp; Collection Coordinator
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Overseeing aseptic sample handling, vacutainer barcode processing, automated analyzer calibration, and patient helpline support. Ensuring every home collection appointment is on time and comfortable.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <a
                href={`tel:${CONTACT_INFO.saeedaPhoneRaw}`}
                className="flex items-center gap-1 text-[#008F3F] font-bold hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-[#008F3F]" />
                Saeeda Mam: {CONTACT_INFO.saeedaPhone}
              </a>
              <span>Head of Operations</span>
            </div>
          </div>

        </div>

        {/* Operating Hours & Diagnostic Ethics Banner in Dark Navy */}
        <div className="rounded-2xl bg-[#10243A] text-white p-6 sm:p-8 max-w-4xl mx-auto shadow-md border border-[#1A3654]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-[#1A3654]">
            <div className="sm:pr-4">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#008F3F] font-bold mb-1">
                <Clock className="w-4 h-4" />
                Working Hours
              </div>
              <div className="text-lg font-bold text-white font-mono">{CONTACT_INFO.hours}</div>
              <p className="text-[11px] text-slate-300 mt-1">Open on Sundays &amp; public holidays for home collections.</p>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-6">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#008F3F] font-bold mb-1">
                <Phone className="w-4 h-4" />
                Direct Helpline
              </div>
              <div className="text-lg font-bold text-white font-mono">{CONTACT_INFO.receptionPhone}</div>
              <p className="text-[11px] text-slate-300 mt-1">Immediate dispatch of phlebotomists across Mumbai &amp; Navi Mumbai.</p>
            </div>

            <div className="pt-4 sm:pt-0 sm:pl-6">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#008F3F] font-bold mb-1">
                <Mail className="w-4 h-4" />
                Laboratory Email
              </div>
              <div className="text-sm font-bold text-white break-all">{CONTACT_INFO.email}</div>
              <p className="text-[11px] text-slate-300 mt-1">Digital reports, corporate fitness certificates, and query support.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
