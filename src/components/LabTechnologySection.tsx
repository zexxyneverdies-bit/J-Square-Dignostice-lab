import React from 'react';
import { Microscope, ShieldCheck, Cpu, Snowflake, QrCode, CheckCircle2, Award } from 'lucide-react';
import { CONTACT_INFO } from '../data/packages';

export const LabTechnologySection: React.FC = () => {
  const features = [
    {
      icon: Cpu,
      title: 'Automated Diagnostic Analyzers',
      description: 'Fully automated Roche Cobas & Sysmex 5-Part hematology analyzers eliminating manual pipetting errors and providing precision coefficients < 1.5%.'
    },
    {
      icon: Snowflake,
      title: 'Validated Cold-Chain Phlebotomy',
      description: 'Specimen tubes are transported in temperature-monitored isothermal carrier boxes (2°C–8°C) to prevent analyte degradation before processing.'
    },
    {
      icon: QrCode,
      title: 'Barcoded Vacuum Gel Tubes',
      description: 'Every blood tube receives a unique patient barcode at the bedside. Direct bidirectional LIS interface prevents any human specimen mix-up.'
    },
    {
      icon: ShieldCheck,
      title: 'Dual MD Pathologist Authorization',
      description: `Supervised by ${CONTACT_INFO.doctor}. All critical panic values are promptly re-tested and clinically verified before report dispatch.`
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#EBF7F0] text-[#008F3F] text-xs font-bold mb-3 border border-[#B4E2C7]">
            <Microscope className="w-3.5 h-3.5 text-[#008F3F]" />
            Clinical Laboratory Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#10243A] tracking-tight">
            How J Square Lab Guarantees 100% Diagnostic Accuracy
          </h2>
          <p className="mt-3 text-base text-slate-600">
            From the moment your blood is drawn at home to final pathologist sign-off, every step follows world-class quality protocols.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 hover:border-[#008F3F] transition-all hover:bg-white shadow-2xs hover:shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EBF7F0] text-[#008F3F] flex items-center justify-center mb-4 border border-[#B4E2C7]/60">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#10243A] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-bold text-[#008F3F]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Quality Assured</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Equipment & Standards Band */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-[#10243A] to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 text-[#34D399] flex items-center justify-center shrink-0 border border-[#10B981]/30">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#34D399] uppercase tracking-wider">
                Accredited Diagnostic Standards
              </div>
              <h4 className="text-base font-bold text-white">
                Strict Internal &amp; External Quality Control (EQAS)
              </h4>
              <p className="text-xs text-slate-300">
                Calibrated against international standard reference sera with dual-level daily internal quality checks (IQC).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold border border-white/15">
              Sysmex Hematology
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold border border-white/15">
              Roche Cobas
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold border border-white/15">
              BD Vacutainer
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
