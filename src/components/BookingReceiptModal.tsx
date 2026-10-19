import React from 'react';
import { Booking } from '../types';
import { BrandLogo } from './BrandLogo';
import { Printer, Download, CheckCircle2, X, Phone, Mail, Calendar, MapPin, ShieldCheck, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../data/packages';

interface BookingReceiptModalProps {
  booking: Booking;
  onClose: () => void;
}

export const BookingReceiptModal: React.FC<BookingReceiptModalProps> = ({ booking, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = `J SQUARE LAB & DIAGNOSTIC APPOINTMENT SLIP
Booking ID: ${booking.bookingId}
Patient: ${booking.patientName}
Mobile: +91 ${booking.mobile}
Package: ${booking.packageName}
Amount Paid: ₹${booking.totalAmount}
Slot: ${booking.collectionDate} (${booking.collectionTime})
Service: ${booking.collectionType}
Address: ${booking.address.houseFlatNo}, ${booking.address.buildingSociety}, ${booking.address.streetArea}, ${booking.address.city} - ${booking.address.pincode}
Payment Status: ${booking.paymentStatus}
Transaction Ref: ${booking.transactionId || 'UPI-VERIFIED'}

Thank you for choosing J Square Lab & Diagnostic Centre!`;
    window.open(`https://wa.me/918691027116?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Top Control Bar (Hidden during print) */}
        <div className="no-print bg-[#10243A] px-6 py-3 border-b border-[#1A3654] flex items-center justify-between text-white">
          <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-[#008F3F]" />
            Official Booking Receipt &amp; Appointment Slip
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppShare}
              className="px-3.5 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Share on WhatsApp (+91 86910 27116)"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Slip</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-[#008F3F] hover:bg-[#007A35] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1A3654] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div className="p-6 sm:p-8 space-y-6 text-[#10243A]" id="receipt-print-area">
          
          {/* Receipt Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <BrandLogo size="md" layout="horizontal" />
              <div className="text-[11px] text-slate-500 mt-2 font-medium">
                {CONTACT_INFO.location} · Reception: {CONTACT_INFO.receptionPhone}
              </div>
              <div className="text-[10px] text-slate-400">
                Email: {CONTACT_INFO.email} · Hours: {CONTACT_INFO.hours}
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-mono font-bold text-[#008F3F] bg-[#EBF7F0] border border-[#B4E2C7] px-2.5 py-1 rounded">
                BOOKING CONFIRMED
              </span>
              <div className="mt-2 text-xs font-mono text-slate-600">
                Booking ID: <strong className="text-[#10243A] font-bold">{booking.bookingId}</strong>
              </div>
              <div className="text-[11px] text-slate-500">
                Date: {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Patient & Appointment Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#F4FAF6] border border-[#B4E2C7]/60 text-xs">
            <div className="space-y-1.5">
              <div>
                <span className="text-slate-500 uppercase tracking-wider text-[10px] block">Patient Name:</span>
                <strong className="text-sm font-bold text-[#10243A]">{booking.patientName}</strong>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <span className="text-slate-500 text-[10px] block">Age / Gender:</span>
                  <span className="font-semibold text-slate-800">{booking.age} Yrs / {booking.gender}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Mobile:</span>
                  <span className="font-semibold text-slate-800 font-mono">+91 {booking.mobile}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div>
                <span className="text-slate-500 uppercase tracking-wider text-[10px] block">Service Type:</span>
                <strong className="text-[#008F3F] font-bold">{booking.collectionType}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Slot Time:</span>
                <span className="font-semibold text-slate-800 font-mono">{booking.collectionDate} · {booking.collectionTime}</span>
              </div>
              {booking.collectionType === 'Home Sample Collection' && (
                <div>
                  <span className="text-slate-500 text-[10px] block">Address:</span>
                  <span className="text-slate-700">
                    {booking.address.houseFlatNo}, {booking.address.buildingSociety}, {booking.address.streetArea}, {booking.address.city} - {booking.address.pincode}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Package and Payment Breakdown Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#10243A] text-white font-bold">
                <tr>
                  <th className="py-2.5 px-4">Diagnostic Package / Tests</th>
                  <th className="py-2.5 px-4 text-center">Collection</th>
                  <th className="py-2.5 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#10243A]">{booking.packageName}</div>
                    <div className="text-[11px] text-slate-500">Includes complete doctor-certified report</div>
                  </td>
                  <td className="py-3 px-4 text-center text-[#008F3F] font-bold">
                    Complimentary (₹0)
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-[#10243A] tabular-nums">
                    ₹{booking.packagePrice.toLocaleString('en-IN')}
                  </td>
                </tr>

                {booking.addOns && booking.addOns.map((add, idx) => (
                  <tr key={idx} className="bg-slate-50/50">
                    <td className="py-2.5 px-4 text-slate-700">
                      + Add-On: <strong>{add.name}</strong>
                    </td>
                    <td className="py-2.5 px-4 text-center text-slate-400">—</td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-800 tabular-nums">
                      ₹{add.finalPrice.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}

                <tr className="bg-[#EBF7F0] font-bold text-[#10243A] border-t border-slate-200">
                  <td colSpan={2} className="py-3 px-4 text-right text-slate-700">
                    Total Amount Paid via UPI:
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-base text-[#008F3F] tabular-nums font-black">
                    ₹{booking.totalAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment & Audit Reference */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg text-[10px] font-mono text-slate-600 border border-slate-200">
            <div>
              <span className="text-slate-400 block">Payment Status:</span>
              <strong className="text-[#008F3F] font-bold">{booking.paymentStatus}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Transaction Ref:</span>
              <span>{booking.transactionId || 'TXN-UPI-VERIFIED'}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-400 block">Payment Order:</span>
              <span>{booking.orderId}</span>
            </div>
          </div>

          {/* Phlebotomy Instructions */}
          <div className="p-3 bg-[#F4FAF6] rounded-lg border border-[#B4E2C7] text-xs text-[#10243A]">
            <strong className="text-[#008F3F]">Important Patient Guidelines:</strong>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px] text-slate-600">
              <li>Our technician will call 15 minutes before reaching your doorstep.</li>
              <li>Please remain fasting (water is allowed) if your chosen package requires fasting.</li>
              <li>Official digital reports are delivered to your WhatsApp number ({booking.whatsapp || booking.mobile}) in 6–12 hours.</li>
            </ul>
          </div>

          {/* Doctor Signature & Laboratory Seal Stamp */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-[#10243A]">{CONTACT_INFO.doctor}</div>
              <div className="text-[10px] text-slate-500">Consultant Pathologist &amp; Lab Director</div>
            </div>

            <div className="text-right">
              <div className="inline-block border border-dashed border-[#008F3F] rounded-lg px-3 py-1 text-center bg-[#EBF7F0]">
                <div className="text-[10px] font-black text-[#008F3F] uppercase tracking-widest">
                  J SQUARE LAB
                </div>
                <div className="text-[9px] text-[#10243A] font-semibold">VERIFIED SLIP</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
