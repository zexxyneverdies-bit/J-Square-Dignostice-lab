import React, { useState, useEffect } from 'react';
import { Booking, BookingStatus, StaffUser, PrescriptionRequest } from '../types';
import { BrandLogo } from './BrandLogo';
import {
  X,
  Lock,
  UserCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  LogOut,
  RefreshCw,
  Phone,
  Calendar,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { CONTACT_INFO } from '../data/packages';

interface StaffPortalModalProps {
  onClose: () => void;
  onViewReport: (report: any) => void;
}

export const StaffPortalModal: React.FC<StaffPortalModalProps> = ({ onClose, onViewReport }) => {
  // Staff Auth State
  const [currentUser, setCurrentUser] = useState<StaffUser | null>(() => {
    const saved = localStorage.getItem('jsq_staff_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Bookings List State
  const [activeTab, setActiveTab] = useState<'bookings' | 'prescriptions'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [prescriptions, setPrescriptions] = useState<PrescriptionRequest[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [isLoadingPrescriptions, setIsLoadingPrescriptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const availableStatuses: BookingStatus[] = [
    'New',
    'Confirmed',
    'Sample Collected',
    'Processing',
    'Report Ready',
    'Completed',
    'Cancelled'
  ];

  // Fetch bookings when user is authenticated
  const fetchBookings = async () => {
    if (!currentUser) return;
    setIsLoadingBookings(true);

    try {
      const res = await fetch('/api/staff/bookings', {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error('Failed to load bookings:', err);
    } finally {
      setIsLoadingBookings(false);
    }
  };

  const fetchPrescriptions = async () => {
    if (!currentUser) return;
    setIsLoadingPrescriptions(true);

    try {
      const res = await fetch('/api/prescriptions', {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.prescriptions) {
        setPrescriptions(data.prescriptions);
      }
    } catch (err) {
      console.error('Failed to load prescriptions:', err);
    } finally {
      setIsLoadingPrescriptions(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchBookings();
      fetchPrescriptions();
    }
  }, [currentUser]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch('/api/staff/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials.');
      }

      const staffSession: StaffUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token
      };

      localStorage.setItem('jsq_staff_session', JSON.stringify(staffSession));
      setCurrentUser(staffSession);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('jsq_staff_session');
    setCurrentUser(null);
  };

  // Update Booking Status
  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    if (!currentUser) return;
    setStatusUpdatingId(bookingId);
    setActionSuccessMsg(null);

    try {
      const res = await fetch(`/api/staff/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({ bookingStatus: newStatus })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update status.');
      }

      setBookings((prev) =>
        prev.map((b) => (b.bookingId === bookingId ? { ...b, bookingStatus: newStatus } : b))
      );
      setActionSuccessMsg(`Booking ${bookingId} updated to "${newStatus}"`);
    } catch (err: any) {
      alert(err.message || 'Error updating status.');
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      b.bookingId.toLowerCase().includes(q) ||
      b.patientName.toLowerCase().includes(q) ||
      b.mobile.includes(q) ||
      b.packageName.toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'All' || b.bookingStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeStyle = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-[#EBF7F0] text-[#008F3F] border-[#B4E2C7] font-bold';
      case 'Sample Collected':
        return 'bg-[#EBF7F0] text-[#005F2A] border-[#B4E2C7] font-bold';
      case 'Processing':
        return 'bg-[#F4FAF6] text-[#10243A] border-slate-300 font-bold';
      case 'Report Ready':
        return 'bg-[#EBF7F0] text-[#008F3F] border-[#008F3F] font-bold';
      case 'Completed':
        return 'bg-slate-100 text-[#10243A] border-slate-300 font-bold';
      case 'Cancelled':
        return 'bg-[#FEECEB] text-[#E60000] border-[#FCA5A5] font-bold';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Top Header in Dark Navy */}
        <div className="bg-[#10243A] text-white px-6 py-4 flex items-center justify-between border-b border-[#1A3654]">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" layout="horizontal" theme="dark" showSubtitle={false} />
            <div className="h-5 w-px bg-slate-600 hidden sm:block" />
            <div>
              <h3 className="text-base font-bold tracking-tight text-white">Staff Management Portal</h3>
              <p className="text-[11px] text-slate-300">J Square Lab &amp; Diagnostic Centre</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <button
                onClick={handleLogout}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-[#1A3654] transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-[#008F3F]" />
                Logout ({currentUser.name})
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1A3654] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= LOGIN VIEW (IF NOT AUTHENTICATED) ================= */}
        {!currentUser ? (
          <div className="p-6 sm:p-10 max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-3">
                <BrandLogo size="lg" layout="stacked" />
              </div>
              <h4 className="text-xl font-bold text-[#10243A]">Laboratory Staff Login</h4>
              <p className="text-xs text-slate-500">
                Authorized access for clinical pathologists and lab technicians only.
              </p>
            </div>

            {/* Test credentials helper hint */}
            <div className="p-3.5 rounded-xl bg-[#F4FAF6] border border-[#B4E2C7] text-xs text-slate-600 space-y-1">
              <span className="font-bold text-[#10243A] block">Authorized Demo Credentials:</span>
              <div>Email: <strong className="font-mono text-[#008F3F]">saeeda@jsquarelab.com</strong></div>
              <div>Password: <strong className="font-mono text-[#008F3F]">jsquarelab@2026</strong></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#10243A] uppercase tracking-wider mb-1">
                  Staff Email
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="saeeda@jsquarelab.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008F3F] focus:border-[#008F3F] shadow-xs text-[#10243A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#10243A] uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008F3F] focus:border-[#008F3F] shadow-xs text-[#10243A]"
                  required
                />
              </div>

              {loginError && (
                <div className="p-3 rounded-lg bg-[#FEECEB] border border-[#FCA5A5] text-xs text-[#E60000] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 bg-[#008F3F] hover:bg-[#007A35] active:bg-[#005F2A] text-white rounded-xl text-sm font-bold shadow-xs transition-colors cursor-pointer"
              >
                {loginLoading ? 'Authenticating...' : 'Sign In to Portal'}
              </button>
            </form>
          </div>
        ) : (
          /* ================= AUTHENTICATED STAFF DASHBOARD ================= */
          <div className="p-6 space-y-5">
            {/* Tab Selector */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <button
                type="button"
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'bookings'
                    ? 'bg-[#008F3F] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Diagnostic Bookings ({bookings.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('prescriptions')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'prescriptions'
                    ? 'bg-[#008F3F] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Uploaded Prescriptions ({prescriptions.length})
              </button>
            </div>

            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Booking ID, Patient, Phone..."
                  className="w-full pl-9 pr-3 py-2 bg-[#F4FAF6] border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#008F3F] text-[#10243A]"
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-[#008F3F]" />
                  Status:
                </span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-[#10243A] focus:outline-none focus:ring-2 focus:ring-[#008F3F]"
                >
                  <option value="All">All Statuses ({bookings.length})</option>
                  {availableStatuses.map((st) => (
                    <option key={st} value={st}>
                      {st} ({bookings.filter((b) => b.bookingStatus === st).length})
                    </option>
                  ))}
                </select>

                <button
                  onClick={fetchBookings}
                  className="p-2 text-slate-600 hover:text-[#008F3F] border border-slate-300 rounded-lg hover:bg-[#EBF7F0] transition-colors cursor-pointer"
                  title="Refresh Bookings"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingBookings ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Success notification */}
            {actionSuccessMsg && (
              <div className="p-2.5 rounded-lg bg-[#EBF7F0] border border-[#B4E2C7] text-xs text-[#008F3F] font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#008F3F]" />
                <span>{actionSuccessMsg}</span>
              </div>
            )}

            {/* Bookings Table */}
            {activeTab === 'bookings' ? (
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto max-h-[50vh]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#10243A] text-white font-bold sticky top-0 z-10">
                    <tr>
                      <th className="py-3 px-3.5">Booking / ID</th>
                      <th className="py-3 px-3">Patient &amp; Contact</th>
                      <th className="py-3 px-3">Package / Amount</th>
                      <th className="py-3 px-3">Slot &amp; Address</th>
                      <th className="py-3 px-3">Payment</th>
                      <th className="py-3 px-3">Status Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredBookings.map((b) => (
                      <tr key={b.bookingId} className="hover:bg-[#F4FAF6] transition-colors">
                        {/* ID & Date */}
                        <td className="py-3 px-3.5 font-mono">
                          <div className="font-bold text-[#10243A]">{b.bookingId}</div>
                          <div className="text-[10px] text-slate-400">
                            {new Date(b.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>

                        {/* Patient info */}
                        <td className="py-3 px-3">
                          <div className="font-bold text-[#10243A]">{b.patientName}</div>
                          <div className="text-[11px] text-slate-600 font-mono">+91 {b.mobile}</div>
                          <div className="text-[10px] text-slate-400">{b.gender}, {b.age} Yrs</div>
                        </td>

                        {/* Package & Price */}
                        <td className="py-3 px-3">
                          <div className="font-semibold text-[#10243A]">{b.packageName}</div>
                          <div className="font-mono font-bold text-[#008F3F] tabular-nums">
                            ₹{b.totalAmount.toLocaleString('en-IN')}
                          </div>
                        </td>

                        {/* Slot & Address */}
                        <td className="py-3 px-3">
                          <div className="font-mono text-[#10243A] font-semibold">
                            {b.collectionDate} · {b.collectionTime}
                          </div>
                          <div className="text-[11px] text-[#008F3F] font-bold">
                            {b.collectionType}
                          </div>
                          {b.address && (
                            <div className="text-[10px] text-slate-500 max-w-[200px] truncate" title={`${b.address.houseFlatNo}, ${b.address.buildingSociety}, ${b.address.streetArea}`}>
                              {b.address.houseFlatNo}, {b.address.buildingSociety}
                            </div>
                          )}
                        </td>

                        {/* Payment */}
                        <td className="py-3 px-3">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EBF7F0] text-[#008F3F] border border-[#B4E2C7]">
                            {b.paymentStatus}
                          </span>
                        </td>

                        {/* Status dropdown & View Report */}
                        <td className="py-3 px-3">
                          <div className="flex flex-col gap-1.5">
                            <select
                              value={b.bookingStatus}
                              disabled={statusUpdatingId === b.bookingId}
                              onChange={(e) => handleStatusChange(b.bookingId, e.target.value as BookingStatus)}
                              className={`px-2 py-1 rounded text-xs border transition-colors ${getStatusBadgeStyle(
                                b.bookingStatus
                              )}`}
                            >
                              {availableStatuses.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>

                            <button
                              onClick={async () => {
                                try {
                                  const res = await fetch(`/api/reports/search?id=${b.bookingId}`);
                                  const data = await res.json();
                                  if (data.report) {
                                    onViewReport(data.report);
                                  }
                                } catch (e) {
                                  alert('Could not open report.');
                                }
                              }}
                              className="text-[10px] text-[#008F3F] hover:text-[#005F2A] font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <FileText className="w-3 h-3" />
                              View Report
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredBookings.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                          No booking records match the filter or search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            ) : (
              /* Prescriptions Table */
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto max-h-[50vh]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#10243A] text-white font-bold sticky top-0 z-10">
                      <tr>
                        <th className="py-3 px-3.5">Ticket ID &amp; Date</th>
                        <th className="py-3 px-3">Patient Name</th>
                        <th className="py-3 px-3">Mobile Contact</th>
                        <th className="py-3 px-3">City / Area</th>
                        <th className="py-3 px-3">Prescription File &amp; Notes</th>
                        <th className="py-3 px-3">Quick Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {prescriptions.map((rx) => (
                        <tr key={rx.id} className="hover:bg-[#F4FAF6] transition-colors">
                          <td className="py-3 px-3.5 font-mono font-bold text-[#10243A]">
                            {rx.id}
                            <span className="block text-[10px] text-slate-400 font-normal">
                              {new Date(rx.createdAt).toLocaleDateString('en-IN')}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-bold text-slate-900">
                            {rx.patientName}
                          </td>
                          <td className="py-3 px-3 font-mono">
                            <a href={`tel:+91${rx.phone}`} className="text-[#008F3F] hover:underline font-bold">
                              +91 {rx.phone}
                            </a>
                          </td>
                          <td className="py-3 px-3 text-slate-600">
                            {rx.city}
                          </td>
                          <td className="py-3 px-3 text-slate-600 max-w-[220px]">
                            <div className="font-semibold text-slate-800 text-[11px] truncate">{rx.fileName || 'Prescription image'}</div>
                            {rx.notes && <div className="text-[10px] text-slate-500 italic truncate">{rx.notes}</div>}
                          </td>
                          <td className="py-3 px-3">
                            <a
                              href={`https://wa.me/91${rx.phone}?text=${encodeURIComponent(`Hello ${rx.patientName}! This is J Square Lab regarding your prescription ${rx.id}. We are ready to schedule your free home sample collection.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#25D366] text-white rounded text-[11px] font-bold shadow-2xs hover:bg-[#20bd5a]"
                            >
                              WhatsApp Patient
                            </a>
                          </td>
                        </tr>
                      ))}

                      {prescriptions.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                            No uploaded prescriptions recorded yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Bottom info */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span>Showing <strong>{activeTab === 'bookings' ? filteredBookings.length : prescriptions.length}</strong> {activeTab === 'bookings' ? `of ${bookings.length} bookings` : 'prescriptions'}</span>
              <span>Logged in as: <strong className="text-[#10243A]">{currentUser.name}</strong> ({currentUser.role})</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
