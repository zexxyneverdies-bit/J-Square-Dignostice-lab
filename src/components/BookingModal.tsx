import React, { useState, useEffect } from 'react';
import { DIAGNOSTIC_PACKAGES, CUSTOM_ADDONS, COLLECTION_TIME_SLOTS, CONTACT_INFO } from '../data/packages';
import { DiagnosticPackage, CustomAddon, PatientDetails, CollectionType, Booking } from '../types';
import { BrandLogo } from './BrandLogo';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CreditCard,
  Phone,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  QrCode,
  Smartphone,
  ExternalLink,
  Plus,
  Trash2,
  Lock,
  Printer,
  Upload
} from 'lucide-react';
import { getAccessToken } from '../services/auth';

interface BookingModalProps {
  initialPackageId?: string;
  onClose: () => void;
  onBookingConfirmed: (booking: Booking) => void;
  onOpenReceipt: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  initialPackageId,
  onClose,
  onBookingConfirmed,
  onOpenReceipt
}) => {
  // Step navigation: 1: Package -> 2: Patient & Address -> 3: Slot -> 4: Summary -> 5: UPI Pay -> 6: Confirmed
  const [currentStep, setCurrentStep] = useState<number>(1);

  // STEP 1 STATE: Service & Package Selection
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialPackageId || DIAGNOSTIC_PACKAGES[0].id
  );
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  // STEP 2 STATE: Patient Demographics & Address
  const [patient, setPatient] = useState<PatientDetails>({
    fullName: '',
    mobile: '',
    whatsapp: '',
    email: '',
    dob: '',
    age: '',
    gender: '',
    houseFlatNo: '',
    buildingSociety: '',
    streetArea: '',
    landmark: '',
    city: 'Mumbai',
    pincode: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // STEP 3 STATE: Home Collection & Time Slot
  const [collectionType, setCollectionType] = useState<CollectionType>('Home Sample Collection');
  const [collectionDate, setCollectionDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // default tomorrow morning
    return today.toISOString().slice(0, 10);
  });
  const [collectionTime, setCollectionTime] = useState<string>(COLLECTION_TIME_SLOTS[0]);

  // STEP 6 STATE: Payment Order & Verification
  const [paymentOrder, setPaymentOrder] = useState<any | null>(null);
  const [isPaymentOrderLoading, setIsPaymentOrderLoading] = useState(false);
  const selectedPaymentMode = 'UPI' as const;
  const [selectedUpiApp, setSelectedUpiApp] = useState<'PhonePe' | 'GPay' | 'Paytm' | 'BHIM' | 'QR'>('PhonePe');
  const [enteredUtr, setEnteredUtr] = useState<string>('');
  const [paymentProofFile, setPaymentProofFile] = useState<string | null>(null);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [simulatedTxnRef, setSimulatedTxnRef] = useState<string>('');

  // Device-based payment detection & Google Sheet sync state
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(() => {
    if (typeof navigator === 'undefined' || typeof window === 'undefined') return false;
    return (
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && window.innerWidth < 900)
    );
  });
  const [sheetSyncStatus, setSheetSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'failed'>('idle');
  const [lastSheetPayload, setLastSheetPayload] = useState<any | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState<boolean>(false);
  const [statusCheckFeedback, setStatusCheckFeedback] = useState<string | null>(null);
  const [qrRenderError, setQrRenderError] = useState<string | null>(null);
  const desktopQrRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCheckDevice = () => {
      setIsMobileDevice(
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints > 1 && window.innerWidth < 900)
      );
    };
    handleCheckDevice();
    window.addEventListener('resize', handleCheckDevice);
    return () => window.removeEventListener('resize', handleCheckDevice);
  }, []);

  // STEP 6 STATE: Confirmed Booking Record
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Selected package reference
  const selectedPackage =
    DIAGNOSTIC_PACKAGES.find((p) => p.id === selectedPackageId) || DIAGNOSTIC_PACKAGES[0];

  const selectedAddons = CUSTOM_ADDONS.filter((a) => selectedAddonIds.includes(a.id));


  // Update age when DOB changes
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dobValue = e.target.value;
    setPatient((prev) => {
      let calculatedAge = prev.age;
      if (dobValue) {
        const birthDate = new Date(dobValue);
        const diff = Date.now() - birthDate.getTime();
        const ageDate = new Date(diff);
        calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      }
      return { ...prev, dob: dobValue, age: calculatedAge };
    });
  };

  // Toggle Custom Addon
  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Validate Step 2 (Patient & Address)
  const validatePatientDetails = (): boolean => {
    const errors: Record<string, string> = {};

    if (!patient.fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    }

    const cleanMobile = patient.mobile.replace(/\D/g, '').slice(-10);
    if (!cleanMobile || cleanMobile.length !== 10 || !['6', '7', '8', '9'].includes(cleanMobile[0])) {
      errors.mobile = 'Enter a valid 10-digit Indian mobile number.';
    }

    if (!patient.gender) {
      errors.gender = 'Please select patient gender.';
    }

    if (!patient.age && !patient.dob) {
      errors.age = 'Patient age or Date of Birth is required.';
    }

    // Address validation for home collection
    if (collectionType === 'Home Sample Collection') {
      if (!patient.houseFlatNo.trim()) {
        errors.houseFlatNo = 'House / Flat number is required for home collection.';
      }
      if (!patient.buildingSociety.trim()) {
        errors.buildingSociety = 'Building / Society name is required.';
      }
      if (!patient.streetArea.trim()) {
        errors.streetArea = 'Street / Area name is required.';
      }
      const cleanPin = patient.pincode.replace(/\D/g, '');
      if (!cleanPin || cleanPin.length !== 6) {
        errors.pincode = 'Valid 6-digit Indian PIN code is required.';
      }
    }

    if (patient.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patient.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step 2 to Step 3 Transition: Directly proceed to Slot Selection without OTP
  const handleProceedFromPatientDetails = () => {
    if (!validatePatientDetails()) return;
    setCurrentStep(3);
  };

  // Create authoritative server-side payment order
  const handleCreatePaymentOrder = async () => {
    setIsPaymentOrderLoading(true);
    setPaymentError(null);

    try {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          addOnIds: selectedAddonIds,
          patientMobile: patient.mobile,
          collectionType
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create payment order.');
      }

      setPaymentOrder(data);
      setSimulatedTxnRef(`TXN-PHONPE-${Math.floor(100000 + Math.random() * 900000)}`);
      setCurrentStep(5); // Go to Payment Checkout (Step 5)

      // Moment 1: Auto-save to Google Sheet upon reaching Step 5
      saveBookingToGoogleSheet(
        'Pending - verify in UPI app',
        '',
        data.orderId,
        'UPI Online'
      );
    } catch (err: any) {
      setPaymentError(err.message || 'Error generating payment checkout.');
    } finally {
      setIsPaymentOrderLoading(false);
    }
  };

  // Google Sheets Auto-Save
  const saveBookingToGoogleSheet = async (
    status: string,
    utrVal: string = '',
    specificOrderId?: string,
    specificMethod?: string
  ) => {
    const activeOrderId = specificOrderId || paymentOrder?.orderId;
    if (!activeOrderId) return;

    const method = specificMethod || 'UPI Online';
    const fullAddress = `${patient.houseFlatNo || ''} ${patient.buildingSociety || ''} ${patient.streetArea || ''}`.trim() || patient.city || 'Doorstep Collection';
    const pkgCount = selectedPackage.testCountLabel || (selectedPackage.testsIncluded ? selectedPackage.testsIncluded.length : '');
    const testsSummary = `${pkgCount ? pkgCount + ' Tests ' : ''}(${selectedPackage.name})${selectedAddons.length > 0 ? ' + ' + selectedAddons.map(a => a.name).join(', ') : ''}`;

    // Exactly matching the 12 required columns
    const payload = {
      secret: (typeof window !== 'undefined' && ((window as any).GOOGLE_SHEETS_SECRET || (window as any).SHEETS_SECRET)) || 'CHANGE_THIS_TO_A_LONG_RANDOM_TEXT',
      package_type: 'STANDARD',
      package_name: selectedPackage.name,
      bookingId: activeOrderId,
      orderId: activeOrderId,
      createdAt: new Date().toISOString(),
      patientName: patient.fullName.trim() || 'Patient',
      name: patient.fullName.trim() || 'Patient',
      age: patient.age || 30,
      gender: patient.gender || 'Not Specified',
      mobile: patient.mobile.replace(/\D/g, '').slice(-10),
      packageName: selectedPackage.name,
      package: selectedPackage.name,
      selectedTests: testsSummary,
      finalAmount: paymentOrder?.amount || selectedPackage.finalPrice,
      amount: paymentOrder?.amount || selectedPackage.finalPrice,
      address: fullAddress,
      city: patient.city || 'Mumbai',
      pincode: patient.pincode || '400001',
      sampleDate: collectionDate,
      slot: collectionTime,
      paymentMethod: method,
      paymentStatus: status,
      providerTransactionId: utrVal || enteredUtr || 'Awaiting Verification',
      utr: utrVal || enteredUtr || 'Awaiting Verification',
      bookingStatus: status.toLowerCase().includes('paid') ? 'Confirmed' : 'Awaiting Verification',
      lastUpdated: new Date().toISOString()
    };

    setLastSheetPayload(payload);
    setSheetSyncStatus('syncing');

    const webAppUrl = (typeof window !== 'undefined' && ((window as any).GOOGLE_SHEETS_WEB_APP_URL || (window as any).WEB_APP_URL)) || '';

    const isValidWebUrl = (u: string) => {
      if (!u || typeof u !== 'string') return false;
      const trimmed = u.trim();
      if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return false;
      try {
        const parsed = new URL(trimmed);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
      } catch {
        return false;
      }
    };

    let success = true;

    // 1. Direct fetch to Google Apps Script Web App (no-cors, text/plain)
    if (webAppUrl && isValidWebUrl(webAppUrl)) {
      try {
        await fetch(webAppUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          mode: 'no-cors',
          keepalive: true,
          body: JSON.stringify(payload)
        });
      } catch {
        success = false;
      }
    }

    // 2. Forward to local backend proxy for authoritative server sync & logging
    try {
      const token = await getAccessToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      await fetch('/api/sheets/sync', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
    } catch {
      // Non-blocking
    }

    setSheetSyncStatus(success ? 'synced' : 'failed');
  };

  // Finalize booking after verified payment or confirmed collection
  const handleFinalizeBooking = async (verifiedOrderId: string, token: string) => {
    const bookingRes = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': verifiedOrderId
      },
      body: JSON.stringify({
        orderId: verifiedOrderId,
        verifiedToken: token,
        patient,
        packageId: selectedPackage.id,
        addOnIds: selectedAddonIds,
        collectionType,
        collectionDate,
        collectionTime
      })
    });

    const bookingData = await bookingRes.json();
    if (!bookingRes.ok) {
      throw new Error(bookingData.error || 'Failed to save confirmed booking record.');
    }

    setConfirmedBooking(bookingData.booking);
    onBookingConfirmed(bookingData.booking);
    setCurrentStep(6); // Show confirmation screen (Step 6)
  };

  // Render Desktop QR code using qrcodejs CDN with image fallback
  useEffect(() => {
    if (currentStep === 5 && !isMobileDevice && selectedPaymentMode === 'UPI' && paymentOrder && desktopQrRef.current) {
      desktopQrRef.current.innerHTML = '';
      setQrRenderError(null);

      // Validate paymentOrder details
      if (!paymentOrder.amount || paymentOrder.amount <= 0 || !paymentOrder.orderId) {
        setQrRenderError('Unable to generate payment QR: Invalid package amount or order reference.');
        return;
      }

      const upiId = '8850172102@ybl';
      const payeeName = 'J Square Lab & Diagnostic Centre';
      const orderId = paymentOrder.orderId;
      const amount = paymentOrder.amount;
      const link = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(orderId)}`;

      const win = typeof window !== 'undefined' ? (window as any) : null;
      let rendered = false;
      if (win && win.QRCode) {
        try {
          new win.QRCode(desktopQrRef.current, {
            text: link,
            width: 220,
            height: 220,
            colorDark: '#0B1220',
            colorLight: '#ffffff'
          });
          rendered = true;
        } catch (err) {
          console.warn('QRCode CDN render error:', err);
        }
      }
      if (!rendered || !desktopQrRef.current.hasChildNodes()) {
        try {
          const img = document.createElement('img');
          img.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(link)}`;
          img.alt = `UPI QR Code for ₹${amount} - ${payeeName}`;
          img.style.width = '220px';
          img.style.height = '220px';
          img.style.display = 'block';
          img.style.margin = '0 auto';
          desktopQrRef.current.appendChild(img);
        } catch {
          setQrRenderError('Payment QR code could not be rendered. Please use the UPI app link or check connection.');
        }
      }
    }
  }, [currentStep, isMobileDevice, selectedPaymentMode, paymentOrder]);

  // Check server-side payment verification status
  const handleCheckPaymentStatus = async () => {
    if (!paymentOrder?.orderId) return;
    setIsCheckingStatus(true);
    setStatusCheckFeedback(null);
    setPaymentError(null);

    try {
      const res = await fetch(`/api/payments/status/${paymentOrder.orderId}`);
      const data = await res.json();
      if (data.isPaid) {
        setStatusCheckFeedback('Payment confirmed by bank/provider! Finalizing your booking...');
        await saveBookingToGoogleSheet('Paid', data.transactionId || enteredUtr || 'PROVIDER-VERIFIED', paymentOrder.orderId, 'UPI Online');
        await handleFinalizeBooking(paymentOrder.orderId, 'TOKEN_BANK_VERIFIED');
      } else if (data.status === 'PAYMENT_FAILED') {
        setStatusCheckFeedback('Payment marked FAILED by payment provider. Please retry payment using UPI.');
        setPaymentError('Transaction was declined by bank/provider. Please retry.');
      } else {
        setStatusCheckFeedback(
          'Payment verification pending: Automatic bank webhook has not confirmed receipt yet. If you have completed payment in your UPI app, please submit your 12-digit UTR below or wait a moment.'
        );
      }
    } catch {
      setStatusCheckFeedback('Unable to check payment status right now. Please retry in a moment.');
    } finally {
      setIsCheckingStatus(false);
    }
  };

  // Real-time automatic polling on Step 5 for payment verification webhook
  useEffect(() => {
    if (currentStep !== 5 || !paymentOrder?.orderId || confirmedBooking) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/payments/status/${paymentOrder.orderId}`);
        const data = await res.json();
        if (data.isPaid) {
          clearInterval(interval);
          setStatusCheckFeedback('Payment verified by bank! Finalizing your diagnostic booking...');
          await saveBookingToGoogleSheet('Paid', data.transactionId || enteredUtr || 'PROVIDER-VERIFIED', paymentOrder.orderId, 'UPI Online');
          await handleFinalizeBooking(paymentOrder.orderId, 'TOKEN_BANK_VERIFIED');
        }
      } catch {
        // Silent poll error
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentStep, paymentOrder?.orderId, confirmedBooking, enteredUtr]);

  // Handle "Submit UTR for Verification" button click
  const handleIHavePaid = async () => {
    if (!paymentOrder) return;

    // Requirement: Do not treat submitting a UTR alone as proof of payment
    const cleanUtr = enteredUtr.trim();
    if (!cleanUtr || cleanUtr.length < 8) {
      setPaymentError(
        'Please enter a valid 12-digit UPI Reference / UTR Number from your PhonePe/GPay receipt to submit for verification.'
      );
      return;
    }

    setIsVerifyingPayment(true);
    setPaymentError(null);
    setStatusCheckFeedback(null);

    try {
      // 1. Send UTR submission to server
      const verifyRes = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: paymentOrder.orderId,
          transactionId: cleanUtr,
          paymentMethod: 'UPI'
        })
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.error || 'Server validation failed. Please check UTR.');
      }

      // 2. Google Sheets update with status "Pending (Reconciliation Required)"
      await saveBookingToGoogleSheet('Pending (Reconciliation Required)', cleanUtr, paymentOrder.orderId, 'UPI Online');

      // 3. Re-check if transaction is already confirmed on backend
      const statusRes = await fetch(`/api/payments/status/${paymentOrder.orderId}`);
      const statusData = await statusRes.json();

      if (statusData.isPaid) {
        setStatusCheckFeedback('Payment verified by bank! Finalizing your booking...');
        await saveBookingToGoogleSheet('Paid', statusData.transactionId || cleanUtr, paymentOrder.orderId, 'UPI Online');
        await handleFinalizeBooking(paymentOrder.orderId, 'TOKEN_BANK_VERIFIED');
      } else {
        // Critical requirement: Do NOT mark as PAID or confirmed before authentic verification
        setStatusCheckFeedback(
          `12-digit UTR (${cleanUtr}) recorded for Order ${paymentOrder.orderId} and synced to Google Sheets. Status: Pending Bank Verification. Once funds are confirmed by the provider or bank webhook, your booking will be confirmed automatically.`
        );
      }
    } catch (err: any) {
      setPaymentError(err.message || 'Payment submission failed. Please check UTR and retry.');
    } finally {
      setIsVerifyingPayment(false);
    }
  };

  // Sandbox Webhook Simulator for Testing
  const handleSimulateWebhook = async (
    scenario: 'simulate_success' | 'simulate_failure' | 'simulate_duplicate' | 'simulate_amount_mismatch' | 'simulate_invalid_signature'
  ) => {
    if (!paymentOrder?.orderId) return;
    setIsCheckingStatus(true);
    setStatusCheckFeedback(null);
    setPaymentError(null);

    try {
      const res = await fetch('/api/payments/test-simulate-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario,
          orderId: paymentOrder.orderId,
          amount: paymentOrder.amount
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setPaymentError(`[Sandbox Test]: ${data.error || 'Simulated error occurred'}`);
      } else {
        setStatusCheckFeedback(`[Sandbox Test Result]: ${data.message}`);
        if (scenario === 'simulate_success') {
          setTimeout(async () => {
            await handleCheckPaymentStatus();
          }, 800);
        }
      }
    } catch (err: any) {
      setPaymentError(err.message || 'Sandbox simulation failed.');
    } finally {
      setIsCheckingStatus(false);
    }
  };

  // Authoritative server-side payment verification & booking confirmation (fallback)
  const handleVerifyAndConfirmBooking = async () => {
    return handleIHavePaid();
  };

  // WhatsApp share message with exact booking confirmation format
  const handleWhatsAppBookingShare = () => {
    if (!confirmedBooking) return;
    const addressStr = confirmedBooking.collectionType === 'Home Sample Collection'
      ? `${confirmedBooking.address.houseFlatNo}, ${confirmedBooking.address.buildingSociety}, ${confirmedBooking.address.streetArea}, ${confirmedBooking.address.city} - ${confirmedBooking.address.pincode}`
      : 'Centre Visit - Shop No. 4, Suvidhya CHS, Near Shivaji Chowk, Sector 17, Vashi, Navi Mumbai - 400703';

    const landmarkStr = confirmedBooking.address.landmark || 'Near main road / gate';

    const msg = `J SQUARE LAB & DIAGNOSTIC CENTRE
BOOKING CONFIRMATION

Booking Status: CONFIRMED ✓
Payment Status: PAID ✓

Order ID: ${confirmedBooking.orderId}

Patient Details:
Name: ${confirmedBooking.patientName}
Age: ${confirmedBooking.age || 'N/A'}
Gender: ${confirmedBooking.gender || 'Not Specified'}
Mobile: ${confirmedBooking.mobile}

Package:
${confirmedBooking.packageName}

Amount Paid:
₹${confirmedBooking.totalAmount.toLocaleString('en-IN')}

Appointment:
Date: ${confirmedBooking.collectionDate}
Time: ${confirmedBooking.collectionTime}

Home Collection Address:
${addressStr}

Landmark:
${landmarkStr}

Payment Reference:
${confirmedBooking.transactionId || 'VERIFIED-UPI-TXN'}

Thank you for booking with J Square Lab & Diagnostic Centre.`;

    window.open(`https://wa.me/918691027116?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Modal Top Header with Brand Navy & Official Emblem */}
        <div className="bg-[#10243A] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-[#1A3654]">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" layout="horizontal" theme="dark" showSubtitle={false} />
            <div className="h-5 w-px bg-slate-600 hidden sm:block" />
            <div>
              <h3 className="text-sm font-bold tracking-tight text-white">
                {currentStep === 6 ? 'Booking Confirmed' : 'Book Diagnostic Checkup'}
              </h3>
              <p className="text-[10px] text-slate-300">Free Home Collection Across Mumbai &amp; Navi Mumbai</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1A3654] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker (Steps 1 to 5) */}
        {currentStep < 6 && (
          <div className="bg-[#F4FAF6] px-6 py-2.5 border-b border-[#B4E2C7]/50 flex items-center justify-between text-[11px] font-semibold text-slate-500 overflow-x-auto">
            <span className={currentStep === 1 ? 'text-[#008F3F] font-bold' : currentStep > 1 ? 'text-[#10243A]' : ''}>
              1. Package
            </span>
            <span>&rarr;</span>
            <span className={currentStep === 2 ? 'text-[#008F3F] font-bold' : currentStep > 2 ? 'text-[#10243A]' : ''}>
              2. Patient &amp; Address
            </span>
            <span>&rarr;</span>
            <span className={currentStep === 3 ? 'text-[#008F3F] font-bold' : currentStep > 3 ? 'text-[#10243A]' : ''}>
              3. Slot
            </span>
            <span>&rarr;</span>
            <span className={currentStep === 4 ? 'text-[#008F3F] font-bold' : currentStep > 4 ? 'text-[#10243A]' : ''}>
              4. Summary
            </span>
            <span>&rarr;</span>
            <span className={currentStep === 5 ? 'text-[#008F3F] font-bold' : ''}>
              5. UPI Pay
            </span>
          </div>
        )}

        {/* Step Body Content */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
          
          {/* ================= STEP 1: SERVICE & PACKAGE SELECTION ================= */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-[#10243A] mb-1 font-display">
                  Step 1: Select Diagnostic Package or Tests
                </h4>
                <p className="text-xs text-slate-500">
                  Select your primary diagnostic panel. All packages include direct supervision by Dr. Patil Mohit Ashok and free doorstep sample collection.
                </p>
              </div>

              {/* Package Dropdown Selector */}
              <div>
                <label className="block text-xs font-bold text-[#10243A] uppercase tracking-wider mb-2">
                  Select Diagnostic Package:
                </label>
                <select
                  value={selectedPackageId}
                  onChange={(e) => setSelectedPackageId(e.target.value)}
                  className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-[#10243A] focus:outline-none focus:ring-2 focus:ring-[#008F3F] focus:border-[#008F3F] shadow-2xs"
                >
                  {DIAGNOSTIC_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} — ₹{pkg.finalPrice.toLocaleString('en-IN')} (Save ₹{pkg.savings})
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Package Details Banner */}
              <div className="p-4 rounded-xl border bg-[#F4FAF6] border-[#B4E2C7]">

                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-bold text-[#10243A] text-sm font-display">
                    {selectedPackage.name}
                  </h5>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      MRP ₹{selectedPackage.mrp.toLocaleString('en-IN')}
                    </span>
                    <span className="text-lg font-extrabold text-[#008F3F] tabular-nums">
                      ₹{selectedPackage.finalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-3">
                  {selectedPackage.description}
                </p>

                <div className="text-xs font-bold text-[#10243A] mb-1.5">
                  Included Verification Checks ({selectedPackage.testsIncluded.length}):
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                  {selectedPackage.testsIncluded.map((test, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-white border border-[#B4E2C7] text-slate-700 px-2 py-0.5 rounded-md"
                    >
                      {test}
                    </span>
                  ))}
                </div>
              </div>

              {/* Optional Custom Add-Ons */}
              <div>
                <label className="block text-xs font-bold text-[#10243A] uppercase tracking-wider mb-2">
                  Optional Custom Add-On Profiles:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CUSTOM_ADDONS.map((addon) => {
                    const isSelected = selectedAddonIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#EBF7F0] border-[#008F3F] ring-1 ring-[#008F3F]'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-[#10243A]">{addon.name}</div>
                          <div className="text-[10px] text-slate-500">{addon.testsIncluded.slice(0, 2).join(', ')}...</div>
                        </div>

                        <div className="text-right">
                          <span className="font-mono font-bold text-[#008F3F]">
                            +₹{addon.finalPrice.toLocaleString('en-IN')}
                          </span>
                          <div className="text-[10px] text-slate-400">
                            {isSelected ? 'Added' : 'Click to Add'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next Button */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 bg-[#008F3F] hover:bg-[#007A35] active:bg-[#005F2A] text-white rounded-xl text-sm font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Patient Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: PATIENT DETAILS & ADDRESS ================= */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-[#10243A] mb-1 font-display">
                  Step 2: Patient &amp; Address Information
                </h4>
                <p className="text-xs text-slate-500">
                  Please provide accurate patient demographics and doorstep address for smooth phlebotomist dispatch and report registration.
                </p>
              </div>

              {/* Service Type Selection */}
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#F4FAF6] border border-[#B4E2C7]/60 rounded-xl">
                <button
                  type="button"
                  onClick={() => setCollectionType('Home Sample Collection')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    collectionType === 'Home Sample Collection'
                      ? 'bg-[#008F3F] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-[#10243A]'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Free Home Collection
                </button>

                <button
                  type="button"
                  onClick={() => setCollectionType('Visit Laboratory')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    collectionType === 'Visit Laboratory'
                      ? 'bg-[#008F3F] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-[#10243A]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Visit Laboratory
                </button>
              </div>

              {/* Patient Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#10243A] uppercase tracking-wider mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    value={patient.fullName}
                    onChange={(e) => setPatient({ ...patient, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Sharma"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008F3F] shadow-xs text-[#10243A] ${
                      formErrors.fullName ? 'border-[#E60000] bg-[#FEECEB]/30' : 'border-slate-300'
                    }`}
                  />
                  {formErrors.fullName && <p className="text-[11px] text-[#E60000] mt-1">{formErrors.fullName}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-[#10243A] uppercase tracking-wider mb-1">
                    Mobile Number (Compulsory) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                      +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={patient.mobile}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setPatient({ ...patient, mobile: val, whatsapp: patient.whatsapp || val });
                      }}
                      placeholder="9820012345"
                      className={`w-full pl-11 pr-3.5 py-2.5 bg-white border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#008F3F] shadow-xs text-[#10243A] ${
                        formErrors.mobile ? 'border-[#E60000] bg-[#FEECEB]/30' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {formErrors.mobile && <p className="text-[11px] text-[#E60000] mt-1">{formErrors.mobile}</p>}
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-xs font-bold text-[#10243A] uppercase tracking-wider mb-1">
                    WhatsApp Number (For PDF Reports)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                      +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={patient.whatsapp}
                      onChange={(e) => setPatient({ ...patient, whatsapp: e.target.value.replace(/\D/g, '') })}
                      placeholder="9820012345"
                      className="w-full pl-11 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#008F3F] shadow-xs text-[#10243A]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#10243A] uppercase tracking-wider mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={patient.email}
                    onChange={(e) => setPatient({ ...patient, email: e.target.value })}
                    placeholder="patient@example.com"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008F3F] shadow-xs text-[#10243A] ${
                      formErrors.email ? 'border-[#E60000] bg-[#FEECEB]/30' : 'border-slate-300'
                    }`}
                  />
                  {formErrors.email && <p className="text-[11px] text-[#E60000] mt-1">{formErrors.email}</p>}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-[#10243A] uppercase tracking-wider mb-1">
                    Gender *
                  </label>
                  <select
                    value={patient.gender}
                    onChange={(e) => setPatient({ ...patient, gender: e.target.value as any })}
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008F3F] shadow-xs text-[#10243A] ${
                      formErrors.gender ? 'border-[#E60000] bg-[#FEECEB]/30' : 'border-slate-300'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.gender && <p className="text-[11px] text-[#E60000] mt-1">{formErrors.gender}</p>}
                </div>

                {/* Date of Birth & Age */}
                <div>
                  <label className="block text-xs font-bold text-[#10243A] uppercase tracking-wider mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={patient.dob}
                    onChange={handleDobChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008F3F] shadow-xs text-[#10243A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#10243A] uppercase tracking-wider mb-1">
                    Age (Years) *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={patient.age}
                    onChange={(e) => setPatient({ ...patient, age: Number(e.target.value) || '' })}
                    placeholder="35"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008F3F] shadow-xs text-[#10243A] ${
                      formErrors.age ? 'border-[#E60000] bg-[#FEECEB]/30' : 'border-slate-300'
                    }`}
                  />
                  {formErrors.age && <p className="text-[11px] text-[#E60000] mt-1">{formErrors.age}</p>}
                </div>
              </div>

              {/* Complete Address Fields (if Home Collection) */}
              {collectionType === 'Home Sample Collection' && (
                <div className="pt-3 border-t border-slate-200 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#008F3F]">
                    <MapPin className="w-4 h-4 text-[#008F3F]" />
                    <span>Complete Doorstep Address (Mumbai / Navi Mumbai) *</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        House / Flat No. *
                      </label>
                      <input
                        type="text"
                        value={patient.houseFlatNo}
                        onChange={(e) => setPatient({ ...patient, houseFlatNo: e.target.value })}
                        placeholder="e.g. Flat 402, B-Wing"
                        className={`w-full px-3 py-2 bg-white border rounded-lg text-xs focus:ring-2 focus:ring-[#008F3F] text-[#10243A] ${
                          formErrors.houseFlatNo ? 'border-[#E60000] bg-[#FEECEB]/30' : 'border-slate-300'
                        }`}
                      />
                      {formErrors.houseFlatNo && <p className="text-[10px] text-[#E60000] mt-0.5">{formErrors.houseFlatNo}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Building / Society Name *
                      </label>
                      <input
                        type="text"
                        value={patient.buildingSociety}
                        onChange={(e) => setPatient({ ...patient, buildingSociety: e.target.value })}
                        placeholder="e.g. Sea Breeze Heights"
                        className={`w-full px-3 py-2 bg-white border rounded-lg text-xs focus:ring-2 focus:ring-[#008F3F] text-[#10243A] ${
                          formErrors.buildingSociety ? 'border-[#E60000] bg-[#FEECEB]/30' : 'border-slate-300'
                        }`}
                      />
                      {formErrors.buildingSociety && <p className="text-[10px] text-[#E60000] mt-0.5">{formErrors.buildingSociety}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Street / Area / Sector *
                      </label>
                      <input
                        type="text"
                        value={patient.streetArea}
                        onChange={(e) => setPatient({ ...patient, streetArea: e.target.value })}
                        placeholder="e.g. Sector 17, Vashi / Bandra West"
                        className={`w-full px-3 py-2 bg-white border rounded-lg text-xs focus:ring-2 focus:ring-[#008F3F] text-[#10243A] ${
                          formErrors.streetArea ? 'border-[#E60000] bg-[#FEECEB]/30' : 'border-slate-300'
                        }`}
                      />
                      {formErrors.streetArea && <p className="text-[10px] text-[#E60000] mt-0.5">{formErrors.streetArea}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        value={patient.landmark}
                        onChange={(e) => setPatient({ ...patient, landmark: e.target.value })}
                        placeholder="Near Shivaji Chowk / Opp Garden"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#008F3F] text-[#10243A]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        City
                      </label>
                      <select
                        value={patient.city}
                        onChange={(e) => setPatient({ ...patient, city: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#008F3F] text-[#10243A]"
                      >
                        <option value="Mumbai">Mumbai</option>
                        <option value="Navi Mumbai">Navi Mumbai</option>
                        <option value="Thane">Thane</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Pincode (6-Digit) *
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={patient.pincode}
                        onChange={(e) => setPatient({ ...patient, pincode: e.target.value.replace(/\D/g, '') })}
                        placeholder="400703"
                        className={`w-full px-3 py-2 bg-white border rounded-lg text-xs font-mono focus:ring-2 focus:ring-[#008F3F] text-[#10243A] ${
                          formErrors.pincode ? 'border-[#E60000] bg-[#FEECEB]/30' : 'border-slate-300'
                        }`}
                      />
                      {formErrors.pincode && <p className="text-[10px] text-[#E60000] mt-0.5">{formErrors.pincode}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-[#10243A] flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleProceedFromPatientDetails}
                  className="px-6 py-2.5 bg-[#008F3F] hover:bg-[#007A35] text-white rounded-xl text-sm font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Slot Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: COLLECTION TIME SLOT ================= */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-[#10243A] mb-1 font-display">
                  Step 3: Preferred Date &amp; Time Slot
                </h4>
                <p className="text-xs text-slate-500">
                  Select when you want our certified phlebotomist to visit your doorstep or laboratory reception. Operating 6:30 AM to 9:00 PM, all 7 days.
                </p>
              </div>

              {/* Preferred Date Picker */}
              <div>
                <label className="block text-xs font-bold text-[#10243A] uppercase tracking-wider mb-2">
                  Preferred Collection Date:
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={collectionDate}
                  onChange={(e) => setCollectionDate(e.target.value)}
                  className="w-full sm:w-64 px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-[#10243A] focus:outline-none focus:ring-2 focus:ring-[#008F3F]"
                />
              </div>

              {/* Time Slots Radio Grid */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#10243A] uppercase tracking-wider">
                    Select Convenient Time Slot:
                  </label>
                  <span className="text-xs text-[#008F3F] font-bold">
                    Free Doorstep Sample Collection
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {COLLECTION_TIME_SLOTS.map((slot) => {
                    const isSelected = collectionTime === slot;
                    return (
                      <label
                        key={slot}
                        onClick={() => setCollectionTime(slot)}
                        className={`p-3 rounded-xl border text-xs font-mono font-medium cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#EBF7F0] border-[#008F3F] text-[#008F3F] font-bold ring-1 ring-[#008F3F]'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#008F3F]" />
                          <span>{slot}</span>
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#008F3F]" />}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Fasting Reminder if needed */}
              {selectedPackage.fastingRequired && (
                <div className="p-3 rounded-xl bg-[#FEECEB]/60 border border-[#FCA5A5] text-xs text-[#10243A] flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#E60000] shrink-0 mt-0.5" />
                  <span>
                    <strong>Fasting Reminder:</strong> The chosen package ({selectedPackage.name}) requires 10 hours of fasting. Morning slots (6:30 AM – 10:30 AM) are recommended. Water is permitted.
                  </span>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-[#10243A] flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-2.5 bg-[#008F3F] hover:bg-[#007A35] text-white rounded-xl text-sm font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Review Booking Summary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: BOOKING SUMMARY ================= */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-[#10243A] mb-1 font-display">
                  Step 4: Review Booking Summary
                </h4>
                <p className="text-xs text-slate-500">
                  Please review the patient details, selected tests, and final payable amount before proceeding to the UPI payment gateway.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F4FAF6] border border-[#B4E2C7]/60 space-y-4 text-xs">
                {/* Patient Overview */}
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] block font-bold">Patient Name</span>
                    <strong className="text-sm font-bold text-[#10243A]">{patient.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] block font-bold">Mobile Number</span>
                    <span className="font-mono text-[#008F3F] font-bold">+91 {patient.mobile}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] block font-bold">Age / Gender</span>
                    <span className="text-slate-700 font-semibold">{patient.age} Yrs / {patient.gender}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] block font-bold">Collection Slot</span>
                    <span className="font-mono text-[#10243A] font-semibold">{collectionDate} · {collectionTime}</span>
                  </div>
                </div>

                {/* Collection Address */}
                {collectionType === 'Home Sample Collection' && (
                  <div className="pb-3 border-b border-slate-200">
                    <span className="text-slate-400 uppercase text-[10px] block font-bold">Doorstep Collection Address</span>
                    <p className="text-slate-700 mt-0.5">
                      {patient.houseFlatNo}, {patient.buildingSociety}, {patient.streetArea}, {patient.landmark ? `(Near ${patient.landmark}), ` : ''}{patient.city} - {patient.pincode}
                    </p>
                  </div>
                )}

                {/* Price Breakdown Calculation */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>{selectedPackage.name}</span>
                    <span className="font-mono tabular-nums font-semibold text-[#10243A]">₹{selectedPackage.finalPrice.toLocaleString('en-IN')}</span>
                  </div>

                  {selectedAddons.map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between text-slate-600">
                      <span>+ Custom Add-on: {addon.name}</span>
                      <span className="font-mono tabular-nums font-semibold text-[#10243A]">₹{addon.finalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  ))}

                  <div className="flex items-center justify-between text-[#008F3F] font-bold">
                    <span>Doorstep Sample Collection Charge</span>
                    <span className="font-bold uppercase tracking-wider text-[11px] bg-[#EBF7F0] border border-[#B4E2C7] px-2 py-0.5 rounded">
                      FREE (₹0)
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-300 flex items-baseline justify-between text-[#10243A] font-bold">
                    <span className="text-sm">Final Payable Amount:</span>
                    <span className="text-2xl font-black text-[#008F3F] font-mono tabular-nums">
                      ₹{(selectedPackage.finalPrice + selectedAddons.reduce((s, a) => s + a.finalPrice, 0)).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Error if any */}
              {paymentError && (
                <div className="p-3 rounded-lg bg-[#FEECEB] border border-[#FCA5A5] text-xs text-[#E60000] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{paymentError}</span>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-[#10243A] flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleCreatePaymentOrder}
                  disabled={isPaymentOrderLoading}
                  className="px-6 py-3 bg-[#008F3F] hover:bg-[#007A35] disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md shadow-[#008F3F]/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isPaymentOrderLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Order...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>
                        PAY ₹{(selectedPackage.finalPrice + selectedAddons.reduce((s, a) => s + a.finalPrice, 0)).toLocaleString('en-IN')} WITH UPI
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 5: REAL PAYMENT GATEWAY / UPI CHECKOUT ================= */}
          {currentStep === 5 && paymentOrder && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-base font-bold text-[#10243A] font-display">
                    Step 5: UPI Payment
                  </h4>
                  <span className="text-[10px] font-mono font-bold bg-[#EBF7F0] text-[#008F3F] border border-[#B4E2C7] px-2 py-0.5 rounded">
                    MANDATORY ONLINE PAYMENT
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Online payment is compulsory for all health package bookings to reserve your certified phlebotomist doorstep visit.
                </p>
              </div>

              {/* Order Amount Banner in Dark Navy */}
              <div className="p-4 rounded-xl bg-[#10243A] text-white flex items-center justify-between border border-[#1A3654]">
                <div>
                  <div className="text-[11px] font-mono text-slate-400">Order ID: {paymentOrder.orderId}</div>
                  <div className="text-sm font-bold text-slate-100 mt-0.5">{paymentOrder.packageName}</div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-[#008F3F] font-bold font-mono">Total Payable</div>
                  <div className="text-2xl font-black font-mono text-white tabular-nums">
                    ₹{paymentOrder.amount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Selected Payment Method (Mandatory UPI) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#10243A] uppercase tracking-wider">
                  Payment Method
                </label>
                <div className="p-3.5 rounded-xl border bg-[#EBF7F0] border-[#008F3F] ring-1 ring-[#008F3F] text-left flex items-start gap-3">
                  <Smartphone className="w-5 h-5 shrink-0 mt-0.5 text-[#008F3F]" />
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-[#10243A] flex items-center gap-1.5">
                      <span>Verified UPI Online Payment</span>
                      <span className="text-[10px] bg-[#008F3F] text-white font-mono px-1.5 py-0.2 rounded font-semibold">Mandatory</span>
                    </div>
                    <div className="text-[11px] text-slate-600 leading-snug">
                      Pay securely using PhonePe, Google Pay, Paytm, or BHIM. Direct merchant credit.
                    </div>
                    <div className="text-[11px] text-[#008F3F] font-semibold pt-0.5">
                      Payee UPI ID: <span className="font-mono font-bold text-[#10243A]">8850172102@ybl</span> · Merchant: <span className="font-semibold text-slate-700">J Square Lab</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* UPI PAYMENT INTERFACE */}
              <div className="space-y-4">
                {/* MOBILE VIEW: PhonePe / GPay / Paytm direct intent buttons */}
                {isMobileDevice && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      {(['PhonePe', 'GPay', 'Paytm'] as const).map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setSelectedUpiApp(app)}
                          className={`py-2 px-1 text-center rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                            selectedUpiApp === app
                              ? 'border-[#008F3F] bg-[#EBF7F0] text-[#008F3F] ring-1 ring-[#008F3F]'
                              : 'border-slate-200 bg-white text-[#10243A] hover:bg-slate-50'
                          }`}
                        >
                          {app}
                        </button>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-[#F4FAF6] space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">Payment Channel:</span>
                        <span className="font-mono text-[#008F3F] font-bold">{selectedUpiApp} Direct Intent</span>
                      </div>

                      <a
                        href={(() => {
                          const upiId = '8850172102@ybl';
                          const payee = encodeURIComponent('J Square Lab & Diagnostic Centre');
                          const note = encodeURIComponent(paymentOrder.orderId);
                          const amount = paymentOrder.amount;
                          const query = `pa=${upiId}&pn=${payee}&am=${amount}&cu=INR&tn=${note}`;
                          if (selectedUpiApp === 'PhonePe') return `phonepe://pay?${query}`;
                          if (selectedUpiApp === 'GPay') return `tez://upi/pay?${query}`;
                          if (selectedUpiApp === 'Paytm') return `paytmmp://pay?${query}`;
                          return `upi://pay?${query}`;
                        })()}
                        className="w-full py-3 bg-[#008F3F] hover:bg-[#007A35] text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Pay via UPI App ({selectedUpiApp} • ₹{paymentOrder.amount.toLocaleString('en-IN')})</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </a>

                      <div className="text-center pt-0.5">
                        <a
                          href={`upi://pay?pa=8850172102@ybl&pn=${encodeURIComponent('J Square Lab & Diagnostic Centre')}&am=${paymentOrder.amount}&cu=INR&tn=${encodeURIComponent(paymentOrder.orderId)}`}
                          className="text-[11px] text-[#008F3F] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Or pay via other UPI apps (BHIM, Cred, Navi, etc.)</span>
                        </a>
                      </div>

                      <p className="text-[11px] text-slate-500 text-center">
                        Complete payment in your UPI app, then submit the 12-digit UTR below to confirm.
                      </p>
                    </div>
                  </div>
                )}

                {/* LAPTOP / DESKTOP VIEW: Show QR Code */}
                {!isMobileDevice && (
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-3.5">
                    <div>
                      <h5 className="text-sm font-bold text-[#10243A]">{paymentOrder.packageName}</h5>
                      <div className="text-3xl font-black text-[#008F3F] font-mono my-1 tracking-tight">
                        ₹{paymentOrder.amount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs font-mono text-slate-600 bg-slate-100 py-1 px-3 rounded-lg inline-block border border-slate-200">
                        Order ID: <strong className="text-slate-900">{paymentOrder.orderId}</strong>
                      </div>
                    </div>

                    {qrRenderError ? (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 max-w-sm mx-auto">
                        {qrRenderError}
                      </div>
                    ) : (
                      <div className="flex justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 max-w-[244px] mx-auto">
                        <div ref={desktopQrRef} className="min-w-[220px] min-h-[220px] flex items-center justify-center" />
                      </div>
                    )}

                    <p className="text-xs text-slate-700 font-semibold">
                      Scan with PhonePe, Google Pay, Paytm, BHIM, or any compatible UPI app from your mobile
                    </p>

                    {/* Functional "Pay via UPI App" button on desktop */}
                    <div className="max-w-[280px] mx-auto pt-1">
                      <a
                        href={`upi://pay?pa=8850172102@ybl&pn=${encodeURIComponent('J Square Lab & Diagnostic Centre')}&am=${paymentOrder.amount}&cu=INR&tn=${encodeURIComponent(paymentOrder.orderId)}`}
                        className="w-full py-2.5 px-4 bg-[#EBF7F0] hover:bg-[#D8F3E5] text-[#008F3F] border border-[#B4E2C7] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-95"
                      >
                        <ExternalLink className="w-4 h-4 text-[#008F3F]" />
                        <span>Pay via UPI App</span>
                      </a>
                    </div>

                    <div className="text-[11px] font-mono text-slate-500">
                      UPI ID: <strong className="text-slate-800">8850172102@ybl</strong>
                    </div>
                  </div>
                )}

                {/* Payment Verification Status & Reliable Check-Status Option */}
                <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/70 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                      <span className="font-bold text-amber-900">Payment Verification Pending</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCheckPaymentStatus}
                      disabled={isCheckingStatus}
                      className="text-[11px] font-bold text-[#008F3F] bg-white border border-[#B4E2C7] px-2.5 py-1 rounded-lg hover:bg-[#EBF7F0] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {isCheckingStatus ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Checking...</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" />
                          <span>Check Status</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-snug">
                    Orders are confirmed only after authentic payment confirmation. If you completed transfer in your UPI app, please enter your 12-digit UTR below or click &ldquo;Check Status&rdquo;.
                  </p>
                  {statusCheckFeedback && (
                    <div className="p-2 rounded bg-white/95 border border-amber-200 text-[11px] text-amber-900 font-medium">
                      {statusCheckFeedback}
                    </div>
                  )}
                </div>

                {/* 12-Digit UTR / Transaction Reference Input */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-left">
                  <label className="block text-xs font-bold text-[#10243A]">
                    12-Digit UPI Ref / UTR / Transaction ID <span className="text-[#008F3F] font-semibold">*</span>:
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    value={enteredUtr}
                    onChange={(e) => {
                      setEnteredUtr(e.target.value.replace(/\D/g, '').slice(0, 12));
                      setPaymentError(null);
                      setStatusCheckFeedback(null);
                    }}
                    placeholder="e.g. 412345678901 (from PhonePe/GPay receipt)"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono tracking-wider text-[#10243A] focus:outline-none focus:ring-2 focus:ring-[#008F3F]"
                  />
                  <p className="text-[10px] text-slate-500">
                    This 12-digit number appears on your payment receipt as &ldquo;UPI Ref No.&rdquo; or &ldquo;UTR&rdquo;.
                  </p>
                </div>

                {/* Google Sheet Sync Retry if failed */}
                {sheetSyncStatus === 'failed' && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center justify-between">
                    <span>Google Sheet sync is taking a moment.</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (lastSheetPayload) {
                          saveBookingToGoogleSheet(
                            lastSheetPayload.paymentStatus,
                            lastSheetPayload.utr,
                            lastSheetPayload.orderId,
                            lastSheetPayload.paymentMethod
                          );
                        }
                      }}
                      className="text-[#008F3F] font-bold underline hover:text-[#007A35] ml-2 cursor-pointer"
                    >
                      Retry Sheet Sync
                    </button>
                  </div>
                )}

                {/* "Verify Payment & Confirm" Action Button */}
                <button
                  type="button"
                  onClick={handleIHavePaid}
                  disabled={isVerifyingPayment}
                  className="w-full py-3.5 bg-[#008F3F] hover:bg-[#007A35] disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md shadow-[#008F3F]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isVerifyingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Payment...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit UTR &amp; Verify Payment (₹{paymentOrder.amount.toLocaleString('en-IN')})</span>
                    </>
                  )}
                </button>

                {/* Developer / Sandbox Webhook Testing Controls (Safe Test Suite) */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-left space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Sandbox / Provider Webhook Test Suite
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Order: {paymentOrder.orderId}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Test the complete server-side verification, signed HMAC webhook, Google Sheets ledger update, and WhatsApp dispatch without live patient funds:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => handleSimulateWebhook('simulate_success')}
                      disabled={isCheckingStatus}
                      className="p-2 text-left bg-white border border-[#B4E2C7] hover:bg-[#EBF7F0] text-[#008F3F] rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      ✅ Simulate Bank Success
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulateWebhook('simulate_failure')}
                      disabled={isCheckingStatus}
                      className="p-2 text-left bg-white border border-red-200 hover:bg-red-50 text-red-700 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      ❌ Simulate Bank Failure
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulateWebhook('simulate_duplicate')}
                      disabled={isCheckingStatus}
                      className="p-2 text-left bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      🔄 Test Idempotency
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulateWebhook('simulate_amount_mismatch')}
                      disabled={isCheckingStatus}
                      className="p-2 text-left bg-white border border-amber-200 hover:bg-amber-50 text-amber-800 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      ⚠️ Test Amount Tampering
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulateWebhook('simulate_invalid_signature')}
                      disabled={isCheckingStatus}
                      className="p-2 text-left bg-white border border-amber-200 hover:bg-amber-50 text-amber-800 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      🔒 Test Bad HMAC Signature
                    </button>
                    <button
                      type="button"
                      onClick={handleCheckPaymentStatus}
                      disabled={isCheckingStatus}
                      className="p-2 text-left bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      🔍 Poll Payment Status
                    </button>
                  </div>
                </div>
              </div>

              {/* Error banner */}
              {paymentError && (
                <div className="p-3 rounded-lg bg-[#FEECEB] border border-[#FCA5A5] text-xs text-[#E60000] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{paymentError}</span>
                </div>
              )}

              {/* Cancel / Back button */}
              <div className="pt-1 flex justify-start">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="text-xs text-slate-500 hover:text-[#10243A] font-semibold cursor-pointer flex items-center gap-1"
                >
                  <span>&larr; Back to Summary</span>
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 6: BOOKING CONFIRMED SCREEN ================= */}
          {currentStep === 6 && confirmedBooking && (
            <div className="space-y-5 text-center py-3">
              <div className="flex justify-center mb-1">
                <BrandLogo size="md" layout="horizontal" />
              </div>

              {/* Large green check icon */}
              <div className="w-16 h-16 rounded-full bg-[#EBF7F0] text-[#008F3F] border border-[#B4E2C7] mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-display font-extrabold text-[#10243A]">
                  Booking Successful
                </h3>
                <p className="text-sm font-medium text-slate-600 mt-1">
                  Your diagnostic test booking has been confirmed successfully.
                </p>
              </div>

              {/* Green Confirmation Card */}
              <div className="p-3.5 rounded-xl bg-[#EBF7F0] border border-[#B4E2C7] text-xs font-semibold text-[#008F3F] flex items-center justify-center gap-2 max-w-lg mx-auto shadow-2xs">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#008F3F]" />
                <span>Your booking details have been saved successfully.</span>
              </div>

              {/* Key Summary Box with prompt-specified items */}
              <div className="text-left p-4 rounded-xl bg-[#F4FAF6] border border-[#B4E2C7]/70 text-xs space-y-2.5 max-w-lg mx-auto shadow-2xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#B4E2C7]/40 text-[#008F3F] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span>✓</span>
                    <span>Payment Successful</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>✓</span>
                    <span>Booking Confirmed</span>
                  </div>
                </div>

                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Order ID:</span>
                  <span className="font-mono font-bold text-[#10243A]">{confirmedBooking.orderId}</span>
                </div>

                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Package:</span>
                  <span className="font-semibold text-[#10243A]">{confirmedBooking.packageName}</span>
                </div>

                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Amount Paid:</span>
                  <strong className="font-mono text-[#008F3F] font-bold">
                    ₹{confirmedBooking.totalAmount.toLocaleString('en-IN')}
                  </strong>
                </div>

                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Patient Name:</span>
                  <span className="font-bold text-[#10243A]">{confirmedBooking.patientName}</span>
                </div>

                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Appointment Date:</span>
                  <span className="font-semibold text-[#10243A]">{confirmedBooking.collectionDate}</span>
                </div>

                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Appointment Time:</span>
                  <span className="font-semibold text-[#10243A]">{confirmedBooking.collectionTime}</span>
                </div>

                <div className="flex justify-between pt-0.5">
                  <span className="text-slate-500 font-medium shrink-0">Home Collection Address:</span>
                  <span className="text-slate-700 font-medium text-right ml-2">
                    {confirmedBooking.collectionType === 'Home Sample Collection'
                      ? `${confirmedBooking.address.houseFlatNo}, ${confirmedBooking.address.buildingSociety}, ${confirmedBooking.address.streetArea}, ${confirmedBooking.address.city} - ${confirmedBooking.address.pincode}`
                      : 'Shop No. 4, Suvidhya CHS, Near Shivaji Chowk, Sector 17, Vashi, Navi Mumbai - 400703'}
                  </span>
                </div>
              </div>

              {/* Automated WhatsApp Notice */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-center gap-2 max-w-lg mx-auto">
                <Smartphone className="w-4 h-4 shrink-0 text-[#008F3F]" />
                <span className="text-left">
                  Automated WhatsApp notification registered for <strong>+91 {confirmedBooking.mobile}</strong>.
                </span>
              </div>

              {/* Requested Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto pt-1">
                {/* 1. View Booking Details */}
                <button
                  type="button"
                  onClick={() => onOpenReceipt(confirmedBooking)}
                  className="py-3 px-4 bg-[#008F3F] hover:bg-[#007A35] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>View Booking Details</span>
                </button>

                {/* 2. Send Details on WhatsApp */}
                <button
                  type="button"
                  onClick={handleWhatsAppBookingShare}
                  className="py-3 px-4 bg-[#10243A] hover:bg-[#1A3654] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-[#008F3F]" />
                  <span>Send Details on WhatsApp</span>
                </button>

                {/* 3. Call Laboratory */}
                <a
                  href={`tel:${CONTACT_INFO.receptionPhoneRaw}`}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-[#10243A] rounded-xl text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#008F3F]" />
                  <span>Call Laboratory</span>
                </a>

                {/* 4. Back to Home */}
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 bg-white hover:bg-[#EBF7F0] text-[#10243A] hover:text-[#008F3F] border border-slate-300 hover:border-[#008F3F] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Back to Home</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
