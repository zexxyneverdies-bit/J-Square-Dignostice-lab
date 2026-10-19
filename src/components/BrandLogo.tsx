import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'horizontal' | 'stacked';
  theme?: 'light' | 'dark'; // light: on white background, dark: on dark navy background
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  layout = 'horizontal',
  theme = 'light',
  showSubtitle = true
}) => {
  // Proportional emblem sizing
  const emblemDim =
    size === 'sm'
      ? { w: 34, h: 38 }
      : size === 'lg'
      ? { w: 56, h: 62 }
      : size === 'xl'
      ? { w: 76, h: 84 }
      : { w: 42, h: 46 }; // md default

  // Typography scaling
  const brandTextSize =
    size === 'sm'
      ? 'text-base'
      : size === 'lg'
      ? 'text-2xl'
      : size === 'xl'
      ? 'text-3xl'
      : 'text-lg';

  const subTextSize =
    size === 'sm'
      ? 'text-[10px]'
      : size === 'lg'
      ? 'text-xs'
      : size === 'xl'
      ? 'text-sm'
      : 'text-[11px]';

  const isDark = theme === 'dark';

  return (
    <div
      className={`inline-flex items-center select-none ${
        layout === 'stacked' ? 'flex-col text-center gap-1.5' : 'flex-row gap-2.5'
      } ${className}`}
    >
      {/* Official J SQUARE Blood-Drop & Microscope Emblem */}
      <div
        style={{ width: emblemDim.w, height: emblemDim.h }}
        className="shrink-0 relative flex items-center justify-center transition-transform hover:scale-105 duration-200"
      >
        <svg
          viewBox="0 0 400 450"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Red Blood Drop Shape */}
          <path
            d="M200 15 C200 15 325 185 325 320 C325 390 269 445 200 445 C131 445 75 390 75 320 C75 185 200 15 200 15 Z"
            fill="#E60000"
          />

          {/* White Crescent Swoosh on Left Contour */}
          <path
            d="M200 40 C170 95 95 235 95 325 C95 385 130 430 175 440 C140 435 110 395 110 335 C110 250 178 120 200 40 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />

          {/* Inner Boundary Correction */}
          <path
            d="M195 80 C180 125 128 240 128 328 C128 378 148 418 180 432 C155 422 140 382 140 332 C140 258 185 148 195 80 Z"
            fill="#E60000"
          />

          {/* Microscope Inside Drop */}
          <g id="microscope" transform="translate(135, 125)">
            {/* Base */}
            <ellipse cx="65" cy="225" rx="55" ry="18" fill="#CBD5E1" />
            <path
              d="M25 220 C25 200 45 185 68 185 C92 185 110 200 110 220 C110 232 90 238 68 238 C42 238 25 232 25 220 Z"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="3.2"
            />

            {/* Arm / Stand */}
            <path
              d="M42 205 C42 165 48 115 75 95 C92 82 108 92 105 112 C102 130 92 145 78 152 C70 156 68 175 68 205 Z"
              fill="#F8FAFC"
              stroke="#0F172A"
              strokeWidth="3.5"
            />
            <path
              d="M52 195 C52 165 56 128 78 112 C88 105 95 110 94 122 C92 138 84 148 72 155 C65 160 62 175 62 195 Z"
              fill="#E2E8F0"
            />

            {/* Focus Knobs */}
            <circle cx="48" cy="190" r="14" fill="#0F172A" stroke="#334155" strokeWidth="2" />
            <circle cx="48" cy="190" r="8" fill="#475569" />
            <circle cx="48" cy="190" r="4" fill="#94A3B8" />

            {/* Substage Condenser */}
            <rect x="75" y="172" width="22" height="15" rx="3" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
            <path d="M78 187 L94 187 L90 198 L82 198 Z" fill="#475569" />

            {/* Stage */}
            <path d="M55 162 L125 162 L118 174 L48 174 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
            <rect x="68" y="160" width="38" height="4" rx="1" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1.5" />
            <rect x="82" y="161" width="10" height="2" rx="0.5" fill="#E60000" />

            {/* Turret & Objective */}
            <path d="M72 125 L108 125 L100 138 L80 138 Z" fill="#334155" stroke="#0F172A" strokeWidth="2.5" />
            <rect x="85" y="138" width="10" height="16" rx="2" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
            <rect x="85" y="144" width="10" height="3" fill="#E60000" />
            <path d="M87 154 L93 154 L91 159 L89 159 Z" fill="#0F172A" />

            {/* Side Objectives */}
            <path d="M76 138 L70 148 L76 151 L81 140 Z" fill="#94A3B8" stroke="#0F172A" strokeWidth="1.5" />
            <path d="M104 138 L110 148 L104 151 L99 140 Z" fill="#94A3B8" stroke="#0F172A" strokeWidth="1.5" />

            {/* Head & Eyepieces */}
            <path d="M80 92 L105 78 L122 92 L96 106 Z" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" />
            <path d="M102 78 L128 58 L138 68 L114 86 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
            <path d="M115 72 L140 52 L150 62 L127 80 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
            <ellipse
              cx="134"
              cy="62"
              rx="7"
              ry="5"
              transform="rotate(-38 134 62)"
              fill="#334155"
              stroke="#0F172A"
              strokeWidth="2"
            />
            <ellipse
              cx="146"
              cy="56"
              rx="7"
              ry="5"
              transform="rotate(-38 146 56)"
              fill="#334155"
              stroke="#0F172A"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>

      {/* Official Typography: "J SQUARE" in Green + "— Lab & Diagnostic —" in Navy */}
      <div className={`flex flex-col ${layout === 'stacked' ? 'items-center' : 'items-start'} leading-none`}>
        <div
          className={`font-black tracking-tight italic uppercase ${brandTextSize}`}
          style={{ color: '#008F3F', fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          J SQUARE
        </div>

        {showSubtitle && (
          <div
            className={`flex items-center gap-1.5 font-bold tracking-tight mt-0.5 ${subTextSize}`}
            style={{ color: isDark ? '#E2E8F0' : '#10243A' }}
          >
            <span className="w-3.5 h-[2px] rounded-full inline-block" style={{ backgroundColor: '#008F3F' }} />
            <span>Lab &amp; Diagnostic</span>
            <span className="w-3.5 h-[2px] rounded-full inline-block" style={{ backgroundColor: '#008F3F' }} />
          </div>
        )}
      </div>
    </div>
  );
};
