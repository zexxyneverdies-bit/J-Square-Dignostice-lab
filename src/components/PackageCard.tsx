import React from 'react';
import { Calendar, MessageSquare, Clock, FileText } from 'lucide-react';
import { DiagnosticPackage, CustomAddon } from '../types';

interface PackageCardProps {
  packageData: DiagnosticPackage | CustomAddon;
  onSelectPackage: (pkgId: string) => void;
  onOpenTestList: (pkg: DiagnosticPackage | CustomAddon) => void;
  onWhatsAppBooking: (pkg: DiagnosticPackage | CustomAddon) => void;
}

// Exactly ONE single, different image per package mapped directly
const PACKAGE_IMAGE_MAP: Record<string, string> = {
  // 1. Regular Health Profile: Multi-generation family wellness & checkup reference image
  'pkg-01': '/images/regular-health-family.jpg',

  // 2. Full Body + CRP: Anatomical diagnostic scan (newly uploaded blue human-body reference image)
  'pkg-02': '/images/full-body-scan.jpg',

  // 3. Old Age / Senior Citizen Profile: Elderly couple healthcare checkup
  'pkg-03': '/images/senior-citizen.jpg',

  // 4. Lady Health Profile: Women's healthcare & vitality consultation
  'pkg-04': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',

  // 5. Pregnancy / Antenatal Profile: Maternal wellness & prenatal care (newly uploaded reference image)
  'pkg-05': '/images/pregnancy-profile.jpg',

  // 6. Thyroid Profile: Clinical endocrine assessment (newly uploaded reference image)
  'pkg-06': '/images/thyroid-profile.jpg',

  // 7. Child Health Profile: Pediatric doctor healthcare checkup
  'pkg-07': 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',

  // 8. School / College / Student Package: Student health & fitness examination
  'pkg-08': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',

  // 9. Cancer Screening Profile — Male: Men's preventive oncology checkup
  'pkg-09-m': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',

  // 10. Cancer Screening Profile — Female: Women's preventive oncology panel
  'pkg-09-f': 'https://images.unsplash.com/photo-1579152643501-c85e25a2e6f4?auto=format&fit=crop&w=800&q=80',

  // 11. TB Screening Profile: Pulmonology chest diagnostic scan
  'pkg-10': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',

  // 12. Radiology + Cardiology Profile: Cardiology 2D Echo & ECG heart imaging
  'pkg-11': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80',

  // 13. Fitness Certificate Package: Sports athletic fitness clearance
  'pkg-12': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',

  // Custom Profiles: Each with its own unique image
  'addon-bone': 'https://images.unsplash.com/photo-1583912267670-6575ad314d35?auto=format&fit=crop&w=800&q=80',
  'addon-vitamin': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
  'addon-pcod-ext': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
  'addon-pcod-mini': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
  'addon-hairfall': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
};

const DEFAULT_MEDICAL_IMAGE = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80';

// Optimal object positioning to preserve core subject framing without unnecessary cropping
const PACKAGE_IMAGE_POSITION: Record<string, string> = {
  'pkg-02': 'object-[center_20%]',
  'pkg-03': 'object-[center_25%]',
  'pkg-05': 'object-[center_30%]',
  'pkg-06': 'object-[center_35%]'
};

export const PackageCard: React.FC<PackageCardProps> = ({
  packageData,
  onSelectPackage,
  onOpenTestList,
  onWhatsAppBooking
}) => {
  const isDiagnosticPackage = 'mrp' in packageData;

  // Normalized values
  const mrp = isDiagnosticPackage ? packageData.mrp : Math.round(packageData.finalPrice * 1.4);
  const finalPrice = packageData.finalPrice;
  const savings = isDiagnosticPackage ? packageData.savings : mrp - finalPrice;
  const testsCount = packageData.testsIncluded.length;
  const testCountDisplay = packageData.testCountLabel || String(testsCount);
  const isPopular = isDiagnosticPackage ? Boolean(packageData.popular) : false;

  // Turnaround time
  const turnaroundTime = isDiagnosticPackage
    ? packageData.reportTimeHours <= 8
      ? 'Same Day'
      : `Within ${packageData.reportTimeHours} Hours`
    : 'Same Day';

  // Description
  const description = isDiagnosticPackage
    ? packageData.description
    : `Targeted laboratory profile including ${packageData.testsIncluded.slice(0, 3).join(', ')} with certified MD verification.`;

  // Display Name: Keep clean title without leading numeric codes (e.g. "01 Regular Health Profile" -> "Regular Health Profile")
  const displayName = packageData.name.replace(/^\d+\s*/, '');

  // Calculate discount percentage
  const discountPercent = mrp > finalPrice ? Math.round(((mrp - finalPrice) / mrp) * 100) : 0;

  // Primary badge logic (matches reference: "Most Booked" or "Popular")
  const primaryBadgeText = packageData.id === 'pkg-01'
    ? 'Most Booked'
    : isPopular || discountPercent >= 50
    ? 'Popular'
    : 'Best Value';

  // Secondary badge logic (matches reference: "Save ₹1,000", "66% Off", "73% Off")
  const secondaryBadgeText = discountPercent >= 60
    ? `${discountPercent}% Off`
    : savings > 0
    ? `Save ₹${savings.toLocaleString('en-IN')}`
    : '50% Off';

  // Single unique image for this specific package
  const imageUrl = PACKAGE_IMAGE_MAP[packageData.id] || DEFAULT_MEDICAL_IMAGE;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col h-full group">
      
      {/* ================= A. IMAGE AREA (180–200px) with BADGES ================= */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 rounded-t-2xl sm:rounded-t-[20px]">
        {/* Exactly ONE image for this package */}
        <img
          src={imageUrl}
          alt={displayName}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover ${PACKAGE_IMAGE_POSITION[packageData.id] || 'object-center'} group-hover:scale-105 transition-transform duration-300`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_MEDICAL_IMAGE;
          }}
        />

        {/* Soft gradient overlay for badges legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/20 pointer-events-none rounded-t-2xl" />

        {/* ================= B. TOP BADGES (Top-Left) ================= */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap z-10 max-w-[70%] pointer-events-none">
          {/* Primary Badge (Red Pill or Amber Test Pill) */}
          {/* Primary Badge (Red Pill) */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#DC2626] text-white font-black text-[11px] uppercase tracking-wide shadow-md">
            <span>🔥</span>
            <span>{primaryBadgeText}</span>
          </span>

          {/* Secondary Badge (Yellow Pill) */}
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#FACC15] text-[#0F172A] text-[11px] font-black uppercase tracking-wide shadow-md">
            {secondaryBadgeText}
          </span>
        </div>

        {/* ================= C. NUMBER OF TESTS (Top-Right Badge) ================= */}
        <div className="absolute top-3 right-3 bg-[#0B3B24] border border-emerald-600/30 text-white px-2.5 py-1.5 rounded-xl shadow-md text-center min-w-[66px] z-10 pointer-events-none">
          <span className="text-[9px] font-black uppercase tracking-wider text-emerald-200 block leading-tight mb-0.5 whitespace-nowrap">
            {('badgeTitle' in packageData && packageData.badgeTitle) || 'NO. OF TESTS'}
          </span>
          <span className="text-lg sm:text-xl font-black text-white block leading-none font-mono">
            {testCountDisplay}
          </span>
        </div>
      </div>

      {/* ================= CARD BODY CONTENT ================= */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
        
        {/* Top Details Block */}
        <div className="space-y-2">
          {/* ================= D. PACKAGE TITLE ================= */}
          <h3
            className="text-lg sm:text-xl font-bold text-[#0B1220] leading-snug font-display line-clamp-1 group-hover:text-[#0F6B3A] transition-colors"
            title={displayName}
          >
            {displayName}
          </h3>

          {/* ================= E. PACKAGE DESCRIPTION (Truncated to 2 lines) ================= */}
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 h-9">
            {description}
          </p>

          {/* ================= F. TURNAROUND + CERTIFIED LAB ROW ================= */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#0F6B3A] shrink-0" />
              <span>Turnaround: {turnaroundTime}</span>
            </div>
            <span className="text-[11px] font-bold text-[#0F6B3A] bg-emerald-50/70 border border-[#0F6B3A]/60 px-2 py-0.5 rounded-md">
              Certified Lab
            </span>
          </div>
        </div>

        {/* Bottom Actions Block */}
        <div className="space-y-3 pt-1">
          {/* ================= G. PRICE SECTION ================= */}
          <div className="bg-[#EBF7F0]/80 border border-[#B4E2C7]/70 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-[#0B1220] font-mono tracking-tight">
                ₹{finalPrice.toLocaleString('en-IN')}
              </span>
              {mrp > finalPrice && (
                <span className="text-xs sm:text-sm text-slate-400 line-through font-mono">
                  ₹{mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <span className="bg-white text-[#0F6B3A] border border-[#B4E2C7] text-xs font-bold px-2.5 py-1 rounded-md shadow-2xs whitespace-nowrap">
              Free Home Sample
            </span>
          </div>

          {/* ================= H. TEST LIST BUTTON & I. WHATSAPP BUTTON ================= */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Test List Button */}
            <button
              onClick={() => onOpenTestList(packageData)}
              className="w-full py-2.5 px-3 bg-[#EBF7F0] hover:bg-[#D8F3E5] text-[#0B1220] hover:text-[#0F6B3A] border border-slate-200/90 hover:border-[#0F6B3A]/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
            >
              <FileText className="w-3.5 h-3.5 text-[#0F6B3A]" />
              <span>{testCountDisplay} Tests List</span>
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={() => onWhatsAppBooking(packageData)}
              className="w-full py-2.5 px-3 bg-[#EBF7F0] hover:bg-[#D8F3E5] text-[#0F6B3A] border border-[#B4E2C7] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#0F6B3A]" />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* ================= J. FULL-WIDTH BOOK NOW BUTTON ================= */}
          <button
            onClick={() => onSelectPackage(packageData.id)}
            className="btn-scale w-full py-3 px-4 bg-[#0F6B3A] hover:bg-[#0c572f] active:bg-[#083c20] text-white rounded-xl text-sm font-bold shadow-md shadow-[#0F6B3A]/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Now • ₹{finalPrice.toLocaleString('en-IN')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
