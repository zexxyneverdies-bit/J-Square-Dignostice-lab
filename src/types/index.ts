export interface DiagnosticTest {
  name: string;
  category?: string;
}

export interface DiagnosticPackage {
  id: string;
  code: string;
  name: string;
  category: 'Full Body' | 'Women' | 'Men' | 'Senior Citizen' | 'Children' | 'Thyroid' | 'Student' | 'Cardiology' | 'Cancer Screening' | 'Fitness' | 'Custom Profiles' | 'Temporary Testing';
  mrp: number;
  finalPrice: number;
  savings: number;
  fastingRequired: boolean;
  fastingHours?: number;
  reportTimeHours: number;
  testsIncluded: string[];
  testCountLabel?: string;
  testCount?: number | string;
  badgeTitle?: string;
  description: string;
  popular?: boolean;
  isTestPackage?: boolean;
  isTemporary?: boolean;
}

export interface CustomAddon {
  id: string;
  name: string;
  finalPrice: number;
  category: string;
  testsIncluded: string[];
  testCountLabel?: string;
  badgeTitle?: string;
}

export interface PatientDetails {
  fullName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  dob: string;
  age: number | '';
  gender: 'Male' | 'Female' | 'Other' | '';
  houseFlatNo: string;
  buildingSociety: string;
  streetArea: string;
  landmark: string;
  city: string;
  pincode: string;
}

export type CollectionType = 'Home Sample Collection' | 'Visit Laboratory';

export type BookingStatus =
  | 'New'
  | 'Confirmed'
  | 'Sample Collected'
  | 'Processing'
  | 'Report Ready'
  | 'Completed'
  | 'Cancelled';

export type PaymentStatus =
  | 'PAYMENT_PENDING'
  | 'PAYMENT_SUCCESS'
  | 'PAYMENT_FAILED'
  | 'PAYMENT_CANCELLED'
  | 'REFUND_PENDING'
  | 'REFUNDED';

export interface Booking {
  bookingId: string;
  patientId: string;
  patientName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  gender: string;
  dob: string;
  age: number;
  address: {
    houseFlatNo: string;
    buildingSociety: string;
    streetArea: string;
    landmark: string;
    city: string;
    pincode: string;
  };
  packageId: string;
  packageName: string;
  packagePrice: number;
  addOns: CustomAddon[];
  totalAmount: number;
  collectionType: CollectionType;
  collectionDate: string;
  collectionTime: string;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  transactionId?: string;
  orderId: string;
  bookingStatus: BookingStatus;
  createdAt: string;
  reportId?: string;
}

export interface TestResultItem {
  parameter: string;
  result: string;
  unit: string;
  referenceRange: string;
  flag?: 'Normal' | 'High' | 'Low' | 'Abnormal';
}

export interface DiagnosticReport {
  reportId: string;
  bookingId: string;
  patientName: string;
  age: number;
  gender: string;
  mobile: string;
  referredBy: string;
  sampleCollectedAt: string;
  sampleReceivedAt: string;
  reportedAt: string;
  packageName: string;
  results: {
    sectionName: string;
    items: TestResultItem[];
  }[];
  consultantDoctor: string;
  labTechnician: string;
  status: 'Preliminary' | 'Verified' | 'Final';
}

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

export interface IndividualTest {
  id: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  sampleType: string;
  fastingHours?: number;
  reportTimeHours: number;
  description: string;
  parametersCount: number;
  popular?: boolean;
}

export interface LabBranch {
  id: string;
  name: string;
  type: 'Main Reference Lab' | 'Diagnostic & Collection Hub';
  address: string;
  area: string;
  city: 'Navi Mumbai' | 'Mumbai' | 'Thane';
  pincode: string;
  timings: string;
  phone: string;
  phoneRaw: string;
  googleMapsUrl: string;
  features: string[];
}

export interface PrescriptionRequest {
  id: string;
  patientName: string;
  phone: string;
  whatsapp?: string;
  city: string;
  notes?: string;
  fileName?: string;
  fileData?: string;
  status: 'Received' | 'Called' | 'Converted' | 'Closed';
  createdAt: string;
}

export interface PatientReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  packageOrTest: string;
}
