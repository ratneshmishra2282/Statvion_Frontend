"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useStudent } from "@/features/students/useStudents";
import { Student, FeeInstallment } from "@/features/students/student.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Pencil } from "lucide-react";

export default function StudentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: student, isLoading, isError } = useStudent(id);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[600px] rounded-xl" />
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-destructive">Failed to load student details.</div>
        <Link href="/students">
          <Button variant="outline" className="mt-4">
            Back to Students
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/students">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">Student Details</h1>
        <div className="ml-auto flex items-center gap-2">
          <Link href={`/students/edit/${id}`}>
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Badge
            variant={student.status === "active" ? "default" : "secondary"}
          >
            {student.status}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab student={student} />
        </TabsContent>

        <TabsContent value="fees">
          <FeesTab student={student} />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab student={student} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ─── Profile Tab ─── */
function ProfileTab({ student }: { student: Student }) {
  return (
    <div className="grid gap-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-20 w-20 flex-shrink-0">
              {student.photoUrl ? (
                <AvatarImage src={student.photoUrl} />
              ) : null}
              <AvatarFallback className="text-xl">
                {student.firstName.charAt(0)}
                {student.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1 w-full">
              <InfoField label="Admission No" value={student.admissionNo} />
              <InfoField
                label="Full Name"
                value={`${student.firstName} ${student.lastName}`}
              />
              <InfoField label="Gender" value={student.gender} />
              <InfoField label="Date of Birth" value={student.dateOfBirth} />
              <InfoField label="Blood Group" value={student.bloodGroup} />
              <InfoField label="Aadhaar" value={student.aadhaar} />
              <InfoField label="Religion" value={student.religion} />
              <InfoField label="Category" value={student.category} />
              <InfoField label="Mother Tongue" value={student.motherTongue} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Parent Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <InfoField label="Father's Name" value={student.fatherName} />
            <InfoField label="Father's Mobile" value={student.fatherMobile} />
            <InfoField
              label="Father's Occupation"
              value={student.fatherOccupation}
            />
            <InfoField label="Mother's Name" value={student.motherName} />
            <InfoField label="Mother's Mobile" value={student.motherMobile} />
            {student.guardianName && (
              <>
                <InfoField
                  label="Guardian Name"
                  value={student.guardianName}
                />
                <InfoField
                  label="Guardian Mobile"
                  value={student.guardianMobile}
                />
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <InfoField
              label="Residential Address"
              value={student.residentialAddress}
            />
            <InfoField label="City" value={student.city} />
            <InfoField label="State" value={student.state} />
            <InfoField label="Pincode" value={student.pincode} />
            {student.permanentAddress && (
              <InfoField
                label="Permanent Address"
                value={student.permanentAddress}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Academic Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <InfoField
              label="Admission Date"
              value={student.admissionDate}
            />
            <InfoField label="Class" value={student.class} />
            <InfoField label="Section" value={student.section} />
            <InfoField label="Stream" value={student.stream} />
            <InfoField
              label="Previous School"
              value={student.previousSchool}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ─── Fees Tab ─── */
function FeesTab({ student }: { student: Student }) {
  const fees = student.fees;
  const tuitionFee = fees?.tuitionFee || [];
  const transportFee = fees?.transportFee || [];

  const tuitionTotal = tuitionFee.reduce((s, f) => s + f.amount, 0);
  const tuitionPaid = tuitionFee.reduce((s, f) => s + f.paid, 0);
  const tuitionDue = tuitionFee.reduce((s, f) => s + f.due, 0);

  const transportTotal = transportFee.reduce((s, f) => s + f.amount, 0);
  const transportPaid = transportFee.reduce((s, f) => s + f.paid, 0);
  const transportDue = transportFee.reduce((s, f) => s + f.due, 0);

  const formatCurrency = (val: number) =>
    val.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  return (
    <div className="grid gap-6 mt-4">
      {/* Fee Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Total Fees</p>
            <p className="text-2xl font-bold">
              {formatCurrency(tuitionTotal + transportTotal)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Total Paid</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(tuitionPaid + transportPaid)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Total Due</p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(tuitionDue + transportDue)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fee Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <InfoField label="Account Type" value={student.accountType} />
            <InfoField label="Schemes" value={student.schemes} />
            <InfoField label="Facilities" value={student.facilities} />
            <InfoField label="Route Hostel" value={student.routeHostel} />
            <InfoField label="Vehicle" value={student.vehicle} />
            <InfoField label="SMS Category" value={student.smsCategory} />
          </div>
        </CardContent>
      </Card>

      {/* Tuition Fee Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tuition Fee</CardTitle>
        </CardHeader>
        <CardContent>
          {tuitionFee.length > 0 ? (
            <FeeTable
              installments={tuitionFee}
              totalAmount={tuitionTotal}
              totalPaid={tuitionPaid}
              totalDue={tuitionDue}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              No tuition fee records.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Transport Fee Table */}
      {transportFee.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Transport Fee</CardTitle>
          </CardHeader>
          <CardContent>
            <FeeTable
              installments={transportFee}
              totalAmount={transportTotal}
              totalPaid={transportPaid}
              totalDue={transportDue}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function FeeTable({
  installments,
  totalAmount,
  totalPaid,
  totalDue,
}: {
  installments: FeeInstallment[];
  totalAmount: number;
  totalPaid: number;
  totalDue: number;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Installment</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Paid</TableHead>
          <TableHead className="text-right">Due</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {installments.map((fee) => (
          <TableRow key={fee.month}>
            <TableCell className="font-medium">{fee.month}</TableCell>
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
            {totalAmount.toLocaleString("en-IN")}
          </TableCell>
          <TableCell className="text-right">
            {totalPaid.toLocaleString("en-IN")}
          </TableCell>
          <TableCell className="text-right">
            {totalDue.toLocaleString("en-IN")}
          </TableCell>
          <TableCell />
        </TableRow>
      </TableBody>
    </Table>
  );
}

/* ─── Documents Tab ─── */
function DocumentsTab({ student }: { student: Student }) {
  return (
    <div className="mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {student.documents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {student.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-2 p-3 bg-muted rounded-md"
                >
                  <span className="text-sm truncate">{doc.name}</span>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {doc.type.replace("_", " ")}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No documents uploaded yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
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
