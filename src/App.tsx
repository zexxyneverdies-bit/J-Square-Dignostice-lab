import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OfferTicker } from './components/OfferTicker';
import { TrustBadges } from './components/TrustBadges';
import { HealthPackageAdvisor } from './components/HealthPackageAdvisor';
import { PackageMarketplace } from './components/PackageMarketplace';
import { HomeCollectionSection } from './components/HomeCollectionSection';
import { LabTechnologySection } from './components/LabTechnologySection';
import { ReportSearchSection } from './components/ReportSearchSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { BookingModal } from './components/BookingModal';
import { BookingReceiptModal } from './components/BookingReceiptModal';
import { ReportViewerModal } from './components/ReportViewerModal';
import { StaffPortalModal } from './components/StaffPortalModal';
import { PrescriptionUploadModal } from './components/PrescriptionUploadModal';
import { TermsConditionsModal } from './components/TermsConditionsModal';
import { Booking, DiagnosticReport } from './types';

export default function App() {
  // Modal states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState<string | undefined>(undefined);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const [activeReceiptBooking, setActiveReceiptBooking] = useState<Booking | null>(null);
  const [activeReportToView, setActiveReportToView] = useState<DiagnosticReport | null>(null);
  const [isStaffPortalOpen, setIsStaffPortalOpen] = useState(false);

  // Handlers
  const handleOpenBooking = (pkgId?: string) => {
    setSelectedPackageForBooking(pkgId);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedPackageForBooking(undefined);
  };

  const handleBookingConfirmed = (booking: Booking) => {
    // Keep booking reference for receipt
    console.log('Confirmed Booking:', booking);
  };

  const handleOpenReceipt = (booking: Booking) => {
    setActiveReceiptBooking(booking);
  };

  const handleViewReport = (report: any) => {
    setActiveReportToView(report);
  };

  const handleScrollToReportSearch = () => {
    const el = document.getElementById('download-report');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 flex flex-col">
      {/* Sticky Responsive Navbar with Master Links & Doctor Prescription */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenStaffPortal={() => setIsStaffPortalOpen(true)}
        onOpenReportSearch={handleScrollToReportSearch}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenReportSearch={handleScrollToReportSearch}
          onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        />

        {/* Red Offer Ticker / Marquee Bar */}
        <OfferTicker
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Quick Trust Badges */}
        <TrustBadges />

        {/* Smart Health Package Advisor (Interactive Recommendation Tool) */}
        <HealthPackageAdvisor
          onSelectPackage={(pkgId) => handleOpenBooking(pkgId)}
        />

        {/* Diagnostic Packages Marketplace with Live Search & Category Filtering */}
        <PackageMarketplace
          onSelectPackage={(pkgId) => handleOpenBooking(pkgId)}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Free Home Sample Collection Detailed Workflow */}
        <HomeCollectionSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Diagnostic Laboratory Technology & Medical Accuracy Assurance */}
        <LabTechnologySection />

        {/* Download Your Lab Report Section */}
        <ReportSearchSection
          onViewReport={handleViewReport}
        />

        {/* Verified Patient Reviews & Google 4.9 Rating */}
        <ReviewsSection />

        {/* Diagnostic Frequently Asked Questions */}
        <FaqSection />

        {/* About Section: Dr. Patil Mohit Ashok (MD Pathology) & Saeeda */}
        <AboutSection />

        {/* Contact Section: Mumbai & Navi Mumbai reception & helplines */}
        <ContactSection
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenReportSearch={handleScrollToReportSearch}
        onOpenStaffPortal={() => setIsStaffPortalOpen(true)}
        onOpenTerms={() => setIsTermsModalOpen(true)}
      />

      {/* Floating Speed Dial & Mobile Sticky Bottom Action Bar */}
      <FloatingActions
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Multi-Step Booking Modal */}
      {isBookingModalOpen && (
        <BookingModal
          initialPackageId={selectedPackageForBooking}
          onClose={handleCloseBooking}
          onBookingConfirmed={handleBookingConfirmed}
          onOpenReceipt={handleOpenReceipt}
        />
      )}

      {/* Upload Doctor Prescription Modal */}
      <PrescriptionUploadModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
      />

      {/* Downloadable / Printable Booking Receipt Modal */}
      {activeReceiptBooking && (
        <BookingReceiptModal
          booking={activeReceiptBooking}
          onClose={() => setActiveReceiptBooking(null)}
        />
      )}

      {/* Doctor-Verified Pathology Report Viewer Modal */}
      {activeReportToView && (
        <ReportViewerModal
          report={activeReportToView}
          onClose={() => setActiveReportToView(null)}
        />
      )}

      {/* Authenticated Staff Management Portal */}
      {isStaffPortalOpen && (
        <StaffPortalModal
          onClose={() => setIsStaffPortalOpen(false)}
          onViewReport={handleViewReport}
        />
      )}

      {/* Terms & Conditions Modal */}
      <TermsConditionsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
}
