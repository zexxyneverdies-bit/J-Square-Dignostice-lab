import React, { useEffect } from 'react';
import { X, FileText, CreditCard, PackageCheck, FileSpreadsheet, MapPin, Lock, ShieldCheck, ArrowLeft, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../data/packages';

interface TermsConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsConditionsModal: React.FC<TermsConditionsModalProps> = ({
  isOpen,
  onClose
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const policies = [
    {
      number: '1',
      title: 'Payment & Refund Policy',
      icon: CreditCard,
      badgeColor: 'bg-emerald-50 text-[#008F3F] border-emerald-200',
      description:
        'If you experience any issue due to our fault, the eligible refund will be processed within 2–3 working days after confirmation and approval.'
    },
    {
      number: '2',
      title: 'Package Policy',
      icon: PackageCheck,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      description:
        'Test packages, prices, and included tests are displayed on the website, and any changes will be communicated to the customer before booking confirmation.'
    },
    {
      number: '3',
      title: 'Report Policy',
      icon: FileSpreadsheet,
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      description:
        'Reports will be shared digitally or through the agreed method after processing, and reporting time may vary depending on the tests performed.'
    },
    {
      number: '4',
      title: 'Location Policy',
      icon: MapPin,
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      description:
        'Home sample collection is available across Mumbai, including Colaba, Dadar, Thane, Navi Mumbai, Govandi, Mankhurd, Kurla, and surrounding areas, subject to service availability and phlebotomist coverage at the time of booking. Location details are used solely for service availability verification and sample collection coordination.'
    },
    {
      number: '5',
      title: 'Privacy Policy',
      icon: Lock,
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      description:
        'Customer information, contact details, booking records, and payment-related information are handled securely and used only for service delivery, communication, and legal compliance.'
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 sm:my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#10243A] text-white p-5 sm:p-6 relative border-b border-[#1A3654]">
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Terms & Conditions modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#008F3F]/20 text-[#34D399] text-xs font-semibold mb-2.5 border border-[#008F3F]/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official Policies &amp; Service Guidelines
          </div>

          <h3 id="terms-modal-title" className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#008F3F]" />
            Terms &amp; Conditions
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
            Please review our patient service policies, refund guidelines, home collection terms, and privacy commitments for J SQUARE Lab &amp; Diagnostic Centre.
          </p>
        </div>

        {/* Modal Body: 5 Policies */}
        <div className="p-5 sm:p-7 max-h-[68vh] overflow-y-auto space-y-4 sm:space-y-5 bg-slate-50/50">
          {policies.map((policy) => {
            const Icon = policy.icon;
            return (
              <div
                key={policy.number}
                className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs hover:border-[#008F3F]/50 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border ${policy.badgeColor}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-[#008F3F] bg-[#EBF7F0] px-2 py-0.5 rounded-md border border-[#B4E2C7]/60">
                        Policy {policy.number}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-[#10243A]">
                        {policy.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {policy.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Contact Support Note */}
          <div className="p-4 rounded-xl bg-[#EBF7F0] border border-[#B4E2C7] text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="font-bold text-[#10243A]">Have any questions regarding our policies?</div>
              <div className="text-slate-600">Our senior reception team is available 7 days a week from {CONTACT_INFO.hours}.</div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`tel:${CONTACT_INFO.receptionPhoneRaw}`}
                className="px-3 py-1.5 rounded-lg bg-[#008F3F] text-white hover:bg-[#007A35] font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="px-3 py-1.5 rounded-lg bg-white text-[#10243A] border border-slate-300 hover:bg-slate-100 font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#008F3F]" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer / Navigation */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Last updated: {new Date().getFullYear()} · J SQUARE Lab &amp; Diagnostic Centre
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#10243A] hover:bg-[#1A3654] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#008F3F]" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
