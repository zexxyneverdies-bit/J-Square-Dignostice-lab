import React from 'react';
import { Star, CheckCircle, Quote, ThumbsUp, MapPin } from 'lucide-react';
import { PATIENT_REVIEWS } from '../data/packages';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 bg-[#F4FAF6] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#EBF7F0] text-[#008F3F] text-xs font-bold mb-3 border border-[#B4E2C7]">
            <ThumbsUp className="w-3.5 h-3.5 text-[#008F3F]" />
            Patient Trust &amp; Satisfaction
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#10243A] tracking-tight">
            Trusted by 4,200+ Families Across Mumbai &amp; Navi Mumbai
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-slate-900 text-base">4.9 / 5.0</span>
            <span className="text-slate-500 text-xs sm:text-sm">· Google &amp; Reception Reviews</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PATIENT_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Stars + Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-700 leading-relaxed mb-4 italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Bottom Patient Info */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {rev.name}
                  </h4>
                  {rev.verified && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1 shrink-0">
                      <CheckCircle className="w-3 h-3 text-[#008F3F]" /> Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> {rev.location}
                  </span>
                  <span className="text-slate-400 text-[10px] font-mono truncate max-w-[110px]">
                    {rev.packageOrTest}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real Lab Commitment Bar */}
        <div className="mt-10 text-center text-xs text-slate-500 flex items-center justify-center gap-2 flex-wrap">
          <span>✓ Gentle, sterile vacutainer blood draws</span>
          <span>•</span>
          <span>✓ Doctor tele-consultation for report queries</span>
          <span>•</span>
          <span>✓ 100% On-time digital delivery</span>
        </div>

      </div>
    </section>
  );
};
