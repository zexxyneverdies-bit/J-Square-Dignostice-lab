import React, { useState } from 'react';
import { Search, FileText, AlertCircle, CheckCircle2, Loader2, Download, Printer, Shield } from 'lucide-react';
import { CONTACT_INFO } from '../data/packages';

interface ReportSearchSectionProps {
  onViewReport: (reportData: any) => void;
}

export const ReportSearchSection: React.FC<ReportSearchSectionProps> = ({ onViewReport }) => {
  const [bookingId, setBookingId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foundReport, setFoundReport] = useState<any | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFoundReport(null);

    const cleanId = bookingId.trim();
    const cleanMobile = mobileNumber.replace(/\D/g, '').slice(-10);

    if (!cleanId && !cleanMobile) {
      setError('Please enter either your Booking ID (e.g. JSQ-20260928-00042) or 10-digit registered mobile number.');
      return;
    }

    if (cleanMobile && cleanMobile.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (cleanId) params.append('id', cleanId);
      if (cleanMobile) params.append('mobile', cleanMobile);

      const res = await fetch(`/api/reports/search?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'No report found. Please check your details or contact reception.');
      }

      setFoundReport(data.report);
      onViewReport(data.report);
    } catch (err: any) {
      setError(err.message || 'No report found. Please check your details or contact reception.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setBookingId('JSQ-20260928-00042');
    setMobileNumber('9820012345');
    setError(null);
  };

  return (
    <section id="download-report" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#EBF7F0] text-[#008F3F] text-xs font-bold mb-3 border border-[#B4E2C7]">
            <FileText className="w-3.5 h-3.5 text-[#008F3F]" />
            Digital Pathology Portal
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#10243A] tracking-tight">
            Download Your Lab Report
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Access, view, and download doctor-verified diagnostic reports anywhere with your Booking ID or registered mobile number.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-[#F4FAF6] rounded-2xl border border-[#B4E2C7]/60 p-6 sm:p-8 shadow-2xs">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Booking ID Input */}
              <div>
                <label className="block text-xs font-bold text-[#10243A] uppercase tracking-wider mb-1.5">
                  Patient / Booking ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    placeholder="e.g. JSQ-20260928-00042"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#008F3F] focus:border-[#008F3F] shadow-2xs uppercase placeholder:normal-case placeholder:font-sans text-[#10243A]"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Found on your appointment slip or SMS</p>
              </div>

              {/* Mobile Number Input */}
              <div>
                <label className="block text-xs font-bold text-[#10243A] uppercase tracking-wider mb-1.5">
                  Registered Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="9820012345"
                    className="w-full pl-11 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#008F3F] focus:border-[#008F3F] shadow-2xs text-[#10243A]"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">10-digit number used during booking</p>
              </div>
            </div>

            {/* Error banner with red highlight */}
            {error && (
              <div className="p-3.5 rounded-xl bg-[#FEECEB] border border-[#FCA5A5] text-[#E60000] text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#E60000] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">{error}</div>
                  <div className="mt-0.5 text-slate-700">
                    Need help? Call our reception at <a href={`tel:${CONTACT_INFO.receptionPhoneRaw}`} className="underline font-bold text-[#10243A]">{CONTACT_INFO.receptionPhone}</a>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button & Demo Helper */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-xs text-[#008F3F] hover:text-[#005F2A] underline font-bold cursor-pointer"
              >
                Fill Sample Booking (Demo: JSQ-20260928-00042)
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 bg-[#008F3F] hover:bg-[#007A35] active:bg-[#005F2A] text-white rounded-xl text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Searching Lab Database...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>SEARCH REPORT</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* If report found in preview */}
          {foundReport && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="p-4 rounded-xl bg-white border border-[#B4E2C7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#008F3F] text-white flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#10243A]">{foundReport.patientName}</h4>
                      <span className="text-[10px] font-mono bg-[#EBF7F0] text-[#008F3F] border border-[#B4E2C7] px-1.5 py-0.2 rounded font-bold">
                        {foundReport.status || 'Verified'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Booking: <span className="font-mono font-semibold text-[#10243A]">{foundReport.bookingId}</span> · {foundReport.packageName}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onViewReport(foundReport)}
                  className="w-full sm:w-auto px-4 py-2 bg-[#008F3F] hover:bg-[#007A35] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  View &amp; Print Report
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Security / Privacy disclaimer */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-4 text-center">
          <Shield className="w-3.5 h-3.5 text-[#008F3F]" />
          <span>Patient data is strictly encrypted and protected under healthcare confidentiality protocols.</span>
        </div>

      </div>
    </section>
  );
};
