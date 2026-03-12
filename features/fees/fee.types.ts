export interface CollectFeePayload {
  studentId: string;
  installment: string;
  feeType: string;
  amountDue: number;
  amountPaying: number;
  lateFee: number;
  fine: number;
  discount: number;
  totalPayable: number;
  paymentMode: string;
  transactionId: string;
  paymentDate: string;
  remarks: string;
}

export interface FeeReceipt {
  id: string;
  receiptNo: string;
  studentId: string;
  studentName: string;
  admissionNo: string;
  class: string;
  paymentDate: string;
  installment: string;
  feeType: string;
  amount: number;
  lateFee: number;
  fine: number;
  discount: number;
  totalPaid: number;
  paymentMode: string;
  transactionId: string;
}
