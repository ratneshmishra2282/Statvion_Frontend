import { CollectFeePayload, FeeReceipt } from "./fee.types";

let receiptCounter = 12;

export async function collectFee(
  payload: CollectFeePayload
): Promise<FeeReceipt> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  receiptCounter++;
  const receiptNo = `RCP-${String(receiptCounter).padStart(5, "0")}`;

  return {
    id: `rcp_${Date.now()}`,
    receiptNo,
    studentId: payload.studentId,
    studentName: "",
    admissionNo: "",
    class: "",
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
}
