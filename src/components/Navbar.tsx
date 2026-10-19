import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Phone, Calendar, UserCheck, Menu, X, FileText, Clock, MapPin, Mail, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../data/packages';

interface NavbarProps {
  onOpenBooking: (pkgId?: string) => void;
  onOpenStaffPortal: () => void;
  onOpenReportSearch: () => void;
  onOpenPrescriptionModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenStaffPortal,
  onOpenReportSearch,
  onOpenPrescriptionModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Packages', href: '#packages' },
    { label: 'Home Visit', href: '#home-collection' },
    { label: 'Network', href: '#phlebotomy-network' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
    { label: 'Download Report', href: '#download-report', isAction: true, onClick: onOpenReportSearch }
  ];

  return (
    <>
      {/* Top Utility Bar: Dark Navy (#0B1220 to #0F172A), 12px text */}
      <div className="bg-[#0B1220] text-slate-200 text-xs py-2 px-4 border-b border-slate-800/80 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-[12px]">
          {/* Left: Green status dot + Free Doorstep Sample Collection + Location Pin + Clock */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse shrink-0 ring-4 ring-[#10B981]/20" />
              <strong className="text-white font-semibold">Free Doorstep Sample Collection</strong>
            </span>

            <span className="text-slate-700 hidden sm:inline">•</span>

            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span>{CONTACT_INFO.location}</span>
            </span>

            <span className="text-slate-700 hidden md:inline">•</span>

            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span>{CONTACT_INFO.hours}</span>
            </span>
          </div>

          {/* Right: Email + Reception Numbers */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto flex-wrap">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="hidden lg:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span>{CONTACT_INFO.email}</span>
            </a>

            <span className="text-slate-700 hidden lg:inline">•</span>

            <a
              href={`tel:${CONTACT_INFO.receptionPhoneRaw}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span>Reception: <strong className="font-semibold text-white font-mono">{CONTACT_INFO.receptionPhone}</strong></span>
            </a>

            {CONTACT_INFO.receptionPhoneSecondary && (
              <>
                <span className="text-slate-700 hidden sm:inline">/</span>
                <a
                  href={`tel:${CONTACT_INFO.receptionPhoneSecondaryRaw}`}
                  className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white font-mono transition-colors"
                >
                  {CONTACT_INFO.receptionPhoneSecondary}
                </a>
              </>
            )}

            <span className="text-slate-700 hidden sm:inline">•</span>

            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              title="Chat on WhatsApp (+91 86910 27116)"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
              <span>WhatsApp: <strong className="font-semibold text-white font-mono">{CONTACT_INFO.whatsappNumber}</strong></span>
            </a>

            <span className="text-slate-700 hidden md:inline">|</span>

            <button
              onClick={onOpenStaffPortal}
              className="text-slate-300 hover:text-white transition-colors hidden sm:flex items-center gap-1 text-[11px] cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#10B981]" />
              Staff Login
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-2.5'
            : 'bg-white border-b border-slate-200 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Zone 1: Official J SQUARE Brand Logo */}
          <a href="#home" className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F6B3A] rounded-lg">
            <BrandLogo size="md" layout="horizontal" />
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-[#0B1220]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className={`transition-colors hover:text-[#0F6B3A] ${
                  link.isAction
                    ? 'text-[#0F6B3A] font-bold flex items-center gap-1.5 bg-[#EBF7F0] px-3.5 py-1.5 rounded-xl border border-teal-500/30'
                    : ''
                }`}
              >
                {link.isAction && <FileText className="w-4 h-4 text-[#0F6B3A]" />}
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: CTA Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenPrescriptionModal && (
              <button
                onClick={onOpenPrescriptionModal}
                className="btn-scale inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#10243A] bg-emerald-50 hover:bg-emerald-100/80 rounded-xl border border-emerald-200/80 shadow-2xs whitespace-nowrap cursor-pointer"
                title="Doctor prescription"
                aria-label="Doctor Prescription"
              >
                <FileText className="w-3.5 h-3.5 text-[#008F3F]" />
                <span>Doctor Prescription</span>
              </button>
            )}

            <a
              href={`tel:${CONTACT_INFO.receptionPhoneRaw}`}
              className="btn-scale inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#0B1220] bg-white/80 hover:bg-[#EBF7F0] hover:text-[#0F6B3A] rounded-xl border border-teal-500/30 shadow-2xs whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#0F6B3A]" />
              <span>Call Us</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="btn-scale inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#0F6B3A] hover:bg-[#0c572f] active:bg-[#083c20] rounded-xl shadow-md shadow-[#0F6B3A]/25 whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden px-3 py-1.5 text-xs font-bold text-white bg-[#0F6B3A] hover:bg-[#0c572f] rounded-xl shadow-sm"
            >
              Book Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0B1220] hover:text-[#0F6B3A] focus:outline-none focus:ring-2 focus:ring-[#0F6B3A] rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col gap-2 text-base font-semibold text-[#0B1220]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.onClick) {
                      e.preventDefault();
                      link.onClick();
                    }
                  }}
                  className={`py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    link.isAction
                      ? 'bg-[#EBF7F0] text-[#0F6B3A] font-bold border border-teal-500/30'
                      : 'hover:bg-[#F4FAF6] hover:text-[#0F6B3A]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.isAction && <FileText className="w-4 h-4 text-[#0F6B3A]" />}
                </a>
              ))}

              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2.5">
                <a
                  href={`tel:${CONTACT_INFO.receptionPhoneRaw}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-[#0B1220] bg-slate-50 hover:bg-[#EBF7F0] rounded-xl border border-slate-200"
                >
                  <Phone className="w-4 h-4 text-[#0F6B3A]" />
                  Call Reception ({CONTACT_INFO.receptionPhone})
                </a>

                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  Chat on WhatsApp ({CONTACT_INFO.whatsappPhone})
                </a>

                {onOpenPrescriptionModal && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenPrescriptionModal();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-[#10243A] bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-300"
                    aria-label="Doctor Prescription"
                  >
                    <FileText className="w-4 h-4 text-[#008F3F]" />
                    Doctor Prescription
                  </button>
                )}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-[#0F6B3A] hover:bg-[#0c572f] rounded-xl shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Book Diagnostic Test / Package
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenStaffPortal();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-500 hover:text-[#0B1220]"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#0F6B3A]" />
                  Staff Portal Login
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
