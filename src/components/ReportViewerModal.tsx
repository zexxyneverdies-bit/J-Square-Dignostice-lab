import React from 'react';
import { DiagnosticReport } from '../types';
import { BrandLogo } from './BrandLogo';
import { Printer, X, Download, ShieldCheck, CheckCircle2, Award, Calendar, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../data/packages';

interface ReportViewerModalProps {
  report: DiagnosticReport;
  onClose: () => void;
}

export const ReportViewerModal: React.FC<ReportViewerModalProps> = ({ report, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Top Control Bar */}
        <div className="no-print bg-[#10243A] px-6 py-3 border-b border-[#1A3654] flex items-center justify-between text-white">
          <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-200">
            <ShieldCheck className="w-4 h-4 text-[#008F3F]" />
            Verified Clinical Pathology Report
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-[#008F3F] hover:bg-[#007A35] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1A3654] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="p-6 sm:p-8 space-y-6 text-[#10243A]" id="report-print-area">
          
          {/* Official Letterhead */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#008F3F]">
            <div>
              <BrandLogo size="lg" layout="horizontal" />
              <div className="text-[11px] font-bold text-[#10243A] mt-2">
                J SQUARE LAB &amp; DIAGNOSTIC CENTRE
              </div>
              <div className="text-[10px] text-slate-500">
                Mumbai &amp; Navi Mumbai · Helpline: {CONTACT_INFO.receptionPhone} · {CONTACT_INFO.email}
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="inline-block border border-[#008F3F] text-[#008F3F] text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#EBF7F0]">
                NABL COMPLIANT LAB
              </div>
              <div className="text-xs font-mono font-bold text-[#10243A] mt-1">
                Report ID: {report.reportId}
              </div>
              <div className="text-[11px] text-slate-500">
                Status: <strong className="text-[#008F3F] font-bold">{report.status || 'Final'}</strong>
              </div>
            </div>
          </div>

          {/* Patient Demographics & Sample Barcode Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#F4FAF6] border border-[#B4E2C7]/60 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Patient Name</span>
              <strong className="text-sm font-bold text-[#10243A]">{report.patientName}</strong>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Age / Gender</span>
              <span className="font-semibold text-slate-800">{report.age} Yrs / {report.gender}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Booking Ref</span>
              <span className="font-mono text-slate-800 font-semibold">{report.bookingId}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Registered Mobile</span>
              <span className="font-mono text-slate-800 font-semibold">+91 {report.mobile}</span>
            </div>

            <div className="col-span-2 pt-2 border-t border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Sample Collected At</span>
              <span className="text-slate-700">{report.sampleCollectedAt}</span>
            </div>

            <div className="col-span-2 pt-2 border-t border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Referred By</span>
              <span className="text-slate-700">{report.referredBy}</span>
            </div>
          </div>

          {/* Test Sections & Parameters Results */}
          <div className="space-y-6">
            {report.results && report.results.map((sec, sIdx) => (
              <div key={sIdx} className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-[#10243A] text-white py-2 px-4 text-xs font-bold font-mono tracking-wider flex items-center justify-between">
                  <span>{sec.sectionName}</span>
                  <span className="text-[10px] text-emerald-300 font-normal">Method: Automated Photometry / Flow Cytometry</span>
                </div>

                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F4FAF6] text-[#10243A] font-bold border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Investigation / Parameter</th>
                      <th className="py-2.5 px-4 text-right">Observed Value</th>
                      <th className="py-2.5 px-4 text-center">Unit</th>
                      <th className="py-2.5 px-4">Biological Reference Range</th>
                      <th className="py-2.5 px-4 text-center">Flag</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sec.items.map((item, iIdx) => (
                      <tr key={iIdx} className="hover:bg-slate-50/80">
                        <td className="py-2 px-4 font-semibold text-[#10243A]">
                          {item.parameter}
                        </td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-[#10243A] tabular-nums">
                          {item.result}
                        </td>
                        <td className="py-2 px-4 text-center text-slate-500 font-mono text-[11px]">
                          {item.unit}
                        </td>
                        <td className="py-2 px-4 text-slate-600 text-[11px] font-mono">
                          {item.referenceRange}
                        </td>
                        <td className="py-2 px-4 text-center">
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              item.flag === 'Normal'
                                ? 'bg-[#EBF7F0] text-[#008F3F] border border-[#B4E2C7]'
                                : 'bg-[#FEECEB] text-[#E60000] border border-[#FCA5A5]'
                            }`}
                          >
                            {item.flag || 'Normal'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {/* End of Report Bar */}
          <div className="text-center py-2 border-y border-dashed border-slate-300 text-[11px] text-slate-400 font-mono">
            *** END OF DIAGNOSTIC REPORT · J SQUARE LAB &amp; DIAGNOSTIC CENTRE ***
          </div>

          {/* Medical Doctor Signatures & Verification Seal */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs">
            {/* Lab Technician Verification */}
            <div>
              <div className="font-mono text-[#008F3F] font-bold italic text-sm">
                Saeeda
              </div>
              <div className="font-bold text-[#10243A] mt-1">{CONTACT_INFO.technician}</div>
              <div className="text-[10px] text-slate-500">Specimen Processing &amp; Quality Check</div>
            </div>

            {/* Pathologist Verification & Official Digital Seal */}
            <div className="text-left sm:text-right">
              <div className="font-mono text-[#10243A] font-bold italic text-sm">
                Dr. Patil Mohit Ashok
              </div>
              <div className="font-bold text-[#10243A] mt-1">{CONTACT_INFO.doctor}</div>
              <div className="text-[10px] text-slate-500">MD Pathology · Consultant Pathologist &amp; Lab In-Charge</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
