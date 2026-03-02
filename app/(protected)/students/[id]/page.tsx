"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useStudent } from "@/features/students/useStudents";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";

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
        <Badge
          variant={student.status === "active" ? "default" : "secondary"}
          className="ml-auto"
        >
          {student.status}
        </Badge>
      </div>

      <div className="grid gap-6">
        {/* Basic Info */}
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

        {/* Parent Details */}
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

        {/* Address */}
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

        {/* Academic Details */}
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

        {/* Documents */}
        {student.documents.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

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
