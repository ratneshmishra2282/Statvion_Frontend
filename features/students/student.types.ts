export interface Student {
  id: string;
  admissionNo: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  bloodGroup: string;
  aadhaar: string;
  religion: string;
  category: string;
  motherTongue: string;
  photoUrl: string | null;
  // Parent details
  fatherName: string;
  fatherMobile: string;
  fatherOccupation: string;
  motherName: string;
  motherMobile: string;
  guardianName: string;
  guardianMobile: string;
  // Address
  residentialAddress: string;
  city: string;
  state: string;
  pincode: string;
  permanentAddress: string;
  // Academic
  admissionDate: string;
  class: string;
  section: string;
  stream: string;
  previousSchool: string;
  // Fee Details
  facilities: string;
  routeHostel: string;
  vehicle: string;
  accountType: string;
  schemes: string;
  smsCategory: string;
  feesMonth: string[];
  transportMonth: string[];
  // Fees
  fees?: StudentFees;
  // Documents
  documents: StudentDocument[];
  // Status
  status: "active" | "inactive";
  // Meta
  createdAt: string;
  updatedAt: string;
}

export interface StudentDocument {
  id: string;
  name: string;
  type: "birth_certificate" | "aadhaar" | "tc" | "marksheet" | "caste_certificate" | "other";
  url: string;
}

export interface FeeInstallment {
  month: string;
  amount: number;
  paid: number;
  due: number;
  status: "Paid" | "Partial" | "Pending";
}

export interface FeeStructureItem {
  feeType: string;
  amount: number;
}

export interface StudentFees {
  tuitionFee: FeeInstallment[];
  transportFee?: FeeInstallment[];
  feeStructure?: FeeStructureItem[];
}

export interface StudentListParams {
  page: number;
  limit: number;
  search?: string;
  class?: string;
  academicYear?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
