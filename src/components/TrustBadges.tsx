import React from 'react';
import { Home, Clock, UserCheck, Activity, HeartHandshake, ShieldCheck } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      tag: 'DOORSTEP',
      title: 'Free Home Collection',
      description: 'Zero visit charges across Mumbai & Navi Mumbai with certified phlebotomists.',
      icon: Home
    },
    {
      tag: 'ACCURATE',
      title: 'Reports in 6–12 Hours',
      description: 'Quick digital pathology report delivery directly on WhatsApp and portal.',
      icon: Clock
    },
    {
      tag: 'EXPERT MDS',
      title: 'MD Pathologist Review',
      description: 'Direct medical supervision & sign-off by Dr. Patil Mohit Ashok (MD Path).',
      icon: UserCheck
    },
    {
      tag: 'RELIABLE',
      title: '100% Calibrated Analyzers',
      description: 'Daily multi-point quality control calibration on automated robotic systems.',
      icon: Activity
    },
    {
      tag: 'FAMILY-FRIENDLY',
      title: 'Complete Family Care',
      description: 'Comprehensive health & preventive checkups for kids, adults & seniors.',
      icon: HeartHandshake
    },
    {
      tag: 'RELIABLE',
      title: 'Sterile Single-Use Kits',
      description: 'Strict vacuum tube safety protocols with 100% barcode sample tracking.',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-[#0F6B3A]/40 transition-all card-lift flex flex-col justify-between"
              >
                {/* Top Row: Small icon box on the left & Small uppercase tag on the right in soft green pill */}
                <div className="flex items-center justify-between gap-3 mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF7F0] text-[#0F6B3A] flex items-center justify-center shrink-0 border border-teal-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="bg-[#EBF7F0] text-[#0F6B3A] text-[10px] font-black px-2.5 py-0.5 rounded-full border border-teal-500/20 uppercase tracking-wider">
                    {badge.tag}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#0B1220] leading-snug mb-1">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
