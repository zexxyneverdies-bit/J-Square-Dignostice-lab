import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare, Phone } from 'lucide-react';
import { DIAGNOSTIC_FAQS, CONTACT_INFO } from '../data/packages';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#EBF7F0] text-[#008F3F] text-xs font-bold mb-3 border border-[#B4E2C7]">
            <HelpCircle className="w-3.5 h-3.5 text-[#008F3F]" />
            Patient Help Centre
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#10243A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Everything you need to know about preparing for your blood tests, free home sample visits, and medical reports.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {DIAGNOSTIC_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isOpen
                    ? 'border-[#008F3F] bg-emerald-50/20 shadow-2xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#10243A]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen
                        ? 'bg-[#008F3F] text-white rotate-180'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Still have questions about a specific test?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Our clinical receptionist or lab technician is available 6:30 AM – 9:00 PM every day.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/918691027116?text=${encodeURIComponent('Hello J Square Lab! I have a question regarding test preparations.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>

            <a
              href={`tel:${CONTACT_INFO.receptionPhoneRaw}`}
              className="py-2.5 px-4 bg-[#10243A] hover:bg-[#1A3654] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Call Reception</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
