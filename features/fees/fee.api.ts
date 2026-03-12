import { CollectFeePayload, FeeReceipt } from "./fee.types";

let receiptCounter = 12;
const receiptStore = new Map<string, FeeReceipt>();

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
