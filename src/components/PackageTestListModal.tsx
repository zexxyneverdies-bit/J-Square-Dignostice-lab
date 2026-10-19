import React, { useState } from 'react';
import { X, Check, Search, Calendar, MessageSquare, Clock, AlertCircle, ShieldCheck } from 'lucide-react';
import { DiagnosticPackage, CustomAddon } from '../types';

interface PackageTestListModalProps {
  packageData: DiagnosticPackage | CustomAddon | null;
  onClose: () => void;
  onBookNow: (pkgId: string) => void;
  onWhatsApp: (pkg: DiagnosticPackage | CustomAddon) => void;
}

export const PackageTestListModal: React.FC<PackageTestListModalProps> = ({
  packageData,
  onClose,
  onBookNow,
  onWhatsApp
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!packageData) return null;

  const isDiagnostic = 'mrp' in packageData;
  const tests = packageData.testsIncluded;
  const filteredTests = tests.filter((t) =>
    t.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const displayName = packageData.name.replace(/^\d+\s*/, '');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#10243A] text-white p-5 sm:p-6 flex items-start justify-between gap-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[11px] font-black uppercase tracking-wider bg-[#0F6B3A] text-white px-2.5 py-0.5 rounded-full">
                {packageData.id === 'pkg-01'
                  ? '80+ Tests Included'
                  : packageData.id === 'pkg-12'
                  ? '75+ Tests Included'
                  : packageData.id === 'pkg-03' || packageData.id === 'pkg-04'
                  ? '70+ Tests Included'
                  : packageData.id === 'pkg-07' || packageData.id === 'pkg-09-m' || packageData.id === 'pkg-09-f'
                  ? '60+ Tests Included'
                  : packageData.id === 'pkg-08' || packageData.id === 'pkg-10' || packageData.id === 'pkg-11'
                  ? '45+ Tests Included'
                  : packageData.id === 'pkg-05'
                  ? '40+ Tests Included'
                  : packageData.id === 'pkg-02'
                  ? '80+ Parameters Included'
                  : ('testCountLabel' in packageData && packageData.testCountLabel)
                  ? `${packageData.testCountLabel} Tests Included`
                  : `${tests.length} Parameters Included`}
              </span>
              <span className="text-xs text-slate-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                NABL Compliant Lab
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              {displayName}
            </h3>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              {'description' in packageData ? packageData.description : 'Certified laboratory health screening profile.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Info Strip: Pricing & Turnaround */}
        <div className="bg-[#EBF7F0] border-b border-[#B4E2C7] px-5 sm:px-6 py-3 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-lg font-black text-[#0B1220] font-mono">
              ₹{packageData.finalPrice.toLocaleString('en-IN')}
            </span>
            {isDiagnostic && packageData.mrp > packageData.finalPrice && (
              <span className="text-xs text-slate-400 line-through font-mono">
                MRP ₹{packageData.mrp.toLocaleString('en-IN')}
              </span>
            )}
            <span className="bg-white text-[#0F6B3A] font-bold text-[11px] px-2 py-0.5 rounded border border-[#B4E2C7]">
              Free Home Sample Collection
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#0F6B3A]" />
            <span>
              Report in {isDiagnostic ? (packageData.reportTimeHours <= 8 ? 'Same Day' : `${packageData.reportTimeHours}h`) : '12h'}
            </span>
          </div>
        </div>

        {/* Fasting Notice if applicable */}
        {isDiagnostic && packageData.fastingRequired && (
          <div className="mx-5 sm:mx-6 mt-4 p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Fasting Protocol:</strong> {packageData.fastingHours || 10} hours of overnight fasting recommended before sample collection.
            </span>
          </div>
        )}

        {/* Clinical distinction for Radiology + Cardiology */}
        {packageData.id === 'pkg-11' && (
          <div className="mx-5 sm:mx-6 mt-3 p-3 bg-blue-50/80 border border-blue-200/80 rounded-xl text-xs text-slate-700 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-blue-900">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
              <span>Multi-Modality Cardiovascular & Imaging Panel</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Combines certified clinical radiology (Chest X-Ray PA View), cardiology investigations (12-Lead ECG, 2D Echo with Doppler), hemodynamic evaluation, and blood biochemical parameters. Intended for cardiovascular diagnostic assessment and risk stratification under clinical supervision; not a standalone guarantee of disease detection.
            </p>
          </div>
        )}

        {/* Clinical distinction for Fitness Certificate Package */}
        {packageData.id === 'pkg-12' && (
          <div className="mx-5 sm:mx-6 mt-3 p-3 bg-emerald-50/90 border border-emerald-200/90 rounded-xl text-xs text-slate-700 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#0F6B3A]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0F6B3A]" />
              <span>Multi-Parameter Health & Clinical Fitness Assessment</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Combines 75+ automated diagnostic laboratory parameters (complete hemogram, blood sugar, lipid profile, liver & kidney panels, thyroid, vitamins & inflammatory markers) with essential clinical physical measurements (Blood Pressure, BMI Evaluation, Snellen Chart Vision Screening, and Doctor Fitness Certification).
            </p>
          </div>
        )}

        {/* Search Filter for Tests */}
        {tests.length > 6 && (
          <div className="px-5 sm:px-6 pt-4 pb-1">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search parameter in this package..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0F6B3A] text-slate-800"
              />
            </div>
          </div>
        )}

        {/* Test List Parameters Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 max-h-[400px]">
          <div className="text-xs font-bold text-[#0B1220] uppercase tracking-wider mb-3">
            {packageData.id === 'pkg-01'
              ? '9 Key Profiles | 80+ Parameters & Tests Included'
              : packageData.id === 'pkg-12'
              ? '75+ Tests Included'
              : packageData.id === 'pkg-02'
              ? '9 Tests | 80+ Parameters Included'
              : packageData.id === 'pkg-03' || packageData.id === 'pkg-04'
              ? '70+ Tests Included'
              : packageData.id === 'pkg-07' || packageData.id === 'pkg-09-m' || packageData.id === 'pkg-09-f'
              ? '60+ Tests Included'
              : packageData.id === 'pkg-08' || packageData.id === 'pkg-10' || packageData.id === 'pkg-11'
              ? '45+ Tests Included'
              : packageData.id === 'pkg-05'
              ? '40+ Tests Included'
              : ('testCountLabel' in packageData && packageData.testCountLabel)
              ? `${packageData.testCountLabel} Tests Included`
              : `All Included Tests & Parameters (${filteredTests.length}):`}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {filteredTests.map((test, index) => (
              <div
                key={index}
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-[#0F6B3A]/40 transition-colors"
              >
                <div className="w-5 h-5 rounded-md bg-[#EBF7F0] text-[#0F6B3A] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs text-slate-800 font-medium leading-snug">
                  {test}
                </span>
              </div>
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div className="text-center py-6 text-xs text-slate-500">
              No parameters matched &ldquo;{searchTerm}&rdquo;
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 flex-wrap">
          <button
            onClick={() => {
              onClose();
              onWhatsApp(packageData);
            }}
            className="flex-1 sm:flex-initial py-2.5 px-4 bg-white hover:bg-[#EBF7F0] text-[#0F6B3A] border border-[#B4E2C7] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#0F6B3A]" />
            <span>Inquire on WhatsApp</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onBookNow(packageData.id);
            }}
            className="flex-1 sm:flex-initial py-2.5 px-6 bg-[#0F6B3A] hover:bg-[#0c572f] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Now • ₹{packageData.finalPrice.toLocaleString('en-IN')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
