import { CollectFeePayload, FeeReceipt, ReceiptListParams } from "./fee.types";
import { PaginatedResponse } from "@/features/students/student.types";

let receiptCounter = 12;
const receiptStore = new Map<string, FeeReceipt>();

/* ─── Pre-seed mock receipts ─── */
const MOCK_RECEIPTS: FeeReceipt[] = [
  {
    id: "rcp_001",
    receiptNo: "RCP-00001",
    studentId: "stu_001",
    studentName: "Aarav Kumar",
    admissionNo: "ADM2025001",
    class: "8A",
    paymentDate: "2025-04-10",
    installment: "April",
    feeType: "Tuition Fee",
    amount: 5000,
    lateFee: 0,
    fine: 0,
    discount: 0,
    totalPaid: 5000,
    paymentMode: "Cash",
    transactionId: "",
  },
  {
    id: "rcp_002",
    receiptNo: "RCP-00002",
    studentId: "stu_002",
    studentName: "Priya Sharma",
    admissionNo: "ADM2025002",
    class: "10B",
    paymentDate: "2025-04-12",
    installment: "April",
    feeType: "Tuition Fee",
    amount: 4500,
    lateFee: 0,
    fine: 0,
    discount: 500,
    totalPaid: 4000,
    paymentMode: "UPI",
    transactionId: "UPI2025041200123",
  },
  {
    id: "rcp_003",
    receiptNo: "RCP-00003",
    studentId: "stu_003",
    studentName: "Rahul Patel",
    admissionNo: "ADM2025003",
    class: "5C",
    paymentDate: "2025-04-15",
    installment: "April",
    feeType: "Tuition Fee",
    amount: 4000,
    lateFee: 0,
    fine: 0,
    discount: 0,
    totalPaid: 4000,
    paymentMode: "Cash",
    transactionId: "",
  },
  {
    id: "rcp_004",
    receiptNo: "RCP-00004",
    studentId: "stu_001",
    studentName: "Aarav Kumar",
    admissionNo: "ADM2025001",
    class: "8A",
    paymentDate: "2025-05-08",
    installment: "May",
    feeType: "Tuition Fee",
    amount: 5000,
    lateFee: 0,
    fine: 0,
    discount: 0,
    totalPaid: 5000,
    paymentMode: "Card",
    transactionId: "TXN20250508A001",
  },
  {
    id: "rcp_005",
    receiptNo: "RCP-00005",
    studentId: "stu_004",
    studentName: "Ananya Gupta",
    admissionNo: "ADM2025004",
    class: "12A",
    paymentDate: "2025-05-10",
    installment: "April",
    feeType: "Tuition Fee",
    amount: 6000,
    lateFee: 200,
    fine: 0,
    discount: 0,
    totalPaid: 6200,
    paymentMode: "Net Banking",
    transactionId: "NB20250510G004",
  },
  {
    id: "rcp_006",
    receiptNo: "RCP-00006",
    studentId: "stu_005",
    studentName: "Vikram Singh",
    admissionNo: "ADM2025005",
    class: "3A",
    paymentDate: "2025-05-12",
    installment: "April",
    feeType: "Tuition Fee",
    amount: 3500,
    lateFee: 0,
    fine: 0,
    discount: 0,
    totalPaid: 3500,
    paymentMode: "Cash",
    transactionId: "",
  },
  {
    id: "rcp_007",
    receiptNo: "RCP-00007",
    studentId: "stu_002",
    studentName: "Priya Sharma",
    admissionNo: "ADM2025002",
    class: "10B",
    paymentDate: "2025-05-15",
    installment: "May",
    feeType: "Tuition Fee",
    amount: 4500,
    lateFee: 0,
    fine: 0,
    discount: 0,
    totalPaid: 4500,
    paymentMode: "UPI",
    transactionId: "UPI2025051500456",
  },
  {
    id: "rcp_008",
    receiptNo: "RCP-00008",
    studentId: "stu_004",
    studentName: "Ananya Gupta",
    admissionNo: "ADM2025004",
    class: "12A",
    paymentDate: "2025-06-05",
    installment: "May",
    feeType: "Tuition Fee",
    amount: 6000,
    lateFee: 0,
    fine: 100,
    discount: 0,
    totalPaid: 6100,
    paymentMode: "Cheque",
    transactionId: "CHQ-004521",
  },
  {
    id: "rcp_009",
    receiptNo: "RCP-00009",
    studentId: "stu_003",
    studentName: "Rahul Patel",
    admissionNo: "ADM2025003",
    class: "5C",
    paymentDate: "2025-06-10",
    installment: "May",
    feeType: "Tuition Fee",
    amount: 4000,
    lateFee: 200,
    fine: 0,
    discount: 0,
    totalPaid: 4200,
    paymentMode: "Cash",
    transactionId: "",
  },
  {
    id: "rcp_010",
    receiptNo: "RCP-00010",
    studentId: "stu_001",
    studentName: "Aarav Kumar",
    admissionNo: "ADM2025001",
    class: "8A",
    paymentDate: "2025-06-12",
    installment: "June",
    feeType: "Tuition Fee",
    amount: 5000,
    lateFee: 0,
    fine: 0,
    discount: 0,
    totalPaid: 5000,
    paymentMode: "UPI",
    transactionId: "UPI2025061200789",
  },
  {
    id: "rcp_011",
    receiptNo: "RCP-00011",
    studentId: "stu_005",
    studentName: "Vikram Singh",
    admissionNo: "ADM2025005",
    class: "3A",
    paymentDate: "2025-07-08",
    installment: "May",
    feeType: "Tuition Fee",
    amount: 3500,
    lateFee: 100,
    fine: 0,
    discount: 0,
    totalPaid: 3600,
    paymentMode: "Card",
    transactionId: "TXN20250708V005",
  },
  {
    id: "rcp_012",
    receiptNo: "RCP-00012",
    studentId: "stu_004",
    studentName: "Ananya Gupta",
    admissionNo: "ADM2025004",
    class: "12A",
    paymentDate: "2025-07-15",
    installment: "June",
    feeType: "Tuition Fee",
    amount: 6000,
    lateFee: 0,
    fine: 0,
    discount: 0,
    totalPaid: 6000,
    paymentMode: "Cash",
    transactionId: "",
  },
];

// Pre-seed the store
MOCK_RECEIPTS.forEach((r) => receiptStore.set(r.id, r));

/* ─── API Functions ─── */

export async function collectFee(
  payload: CollectFeePayload
): Promise<FeeReceipt> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  receiptCounter++;
  const receiptNo = `RCP-${String(receiptCounter).padStart(5, "0")}`;
  const id = `rcp_${Date.now()}`;

  const receipt: FeeReceipt = {
    id,
    receiptNo,
    studentId: payload.studentId,
    studentName: payload.studentName,
    admissionNo: payload.admissionNo,
    class: payload.studentClass,
    paymentDate: payload.paymentDate,
    installment: payload.installment,
    feeType: payload.feeType,
    amount: payload.amountPaying,
    lateFee: payload.lateFee,
    fine: payload.fine,
    discount: payload.discount,
    totalPaid: payload.totalPayable,
    paymentMode: payload.paymentMode,
    transactionId: payload.transactionId,
  };

  receiptStore.set(id, receipt);
  return receipt;
}

export async function getReceipt(id: string): Promise<FeeReceipt> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const receipt = receiptStore.get(id);
  if (!receipt) {
    throw new Error("Receipt not found");
  }
  return receipt;
}

export async function getReceiptList(
  params: ReceiptListParams
): Promise<PaginatedResponse<FeeReceipt>> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  let receipts = Array.from(receiptStore.values());

  // Filter by search
  if (params.search) {
    const s = params.search.toLowerCase();
    receipts = receipts.filter(
      (r) =>
        r.receiptNo.toLowerCase().includes(s) ||
        r.studentName.toLowerCase().includes(s) ||
        r.admissionNo.toLowerCase().includes(s)
    );
  }

  // Sort by paymentDate descending (newest first)
  receipts.sort(
    (a, b) =>
      new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
  );

  // Paginate
  const total = receipts.length;
  const start = (params.page - 1) * params.limit;
  const data = receipts.slice(start, start + params.limit);

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
