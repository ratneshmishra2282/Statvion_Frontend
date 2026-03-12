"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useStudent } from "@/features/students/useStudents";
import { useCollectFee } from "@/features/fees/useFees";
import { FeeInstallment } from "@/features/students/student.types";
import { CollectFeePayload } from "@/features/fees/fee.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, IndianRupee, ChevronRight, Loader2 } from "lucide-react";

export default function StudentFeeDashboard() {
  const params = useParams();
  const studentId = params.studentId as string;
  const { data: student, isLoading, isError } = useStudent(studentId);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-[400px] rounded-xl" />
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-destructive">
          Failed to load student fee details.
        </div>
        <Link href="/fees/collect">
          <Button variant="outline" className="mt-4">
            Back to Collect Fee
          </Button>
        </Link>
      </div>
    );
  }

  const fees = student.fees;
  const tuitionFee = fees?.tuitionFee || [];
  const transportFee = fees?.transportFee || [];
  const feeStructure = fees?.feeStructure || [];

  const tuitionTotal = tuitionFee.reduce((s, f) => s + f.amount, 0);
  const tuitionPaid = tuitionFee.reduce((s, f) => s + f.paid, 0);
  const transportTotal = transportFee.reduce((s, f) => s + f.amount, 0);
  const transportPaid = transportFee.reduce((s, f) => s + f.paid, 0);

  const totalFee = tuitionTotal + transportTotal;
  const totalPaid = tuitionPaid + transportPaid;
  const totalDue = totalFee - totalPaid;

  const formatCurrency = (val: number) =>
    val.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  // Combine all installments for a single table view
  const allInstallments = tuitionFee.map((tf) => {
    const tp = transportFee.find((t) => t.month === tf.month);
    return {
      month: tf.month,
      amount: tf.amount + (tp?.amount || 0),
      paid: tf.paid + (tp?.paid || 0),
      due: tf.due + (tp?.due || 0),
      status:
        tf.paid + (tp?.paid || 0) === 0
          ? "Pending"
          : tf.due + (tp?.due || 0) === 0
            ? "Paid"
            : "Partial",
    } as FeeInstallment;
  });

  const installmentTotal = allInstallments.reduce((s, f) => s + f.amount, 0);
  const installmentPaid = allInstallments.reduce((s, f) => s + f.paid, 0);
  const installmentDue = allInstallments.reduce((s, f) => s + f.due, 0);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
        <Link
          href="/fees/collect"
          className="hover:text-foreground transition-colors"
        >
          Fees
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href="/fees/collect"
          className="hover:text-foreground transition-colors"
        >
          Collect Fee
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Student Details</span>
      </nav>

      {/* Page Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/fees/collect">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">Student Fee Details</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Student Information Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <Avatar className="h-20 w-20 flex-shrink-0">
                {student.photoUrl ? (
                  <AvatarImage
                    src={student.photoUrl}
                    alt={student.firstName}
                  />
                ) : null}
                <AvatarFallback className="text-xl">
                  {student.firstName.charAt(0)}
                  {student.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-bold">
                  {student.firstName} {student.lastName}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                  <InfoField
                    label="Admission No"
                    value={student.admissionNo}
                  />
                  <InfoField
                    label="Class"
                    value={`${student.class}${student.section}`}
                  />
                  <InfoField label="Mobile" value={student.fatherMobile} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fee Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground">Total Fee</p>
              <p className="text-lg sm:text-2xl font-bold">
                {formatCurrency(totalFee)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground">Total Paid</p>
              <p className="text-lg sm:text-2xl font-bold text-green-600">
                {formatCurrency(totalPaid)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground">Total Due</p>
              <p className="text-lg sm:text-2xl font-bold text-red-600">
                {formatCurrency(totalDue)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Fee Structure */}
        {feeStructure.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fee Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feeStructure.map((item) => (
                    <TableRow key={item.feeType}>
                      <TableCell className="font-medium">
                        {item.feeType}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold bg-muted/50">
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(
                        feeStructure.reduce((s, f) => s + f.amount, 0)
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Installment Table */}
        <Card className="min-w-0 overflow-hidden">
          <CardHeader>
            <CardTitle>Installment Table</CardTitle>
          </CardHeader>
          <CardContent className="px-0 sm:px-6">
            <div className="overflow-x-auto">
              <div className="min-w-[480px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Paid</TableHead>
                      <TableHead className="text-right">Due</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allInstallments.map((fee) => (
                      <TableRow key={fee.month}>
                        <TableCell className="font-medium">
                          {fee.month}
                        </TableCell>
                        <TableCell className="text-right">
                          {fee.amount.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="text-right">
                          {fee.paid.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="text-right">
                          {fee.due.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={
                              fee.status === "Paid"
                                ? "default"
                                : fee.status === "Partial"
                                  ? "outline"
                                  : "secondary"
                            }
                            className={
                              fee.status === "Paid"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : fee.status === "Partial"
                                  ? "border-yellow-500 text-yellow-700"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {fee.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-bold bg-muted/50">
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right">
                        {installmentTotal.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-right">
                        {installmentPaid.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-right">
                        {installmentDue.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collect Fee Button */}
        <div className="flex justify-end">
          <Button
            size="lg"
            disabled={totalDue === 0}
            className="w-full sm:w-auto"
            onClick={() => setDialogOpen(true)}
          >
            <IndianRupee className="mr-2 h-5 w-5" />
            Collect Fee
          </Button>
        </div>
      </div>

      {/* Collect Fee Dialog */}
      <CollectFeeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        studentId={studentId}
        studentName={`${student.firstName} ${student.lastName}`}
        admissionNo={student.admissionNo}
        studentClass={`${student.class}${student.section}`}
        allInstallments={allInstallments}
        feeStructure={feeStructure}
      />
    </div>
  );
}

/* ─── Collect Fee Dialog ─── */
function CollectFeeDialog({
  open,
  onOpenChange,
  studentId,
  studentName,
  admissionNo,
  studentClass,
  allInstallments,
  feeStructure,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  studentName: string;
  admissionNo: string;
  studentClass: string;
  allInstallments: FeeInstallment[];
  feeStructure: { feeType: string; amount: number }[];
}) {
  const router = useRouter();
  const collectFeeMutation = useCollectFee();

  // Form state
  const [installment, setInstallment] = useState("");
  const [feeType, setFeeType] = useState("");
  const [amountPaying, setAmountPaying] = useState("");
  const [lateFee, setLateFee] = useState("");
  const [fine, setFine] = useState("");
  const [discount, setDiscount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [remarks, setRemarks] = useState("");

  // Only show months with due > 0
  const pendingInstallments = allInstallments.filter((i) => i.due > 0);

  // Amount due based on selected installment
  const amountDue = useMemo(() => {
    if (!installment) return 0;
    const found = allInstallments.find((i) => i.month === installment);
    return found?.due || 0;
  }, [installment, allInstallments]);

  // Auto-calculate total payable
  const totalPayable = useMemo(() => {
    const paying = parseFloat(amountPaying) || 0;
    const late = parseFloat(lateFee) || 0;
    const fineAmt = parseFloat(fine) || 0;
    const disc = parseFloat(discount) || 0;
    return paying + late + fineAmt - disc;
  }, [amountPaying, lateFee, fine, discount]);

  const formatCurrency = (val: number) =>
    val.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  const resetForm = () => {
    setInstallment("");
    setFeeType("");
    setAmountPaying("");
    setLateFee("");
    setFine("");
    setDiscount("");
    setPaymentMode("");
    setTransactionId("");
    setPaymentDate(new Date().toISOString().split("T")[0]);
    setRemarks("");
  };

  const handleSubmit = () => {
    if (!installment || !feeType || !amountPaying || !paymentMode) return;

    const payload: CollectFeePayload = {
      studentId,
      studentName,
      admissionNo,
      studentClass,
      installment,
      feeType,
      amountDue,
      amountPaying: parseFloat(amountPaying) || 0,
      lateFee: parseFloat(lateFee) || 0,
      fine: parseFloat(fine) || 0,
      discount: parseFloat(discount) || 0,
      totalPayable,
      paymentMode,
      transactionId,
      paymentDate,
      remarks,
    };

    collectFeeMutation.mutate(payload, {
      onSuccess: (receipt) => {
        resetForm();
        onOpenChange(false);
        router.push(`/fees/receipt/${receipt.id}`);
      },
    });
  };

  const isFormValid =
    installment && feeType && amountPaying && paymentMode && totalPayable > 0;

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) resetForm();
        onOpenChange(val);
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Collect Fee</DialogTitle>
          <DialogDescription>
            Enter payment details for the student.
          </DialogDescription>
        </DialogHeader>

        {/* Student Info */}
        <div className="grid grid-cols-3 gap-4 bg-muted/50 rounded-lg p-3">
          <div>
            <p className="text-xs text-muted-foreground">Name</p>
            <p className="text-sm font-medium">{studentName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Admission No</p>
            <p className="text-sm font-medium">{admissionNo}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Class</p>
            <p className="text-sm font-medium">{studentClass}</p>
          </div>
        </div>

        <Separator />

        {/* Fee Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Installment */}
          <div className="space-y-2">
            <Label htmlFor="installment">Installment</Label>
            <Select value={installment} onValueChange={setInstallment}>
              <SelectTrigger>
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {pendingInstallments.map((inst) => (
                  <SelectItem key={inst.month} value={inst.month}>
                    {inst.month} (Due: {formatCurrency(inst.due)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fee Type */}
          <div className="space-y-2">
            <Label htmlFor="feeType">Fee Type</Label>
            <Select value={feeType} onValueChange={setFeeType}>
              <SelectTrigger>
                <SelectValue placeholder="Select fee type" />
              </SelectTrigger>
              <SelectContent>
                {feeStructure.map((item) => (
                  <SelectItem key={item.feeType} value={item.feeType}>
                    {item.feeType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount Due */}
          <div className="space-y-2">
            <Label>Amount Due</Label>
            <Input
              value={amountDue ? formatCurrency(amountDue) : "—"}
              readOnly
              className="bg-muted cursor-not-allowed"
            />
          </div>

          {/* Amount Paying */}
          <div className="space-y-2">
            <Label htmlFor="amountPaying">Amount Paying</Label>
            <Input
              id="amountPaying"
              type="number"
              min="0"
              placeholder="Enter amount"
              value={amountPaying}
              onChange={(e) => setAmountPaying(e.target.value)}
            />
          </div>

          {/* Late Fee */}
          <div className="space-y-2">
            <Label htmlFor="lateFee">Late Fee</Label>
            <Input
              id="lateFee"
              type="number"
              min="0"
              placeholder="0"
              value={lateFee}
              onChange={(e) => setLateFee(e.target.value)}
            />
          </div>

          {/* Fine */}
          <div className="space-y-2">
            <Label htmlFor="fine">Fine</Label>
            <Input
              id="fine"
              type="number"
              min="0"
              placeholder="0"
              value={fine}
              onChange={(e) => setFine(e.target.value)}
            />
          </div>

          {/* Discount */}
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="discount">Discount</Label>
            <Input
              id="discount"
              type="number"
              min="0"
              placeholder="0"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
        </div>

        <Separator />

        {/* Payment Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Payment Mode */}
          <div className="space-y-2">
            <Label htmlFor="paymentMode">Payment Mode</Label>
            <Select value={paymentMode} onValueChange={setPaymentMode}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="Card">Card</SelectItem>
                <SelectItem value="Net Banking">Net Banking</SelectItem>
                <SelectItem value="Cheque">Cheque</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transaction ID — only for non-Cash modes */}
          {paymentMode && paymentMode !== "Cash" && (
            <div className="space-y-2">
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input
                id="transactionId"
                placeholder="Enter transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
            </div>
          )}

          {/* Payment Date */}
          <div className="space-y-2">
            <Label htmlFor="paymentDate">Payment Date</Label>
            <Input
              id="paymentDate"
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </div>

          {/* Remarks */}
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Input
              id="remarks"
              placeholder="Optional remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        </div>

        <Separator />

        {/* Total Payable */}
        <div className="flex items-center justify-between bg-muted/50 rounded-lg p-4">
          <span className="text-sm font-medium text-muted-foreground">
            Total Payable
          </span>
          <span className="text-2xl font-bold">
            {formatCurrency(Math.max(totalPayable, 0))}
          </span>
        </div>

        {/* Footer Actions */}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              onOpenChange(false);
            }}
            disabled={collectFeeMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || collectFeeMutation.isPending}
          >
            {collectFeeMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <IndianRupee className="mr-2 h-4 w-4" />
                Generate Receipt
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Shared ─── */
function InfoField({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value || "-"}</p>
    </div>
  );
}
