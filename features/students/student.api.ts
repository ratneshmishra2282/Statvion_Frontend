import { api } from "@/services/api";
import { API_ENDPOINTS } from "@/lib/constants";
import {
  Student,
  StudentListParams,
  PaginatedResponse,
  StudentFees,
} from "./student.types";

const MOCK_FEES: StudentFees = {
  tuitionFee: [
    { month: "April", amount: 5000, paid: 5000, due: 0, status: "Paid" },
    { month: "May", amount: 5000, paid: 5000, due: 0, status: "Paid" },
    { month: "June", amount: 5000, paid: 5000, due: 0, status: "Paid" },
    { month: "July", amount: 5000, paid: 2000, due: 3000, status: "Partial" },
    { month: "August", amount: 5000, paid: 0, due: 5000, status: "Pending" },
    { month: "September", amount: 5000, paid: 0, due: 5000, status: "Pending" },
    { month: "October", amount: 5000, paid: 0, due: 5000, status: "Pending" },
    { month: "November", amount: 5000, paid: 0, due: 5000, status: "Pending" },
    { month: "December", amount: 5000, paid: 0, due: 5000, status: "Pending" },
    { month: "January", amount: 5000, paid: 0, due: 5000, status: "Pending" },
    { month: "February", amount: 5000, paid: 0, due: 5000, status: "Pending" },
    { month: "March", amount: 5000, paid: 0, due: 5000, status: "Pending" },
  ],
  transportFee: [
    { month: "April", amount: 2000, paid: 2000, due: 0, status: "Paid" },
    { month: "May", amount: 2000, paid: 2000, due: 0, status: "Paid" },
    { month: "June", amount: 2000, paid: 2000, due: 0, status: "Paid" },
    { month: "July", amount: 2000, paid: 0, due: 2000, status: "Pending" },
    { month: "August", amount: 2000, paid: 0, due: 2000, status: "Pending" },
    { month: "September", amount: 2000, paid: 0, due: 2000, status: "Pending" },
    { month: "October", amount: 2000, paid: 0, due: 2000, status: "Pending" },
    { month: "November", amount: 2000, paid: 0, due: 2000, status: "Pending" },
    { month: "December", amount: 2000, paid: 0, due: 2000, status: "Pending" },
    { month: "January", amount: 2000, paid: 0, due: 2000, status: "Pending" },
    { month: "February", amount: 2000, paid: 0, due: 2000, status: "Pending" },
    { month: "March", amount: 2000, paid: 0, due: 2000, status: "Pending" },
  ],
};

// Mock student data for development
const MOCK_STUDENTS: Student[] = [
  {
    id: "stu_001",
    admissionNo: "ADM2025001",
    firstName: "Aarav",
    lastName: "Kumar",
    gender: "male",
    dateOfBirth: "2012-03-15",
    bloodGroup: "B+",
    aadhaar: "123456789012",
    religion: "Hindu",
    category: "General",
    motherTongue: "Hindi",
    photoUrl: null,
    fatherName: "Rajesh Kumar",
    fatherMobile: "9876543210",
    fatherOccupation: "Engineer",
    motherName: "Sunita Kumar",
    motherMobile: "9876543211",
    guardianName: "",
    guardianMobile: "",
    residentialAddress: "123, Sector 22",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201301",
    permanentAddress: "123, Sector 22, Noida",
    admissionDate: "2025-04-01",
    class: "8",
    section: "A",
    stream: "N/A",
    previousSchool: "Ryan International",
    facilities: "No",
    routeHostel: "Yes",
    vehicle: "Bus-01",
    accountType: "Single",
    schemes: "Regular-01-1",
    smsCategory: "GEN",
    feesMonth: ["April","May","June","July","August","September","October","November","December","January","February","March"],
    transportMonth: ["April","May","June","July","August","September","October","November","December","January","February","March"],
    fees: MOCK_FEES,
    documents: [],
    status: "active",
    createdAt: "2025-04-01T00:00:00Z",
    updatedAt: "2025-04-01T00:00:00Z",
  },
  {
    id: "stu_002",
    admissionNo: "ADM2025002",
    firstName: "Ananya",
    lastName: "Sharma",
    gender: "female",
    dateOfBirth: "2011-07-22",
    bloodGroup: "O+",
    aadhaar: "234567890123",
    religion: "Hindu",
    category: "OBC",
    motherTongue: "Hindi",
    photoUrl: null,
    fatherName: "Vikram Sharma",
    fatherMobile: "9988776655",
    fatherOccupation: "Doctor",
    motherName: "Meera Sharma",
    motherMobile: "9988776656",
    guardianName: "",
    guardianMobile: "",
    residentialAddress: "45, Green Park",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110016",
    permanentAddress: "",
    admissionDate: "2025-04-01",
    class: "9",
    section: "B",
    stream: "Science",
    previousSchool: "DPS Mathura Road",
    facilities: "No",
    routeHostel: "No",
    vehicle: "",
    accountType: "Single",
    schemes: "Regular-01-1",
    smsCategory: "GEN",
    feesMonth: ["April","May","June","July","August","September","October","November","December","January","February","March"],
    transportMonth: [],
    fees: { tuitionFee: MOCK_FEES.tuitionFee },
    documents: [],
    status: "active",
    createdAt: "2025-04-01T00:00:00Z",
    updatedAt: "2025-04-01T00:00:00Z",
  },
  {
    id: "stu_003",
    admissionNo: "ADM2025003",
    firstName: "Rohan",
    lastName: "Patel",
    gender: "male",
    dateOfBirth: "2012-11-08",
    bloodGroup: "A+",
    aadhaar: "345678901234",
    religion: "Hindu",
    category: "General",
    motherTongue: "Gujarati",
    photoUrl: null,
    fatherName: "Amit Patel",
    fatherMobile: "8877665544",
    fatherOccupation: "Business",
    motherName: "Kavita Patel",
    motherMobile: "8877665545",
    guardianName: "",
    guardianMobile: "",
    residentialAddress: "78, MG Road",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380001",
    permanentAddress: "78, MG Road, Ahmedabad",
    admissionDate: "2025-04-15",
    class: "8",
    section: "A",
    stream: "N/A",
    previousSchool: "Kendriya Vidyalaya",
    facilities: "No",
    routeHostel: "No",
    vehicle: "",
    accountType: "Single",
    schemes: "Regular-01-1",
    smsCategory: "GEN",
    feesMonth: ["April","May","June","July","August","September","October","November","December","January","February","March"],
    transportMonth: [],
    fees: { tuitionFee: MOCK_FEES.tuitionFee },
    documents: [],
    status: "active",
    createdAt: "2025-04-15T00:00:00Z",
    updatedAt: "2025-04-15T00:00:00Z",
  },
  {
    id: "stu_004",
    admissionNo: "ADM2025004",
    firstName: "Priya",
    lastName: "Singh",
    gender: "female",
    dateOfBirth: "2013-01-30",
    bloodGroup: "AB-",
    aadhaar: "456789012345",
    religion: "Sikh",
    category: "General",
    motherTongue: "Punjabi",
    photoUrl: null,
    fatherName: "Gurpreet Singh",
    fatherMobile: "7766554433",
    fatherOccupation: "Teacher",
    motherName: "Harpreet Kaur",
    motherMobile: "7766554434",
    guardianName: "",
    guardianMobile: "",
    residentialAddress: "12, Model Town",
    city: "Ludhiana",
    state: "Punjab",
    pincode: "141002",
    permanentAddress: "",
    admissionDate: "2025-05-01",
    class: "7",
    section: "C",
    stream: "N/A",
    previousSchool: "Sacred Heart School",
    facilities: "No",
    routeHostel: "Yes",
    vehicle: "Bus-02",
    accountType: "Sibling",
    schemes: "Regular-01-2",
    smsCategory: "GEN",
    feesMonth: ["April","May","June","July","August","September","October","November","December","January","February","March"],
    transportMonth: ["April","May","June","July","August","September","October","November","December","January","February","March"],
    fees: MOCK_FEES,
    documents: [],
    status: "active",
    createdAt: "2025-05-01T00:00:00Z",
    updatedAt: "2025-05-01T00:00:00Z",
  },
  {
    id: "stu_005",
    admissionNo: "ADM2025005",
    firstName: "Mohammed",
    lastName: "Ali",
    gender: "male",
    dateOfBirth: "2012-06-18",
    bloodGroup: "O-",
    aadhaar: "567890123456",
    religion: "Islam",
    category: "General",
    motherTongue: "Urdu",
    photoUrl: null,
    fatherName: "Imran Ali",
    fatherMobile: "6655443322",
    fatherOccupation: "Advocate",
    motherName: "Fatima Ali",
    motherMobile: "6655443323",
    guardianName: "",
    guardianMobile: "",
    residentialAddress: "34, Civil Lines",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226001",
    permanentAddress: "34, Civil Lines, Lucknow",
    admissionDate: "2025-04-10",
    class: "8",
    section: "B",
    stream: "N/A",
    previousSchool: "AMU School",
    facilities: "No",
    routeHostel: "No",
    vehicle: "",
    accountType: "Single",
    schemes: "Regular-02-1",
    smsCategory: "GEN",
    feesMonth: ["April","May","June","July","August","September","October","November","December","January","February","March"],
    transportMonth: [],
    fees: { tuitionFee: MOCK_FEES.tuitionFee },
    documents: [],
    status: "inactive",
    createdAt: "2025-04-10T00:00:00Z",
    updatedAt: "2025-04-10T00:00:00Z",
  },
];

function mockStudentList(
  params: StudentListParams
): PaginatedResponse<Student> {
  let filtered = [...MOCK_STUDENTS];

  if (params.search) {
    const s = params.search.toLowerCase();
    filtered = filtered.filter(
      (stu) =>
        stu.firstName.toLowerCase().includes(s) ||
        stu.lastName.toLowerCase().includes(s) ||
        stu.admissionNo.toLowerCase().includes(s) ||
        stu.fatherMobile.includes(s)
    );
  }

  if (params.class) {
    filtered = filtered.filter((stu) => stu.class === params.class);
  }

  const total = filtered.length;
  const start = (params.page - 1) * params.limit;
  const data = filtered.slice(start, start + params.limit);

  return {
    data,
    meta: {
      total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / params.limit),
    },
  };
}

export const studentApi = {
  list: async (
    params: StudentListParams
  ): Promise<PaginatedResponse<Student>> => {
    try {
      const response = await api.get<PaginatedResponse<Student>>(
        API_ENDPOINTS.STUDENTS.LIST,
        { params }
      );
      return response.data;
    } catch {
      // Fall back to mock data (demo mode)
      console.warn("[DEMO] Using mock student list");
      await new Promise((r) => setTimeout(r, 400));
      return mockStudentList(params);
    }
  },

  getById: async (id: string): Promise<Student> => {
    try {
      const response = await api.get<Student>(
        API_ENDPOINTS.STUDENTS.DETAIL(id)
      );
      return response.data;
    } catch {
      // Fall back to mock data (demo mode)
      console.warn("[DEMO] Using mock student detail");
      await new Promise((r) => setTimeout(r, 300));
      const student = MOCK_STUDENTS.find((s) => s.id === id);
      if (student) return student;
      throw new Error("Student not found");
    }
  },

  create: async (data: FormData): Promise<Student> => {
    try {
      const response = await api.post<Student>(
        API_ENDPOINTS.STUDENTS.CREATE,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch {
      // Fall back to mock data (demo mode)
      console.warn("[DEMO] Mock student created");
      await new Promise((r) => setTimeout(r, 600));
      return {
        ...MOCK_STUDENTS[0],
        id: `stu_${Date.now()}`,
        firstName: data.get("firstName") as string,
        lastName: data.get("lastName") as string,
        admissionNo: `ADM${Date.now()}`,
      };
    }
  },

  update: async (id: string, data: FormData): Promise<Student> => {
    try {
      const response = await api.put<Student>(
        API_ENDPOINTS.STUDENTS.UPDATE(id),
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch {
      // Fall back to mock data (demo mode)
      console.warn("[DEMO] Mock student updated");
      await new Promise((r) => setTimeout(r, 400));
      const student = MOCK_STUDENTS.find((s) => s.id === id);
      return student || MOCK_STUDENTS[0];
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(API_ENDPOINTS.STUDENTS.DELETE(id));
    } catch {
      // Fall back to mock data (demo mode)
      console.warn("[DEMO] Mock student deleted:", id);
      await new Promise((r) => setTimeout(r, 300));
      return;
    }
  },
};
