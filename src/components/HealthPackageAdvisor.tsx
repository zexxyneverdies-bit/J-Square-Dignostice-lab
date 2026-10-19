import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, User, Users, Heart, Shield, Activity, RotateCcw } from 'lucide-react';
import { DIAGNOSTIC_PACKAGES } from '../data/packages';

interface HealthPackageAdvisorProps {
  onSelectPackage: (pkgId: string) => void;
}

export const HealthPackageAdvisor: React.FC<HealthPackageAdvisorProps> = ({ onSelectPackage }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [recipient, setRecipient] = useState<string>('self');
  const [healthConcern, setHealthConcern] = useState<string>('preventive');

  const handleNext = () => {
    setStep(2);
  };

  const handleReset = () => {
    setStep(1);
    setRecipient('self');
    setHealthConcern('preventive');
  };

  // Determine recommendation
  const getRecommendation = () => {
    if (recipient === 'parents') {
      return DIAGNOSTIC_PACKAGES.find((p) => p.id === 'pkg-03') || DIAGNOSTIC_PACKAGES[0];
    }
    if (recipient === 'women') {
      if (healthConcern === 'pregnancy') {
        return DIAGNOSTIC_PACKAGES.find((p) => p.id === 'pkg-05') || DIAGNOSTIC_PACKAGES[0];
      }
      return DIAGNOSTIC_PACKAGES.find((p) => p.id === 'pkg-04') || DIAGNOSTIC_PACKAGES[0];
    }
    if (recipient === 'kids') {
      return DIAGNOSTIC_PACKAGES.find((p) => p.id === 'pkg-07') || DIAGNOSTIC_PACKAGES[0];
    }
    if (recipient === 'student') {
      return DIAGNOSTIC_PACKAGES.find((p) => p.id === 'pkg-08') || DIAGNOSTIC_PACKAGES[0];
    }

    // Default for self
    if (healthConcern === 'inflammation' || healthConcern === 'heart') {
      return DIAGNOSTIC_PACKAGES.find((p) => p.id === 'pkg-02') || DIAGNOSTIC_PACKAGES[0];
    }
    if (healthConcern === 'thyroid') {
      return DIAGNOSTIC_PACKAGES.find((p) => p.id === 'pkg-06') || DIAGNOSTIC_PACKAGES[0];
    }
    if (healthConcern === 'cardiology') {
      return DIAGNOSTIC_PACKAGES.find((p) => p.id === 'pkg-11') || DIAGNOSTIC_PACKAGES[0];
    }
    if (healthConcern === 'fitness') {
      return DIAGNOSTIC_PACKAGES.find((p) => p.id === 'pkg-12') || DIAGNOSTIC_PACKAGES[0];
    }

    return DIAGNOSTIC_PACKAGES.find((p) => p.id === 'pkg-01') || DIAGNOSTIC_PACKAGES[0];
  };

  const recommendedPackage = getRecommendation();

  return (
    <section className="py-14 bg-gradient-to-b from-white to-[#F4FAF6] border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-xl shadow-emerald-950/5 relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#EBF7F0] text-[#008F3F] text-xs font-bold mb-3 border border-[#B4E2C7]">
              <Sparkles className="w-3.5 h-3.5 text-[#008F3F]" />
              Smart Health Advisor
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-[#10243A] tracking-tight">
              Find Your Recommended Health Package in 30 Seconds
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Answer 2 simple questions to find the most relevant, cost-effective diagnostic profile for your medical needs.
            </p>
          </div>

          {step === 1 ? (
            <div className="space-y-6 relative z-10">
              {/* Question 1: Who is this test for? */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 text-center sm:text-left">
                  1. Who is this health checkup for?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { id: 'self', label: 'For Myself', icon: User, desc: 'Adult 20–55' },
                    { id: 'parents', label: 'Parents / Senior', icon: Users, desc: 'Age 50+ Care' },
                    { id: 'women', label: 'Wife / Mother', icon: Heart, desc: 'Women Health' },
                    { id: 'kids', label: 'Child / Toddler', icon: Shield, desc: 'Pediatric' },
                    { id: 'student', label: 'Student / College', icon: Activity, desc: 'Fitness Clearance' }
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = recipient === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRecipient(item.id)}
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'border-[#008F3F] bg-[#EBF7F0] text-[#10243A] shadow-xs'
                            : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-600'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${
                            isSelected
                              ? 'bg-[#008F3F] text-white'
                              : 'bg-white text-slate-500 border border-slate-200'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold block">{item.label}</span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">{item.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2: Primary Concern */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 text-center sm:text-left">
                  2. What is the primary focus or symptom?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'preventive', label: 'Routine Preventive', desc: 'Annual Full Body' },
                    { id: 'inflammation', label: 'Fatigue & Pain', desc: 'Vitamins + CRP' },
                    { id: 'cardiology', label: 'Heart & BP Risk', desc: 'ECG + 2D Echo' },
                    { id: 'thyroid', label: 'Weight & Energy', desc: 'Thyroid Hormones' },
                    ...(recipient === 'women'
                      ? [{ id: 'pregnancy', label: 'Pregnancy Care', desc: 'Antenatal Panel' }]
                      : []),
                    { id: 'fitness', label: 'Gym / Sports / Visa', desc: 'Medical Clearance' }
                  ].map((concern) => {
                    const isSelected = healthConcern === concern.id;
                    return (
                      <button
                        key={concern.id}
                        type="button"
                        onClick={() => setHealthConcern(concern.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#008F3F] bg-[#EBF7F0] text-[#10243A]'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{concern.label}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#008F3F]" />}
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-0.5">{concern.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA Next */}
              <div className="pt-4 text-center">
                <button
                  type="button"
                  onClick={handleNext}
                  className="py-3.5 px-8 bg-[#008F3F] hover:bg-[#007A35] text-white font-bold rounded-xl text-sm shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>SEE RECOMMENDED PACKAGE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Step 2: Recommendation Result Card */
            <div className="relative z-10 animate-in fade-in duration-300">
              <div className="bg-[#0B1220] text-white rounded-2xl p-6 sm:p-8 border border-emerald-500/30 shadow-xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#10B981]/20 text-[#34D399] text-xs font-bold mb-2">
                      <Sparkles className="w-3.5 h-3.5" /> Best Match For Your Criteria
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                      {recommendedPackage.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                      {recommendedPackage.description}
                    </p>
                  </div>

                  <div className="text-left md:text-right bg-white/5 p-4 rounded-xl border border-white/10 shrink-0">
                    <span className="text-[11px] text-slate-400 block line-through">
                      MRP ₹{recommendedPackage.mrp.toLocaleString('en-IN')}
                    </span>
                    <span className="text-3xl font-black font-mono text-emerald-400 block">
                      ₹{recommendedPackage.finalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] font-bold text-[#DC2626] bg-red-500/20 px-2 py-0.5 rounded inline-block mt-1">
                      Save ₹{recommendedPackage.savings.toLocaleString('en-IN')} (Doctor Offer)
                    </span>
                  </div>
                </div>

                {/* Tests included preview */}
                <div className="py-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Key Tests Covered ({recommendedPackage.testCountLabel || recommendedPackage.testsIncluded.length} Parameters):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {recommendedPackage.testsIncluded.slice(0, 9).map((t, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={handleReset}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Change Preferences</span>
                  </button>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => onSelectPackage(recommendedPackage.id)}
                      className="flex-1 sm:flex-initial py-3 px-6 bg-[#0F6B3A] hover:bg-[#0C572F] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>BOOK THIS PACKAGE NOW</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
