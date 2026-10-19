import React, { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp, ExternalLink, Calendar, Thermometer, ShieldCheck } from 'lucide-react';

interface CompactPhlebotomyNetworkProps {
  onOpenBooking: () => void;
}

interface ZoneCoverage {
  id: string;
  name: string;
  localities: string[];
}

export const CompactPhlebotomyNetwork: React.FC<CompactPhlebotomyNetworkProps> = ({ onOpenBooking }) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('navi-mumbai');
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(true);

  const zones: ZoneCoverage[] = [
    {
      id: 'south-mumbai',
      name: 'South Mumbai',
      localities: ['Colaba', 'Cuffe Parade', 'Nariman Point', 'Marine Lines', 'Dadar', 'Parel', 'Byculla', 'Worli']
    },
    {
      id: 'western-suburbs',
      name: 'Western Suburbs',
      localities: ['Bandra West/East', 'Khar', 'Santacruz', 'Andheri West/East', 'Juhu', 'Goregaon', 'Malad', 'Kandivali', 'Borivali']
    },
    {
      id: 'eastern-suburbs',
      name: 'Eastern Suburbs',
      localities: ['Chembur', 'Ghatkopar', 'Vikhroli', 'Kanjurmarg', 'Bhandup', 'Mulund', 'Govandi', 'Mankhurd', 'Kurla']
    },
    {
      id: 'navi-mumbai',
      name: 'Navi Mumbai',
      localities: ['Vashi (Primary Hub)', 'Sanpada', 'Juinagar', 'Nerul', 'Seawoods', 'CBD Belapur', 'Kharghar', 'Kamothe', 'Panvel']
    },
    {
      id: 'thane-kalyan',
      name: 'Thane & Kalyan',
      localities: ['Thane West/East', 'Panchpakhadi', 'Majiwada', 'Vasant Vihar', 'Ghodbunder Road', 'Kalwa', 'Dombivli', 'Kalyan']
    }
  ];

  const activeZone = zones.find((z) => z.id === selectedZoneId) || zones[3];

  return (
    <div id="phlebotomy-network" className="py-6 sm:py-8 border-t border-[#1A3654] text-slate-300">
      
      {/* Network Header & Overview */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#008F3F] ring-2 ring-[#008F3F]/30 shrink-0" />
            <h4 className="text-xs sm:text-[13px] font-bold font-mono uppercase tracking-wider text-white">
              Diagnostic Phlebotomy Network
            </h4>
          </div>

          {/* Google Maps text link */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Mumbai+Navi+Mumbai+Thane"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-white hover:underline transition-colors decoration-slate-500 self-start sm:self-auto"
            title="Open Mumbai & Navi Mumbai service region in Google Maps"
          >
            <span>View Service Areas on Google Maps</span>
            <ExternalLink className="w-3 h-3 text-[#008F3F]" />
          </a>
        </div>

        {/* Core Requirement Paragraph */}
        <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed max-w-4xl">
          Doorstep sample collection coverage across Mumbai, Navi Mumbai and Thane. Samples must be transported using appropriate validated temperature-controlled procedures, with 2°C–8°C cold-chain handling wherever required by the specific test and sample stability requirements.
        </p>

        {/* 3 Key Meta Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1 text-[11px] sm:text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-[#0F2033]/80 border border-[#1A3654] text-slate-300 flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#008F3F] shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">Service Coverage</span>
              <span className="text-white font-medium">Mumbai Western &amp; Central Lines • Navi Mumbai • Thane</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#0F2033]/80 border border-[#1A3654] text-slate-300 flex items-start gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#008F3F] shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">Primary Pathology Hub</span>
              <span className="text-white font-medium">Sector 17, Vashi</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#0F2033]/80 border border-[#1A3654] text-slate-300 flex items-start gap-2">
            <Thermometer className="w-3.5 h-3.5 text-[#008F3F] shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">Pathology Supervision</span>
              <span className="text-white font-medium">Dr. Patil Mohit Ashok (MD Pathology)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Accordion: Doorstep Collection Areas */}
      <div className="mt-4 pt-3 border-t border-[#1A3654]/60">
        <button
          type="button"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="w-full flex items-center justify-between py-2 text-left text-xs font-bold font-mono text-white hover:text-[#008F3F] transition-colors cursor-pointer group"
          aria-expanded={isAccordionOpen}
        >
          <span className="flex items-center gap-2">
            <span className="text-[10px] text-[#008F3F] bg-[#008F3F]/10 border border-[#008F3F]/30 px-1.5 py-0.5 rounded font-mono">
              5 ZONES
            </span>
            <span>Doorstep Collection Areas</span>
          </span>
          <span className="flex items-center gap-1 text-[11px] font-normal text-slate-400 group-hover:text-white">
            <span>{isAccordionOpen ? 'Hide Areas' : 'Show Localities'}</span>
            {isAccordionOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </span>
        </button>

        {isAccordionOpen && (
          <div className="mt-3 space-y-3 animate-in fade-in duration-150">
            {/* Clickable Zone Selector Chips */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {zones.map((zone) => {
                const isSelected = zone.id === selectedZoneId;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`px-2.5 py-1 sm:py-1.5 rounded-lg text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#008F3F] text-white font-bold border border-emerald-400 shadow-2xs'
                        : 'bg-[#1A3654]/80 text-slate-300 hover:text-white hover:bg-[#254A72] border border-slate-700/60'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-slate-400'}`} />
                    <span>{zone.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Zone Localities Panel */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-[#0A1726]/90 border border-[#1A3654] space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-[#1A3654]/60">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{activeZone.name} Coverage:</span>
                  <span className="text-[10px] font-mono text-[#008F3F] bg-[#EBF7F0]/10 px-2 py-0.5 rounded border border-[#008F3F]/30">
                    {activeZone.localities.length} Localities
                  </span>
                </div>

                {/* Book Home Collection button */}
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#008F3F] hover:bg-[#007A35] text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer self-start sm:self-auto shadow-2xs"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Book Home Collection</span>
                </button>
              </div>

              {/* Localities Tags */}
              <div className="flex flex-wrap gap-1.5">
                {activeZone.localities.map((loc, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] text-slate-300 bg-[#16293D] px-2 py-0.5 rounded border border-slate-700/60"
                  >
                    {loc}
                  </span>
                ))}
              </div>

              <div className="text-[10px] text-slate-400 italic pt-1">
                * Service coverage area list. Sample collection slots are subject to phlebotomist schedule &amp; route confirmation.
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
