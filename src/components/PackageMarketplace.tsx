import React, { useState, useMemo } from 'react';
import { DIAGNOSTIC_PACKAGES, CUSTOM_ADDONS } from '../data/packages';
import { DiagnosticPackage, CustomAddon } from '../types';
import { Search, Check, Sparkles } from 'lucide-react';
import { PackageCard } from './PackageCard';
import { PackageTestListModal } from './PackageTestListModal';

interface PackageMarketplaceProps {
  onSelectPackage: (pkgId: string) => void;
  onOpenBooking: () => void;
}

export const PackageMarketplace: React.FC<PackageMarketplaceProps> = ({
  onSelectPackage,
  onOpenBooking: _onOpenBooking
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTestListPackage, setSelectedTestListPackage] = useState<DiagnosticPackage | CustomAddon | null>(null);

  const categories = [
    'All',
    'Full Body',
    'Women',
    'Senior Citizen',
    'Children',
    'Thyroid',
    'Student',
    'Cardiology',
    'Cancer Screening',
    'Fitness',
    'Custom Profiles'
  ];

  // Filtering packages based on search query and category
  const filteredPackages = useMemo(() => {
    if (selectedCategory === 'Custom Profiles') {
      return [];
    }

    return DIAGNOSTIC_PACKAGES.filter((pkg) => {
      // Category match
      const categoryMatch =
        selectedCategory === 'All' ||
        pkg.category === selectedCategory ||
        (selectedCategory === 'Women' && (pkg.category === 'Women' || pkg.id === 'pkg-09-f')) ||
        (selectedCategory === 'Men' && pkg.id === 'pkg-09-m');

      // Search match
      const q = searchQuery.toLowerCase().trim();
      if (!q) return categoryMatch;

      const nameMatch = pkg.name.toLowerCase().includes(q);
      const testMatch = pkg.testsIncluded.some((t) => t.toLowerCase().includes(q));
      const descMatch = pkg.description.toLowerCase().includes(q);
      const catMatch = pkg.category.toLowerCase().includes(q);

      return (nameMatch || testMatch || descMatch || catMatch) && categoryMatch;
    });
  }, [searchQuery, selectedCategory]);

  const handleWhatsAppBooking = (pkg: DiagnosticPackage | CustomAddon) => {
    const text = `Hello J Square Lab! I would like to book the *${pkg.name}* (Price: ₹${pkg.finalPrice.toLocaleString('en-IN')}) with free home sample collection.`;
    window.open(`https://wa.me/918691027116?text=${encodeURIComponent(text)}`, '_blank');
  };

  const currentPackagesCount = selectedCategory === 'Custom Profiles' ? CUSTOM_ADDONS.length : filteredPackages.length;

  return (
    <section id="packages" className="py-16 bg-[#F4FAF6] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#EBF7F0] text-[#008F3F] text-xs font-bold mb-3 border border-[#B4E2C7]">
            <Sparkles className="w-3.5 h-3.5 text-[#008F3F]" />
            Transparent Doctor-Curated Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#10243A] tracking-tight">
            Diagnostic Health Packages
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Comprehensive diagnostic profiles with NABL-calibrated accuracy, direct pathologist supervision, and complimentary doorstep collection.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mb-8 space-y-4">
          {/* Search Input */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tests or profiles (e.g. CBC, Thyroid, HbA1c, Vitamin D, Cancer)..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008F3F] focus:border-[#008F3F] shadow-2xs placeholder:text-slate-400 text-[#10243A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex items-center justify-center flex-wrap gap-1.5 pt-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#0F6B3A] text-white shadow-2xs'
                      : 'bg-white text-[#10243A] hover:text-[#0F6B3A] border border-slate-200 hover:bg-[#EBF7F0]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
          <span>
            Showing{' '}
            <strong className="text-[#10243A] font-bold">
              {currentPackagesCount}
            </strong>{' '}
            profiles
          </span>
          <span className="flex items-center gap-1 text-[#0F6B3A] font-bold">
            <Check className="w-3.5 h-3.5" />
            Free Doorstep Sample Collection Included
          </span>
        </div>

        {/* Packages Grid: 3 cards per row desktop, 2 tablet, 1 mobile */}
        {selectedCategory === 'Custom Profiles' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {CUSTOM_ADDONS.map((addon) => (
              <PackageCard
                key={addon.id}
                packageData={addon}
                onSelectPackage={onSelectPackage}
                onOpenTestList={(pkg) => setSelectedTestListPackage(pkg)}
                onWhatsAppBooking={handleWhatsAppBooking}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {filteredPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                packageData={pkg}
                onSelectPackage={onSelectPackage}
                onOpenTestList={(p) => setSelectedTestListPackage(p)}
                onWhatsAppBooking={handleWhatsAppBooking}
              />
            ))}
          </div>
        )}

        {/* Empty state if search finds nothing */}
        {filteredPackages.length === 0 && selectedCategory !== 'Custom Profiles' && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-base text-[#10243A] font-bold mb-2">
              No packages found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-xs text-slate-500 mb-4">
              Try searching for common terms like CBC, Sugar, Thyroid, Liver, Kidney, or Lipid.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-[#0F6B3A] hover:bg-[#0c572f] text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        )}

        {/* Full Tests List Modal */}
        {selectedTestListPackage && (
          <PackageTestListModal
            packageData={selectedTestListPackage}
            onClose={() => setSelectedTestListPackage(null)}
            onBookNow={(pkgId) => {
              setSelectedTestListPackage(null);
              onSelectPackage(pkgId);
            }}
            onWhatsApp={handleWhatsAppBooking}
          />
        )}

      </div>
    </section>
  );
};
