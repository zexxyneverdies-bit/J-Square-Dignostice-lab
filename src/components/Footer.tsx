import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Phone, Mail, Clock, MapPin, ShieldCheck, HeartHandshake, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../data/packages';
import { CompactPhlebotomyNetwork } from './CompactPhlebotomyNetwork';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenReportSearch: () => void;
  onOpenStaffPortal: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenReportSearch,
  onOpenStaffPortal,
  onOpenTerms
}) => {
  return (
    <footer className="bg-[#10243A] text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-[#1A3654]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1A3654]">
          
          {/* Brand Col with Official Logo */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" layout="horizontal" theme="dark" />
            
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm pt-2">
              {CONTACT_INFO.tagline}. High-precision pathology laboratory accredited for accurate routine &amp; specialized diagnostics with complimentary doorstep phlebotomy across Mumbai &amp; Navi Mumbai.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div><strong>Pathology Consultant:</strong> {CONTACT_INFO.doctor}</div>
              <div><strong>Lab Technician:</strong> {CONTACT_INFO.technician}</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#home" className="hover:text-[#008F3F] transition-colors">Home</a>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#008F3F] transition-colors">Diagnostic Packages</a>
              </li>
              <li>
                <a href="#home-collection" className="hover:text-[#008F3F] transition-colors">Free Home Collection</a>
              </li>
              <li>
                <a href="#phlebotomy-network" className="hover:text-[#008F3F] transition-colors">Phlebotomy Network</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#008F3F] transition-colors">Patient Reviews</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-[#008F3F] transition-colors">Diagnostic FAQs</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#008F3F] transition-colors">About Our Lab</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#008F3F] transition-colors">Contact Reception</a>
              </li>
              <li>
                <button
                  onClick={onOpenReportSearch}
                  className="hover:text-[#008F3F] transition-colors text-left text-[#008F3F] font-bold cursor-pointer"
                >
                  Download Lab Report
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-[#008F3F] transition-colors text-left text-slate-300 font-medium cursor-pointer flex items-center gap-1.5"
                >
                  <span>Terms &amp; Conditions</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a href={`tel:${CONTACT_INFO.receptionPhoneRaw}`} className="hover:text-white transition-colors flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#008F3F]" />
                  <span className="font-mono text-white font-semibold">{CONTACT_INFO.receptionPhone}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 text-emerald-400 transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp: <strong className="font-mono text-white font-semibold">{CONTACT_INFO.whatsappPhone}</strong></span>
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_INFO.saeedaPhoneRaw}`} className="hover:text-white transition-colors flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#008F3F]" />
                  <span className="font-mono text-white font-semibold">{CONTACT_INFO.saeedaPhone}</span> (Saeeda Mam)
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors flex items-center gap-2 break-all">
                  <Mail className="w-3.5 h-3.5 text-[#008F3F]" />
                  <span className="text-slate-300">{CONTACT_INFO.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-[#008F3F] shrink-0 mt-0.5" />
                <span>Mumbai &amp; Navi Mumbai Doorstep Coverage</span>
              </li>
            </ul>
          </div>

          {/* Timings & Staff */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white mb-4">
              Timings &amp; Access
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#008F3F] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white font-mono">{CONTACT_INFO.hours}</div>
                  <div className="text-[11px] text-slate-400">Doorstep visits 7 days a week</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenStaffPortal}
                  className="px-3 py-1.5 rounded-lg bg-[#1A3654] hover:bg-[#254A72] text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#008F3F]" />
                  Staff Portal Login
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Compact Diagnostic Phlebotomy Network Section */}
        <CompactPhlebotomyNetwork onOpenBooking={onOpenBooking} />

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} J SQUARE LAB &amp; DIAGNOSTIC CENTRE. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
            <button
              onClick={onOpenTerms}
              className="text-slate-300 hover:text-white underline underline-offset-4 decoration-[#008F3F] transition-colors cursor-pointer font-semibold"
            >
              Terms &amp; Conditions
            </button>
            <span>·</span>
            <span>Mumbai &amp; Navi Mumbai</span>
            <span>·</span>
            <span className="text-[#008F3F] font-semibold">Doctor Supervised Diagnostic Care</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
