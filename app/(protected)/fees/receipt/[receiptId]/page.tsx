"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useReceipt } from "@/features/fees/useFees";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Printer, CheckCircle } from "lucide-react";

export default function ReceiptPage() {
  const params = useParams();
  const receiptId = params.receiptId as string;
  const { data: receipt, isLoading, isError } = useReceipt(receiptId);
  const schoolName = useAppSelector((state) => state.auth.user?.schoolName);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-[500px] rounded-xl" />
      </div>
    );
  }

  if (isError || !receipt) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <div className="text-destructive text-lg font-medium mb-2">
          Receipt not found
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          The receipt may have expired or the link is invalid.
        </p>
        <Link href="/fees/collect">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collect Fee
          </Button>
        </Link>
      </div>
    );
  }

  const formatCurrency = (val: number) =>
    val.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  const formattedDate = (() => {
    try {
      return new Date(receipt.paymentDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return receipt.paymentDate;
    }
  })();

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header — hidden during print */}
      <div className="flex items-center justify-between mb-6 no-print">
        <div className="flex items-center gap-4">
          <Link href="/fees/collect">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">Fee Receipt</h1>
        </div>
        <Button onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" />
          Print Receipt
        </Button>
      </div>

      {/* Success badge — hidden during print */}
      <div className="flex justify-center mb-6 no-print">
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-4 py-1.5 text-sm">
          <CheckCircle className="mr-1.5 h-4 w-4" />
          Payment Successful
        </Badge>
      </div>

      {/* Receipt Card — the printable area */}
      <Card className="print:shadow-none print:border">
        <CardContent className="p-6 md:p-8">
          {/* School Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">
              {schoolName || "School Name"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Fee Receipt</p>
          </div>

          {/* Receipt No + Date */}
          <div className="flex flex-col sm:flex-row justify-between text-sm mb-4 gap-1">
            <div>
              <span className="text-muted-foreground">Receipt No: </span>
              <span className="font-semibold">{receipt.receiptNo}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Date: </span>
              <span className="font-semibold">{formattedDate}</span>
            </div>
          </div>

          <Separator />

          {/* Student Information */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
            <InfoField label="Student Name" value={receipt.studentName} />
            <InfoField label="Admission No" value={receipt.admissionNo} />
            <InfoField label="Class" value={receipt.class} />
          </div>

          <Separator />

          {/* Payment Breakdown */}
          <div className="my-5 space-y-3">
            <DetailRow label="Installment" value={receipt.installment} />
            <DetailRow label="Fee Type" value={receipt.feeType} />

            <Separator className="my-3" />

            <DetailRow
              label="Amount"
              value={formatCurrency(receipt.amount)}
            />
            <DetailRow
              label="Late Fee"
              value={formatCurrency(receipt.lateFee)}
            />
            <DetailRow label="Fine" value={formatCurrency(receipt.fine)} />
            <DetailRow
              label="Discount"
              value={
                receipt.discount > 0
                  ? `- ${formatCurrency(receipt.discount)}`
                  : formatCurrency(0)
              }
            />
          </div>

          <Separator />

          {/* Total Paid — highlighted */}
          <div className="flex justify-between items-center my-5 bg-muted/50 rounded-lg p-4">
            <span className="font-semibold text-muted-foreground">
              Total Paid
            </span>
            <span className="text-2xl font-bold">
              {formatCurrency(receipt.totalPaid)}
            </span>
          </div>

          <Separator />

          {/* Payment Mode + Transaction ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
            <InfoField label="Payment Mode" value={receipt.paymentMode} />
            <InfoField
              label="Transaction ID"
              value={receipt.transactionId || "\u2014"}
            />
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground mt-8 pt-4 border-t border-dashed">
            This is a computer-generated receipt and does not require a
            signature.
          </div>
        </CardContent>
      </Card>

      {/* Bottom Actions — hidden during print */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6 no-print">
        <Link href="/fees/collect">
          <Button variant="outline" className="w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collect Fee
          </Button>
        </Link>
        <Button onClick={() => window.print()} className="w-full sm:w-auto">
          <Printer className="mr-2 h-4 w-4" />
          Print Receipt
        </Button>
      </div>
    </div>
  );
}

/* ─── Helper Components ─── */
function InfoField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value || "\u2014"}</p>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
