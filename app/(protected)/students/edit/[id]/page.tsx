"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import {
  studentSchema,
  StudentFormData,
  STEP_LABELS,
} from "@/features/students/student.schema";
import {
  useStudent,
  useUpdateStudent,
} from "@/features/students/useStudents";
import { Student } from "@/features/students/student.types";
import MultiStepForm from "@/components/forms/MultiStepForm";
import BasicInfoStep from "@/components/forms/student-steps/BasicInfoStep";
import ParentDetailsStep from "@/components/forms/student-steps/ParentDetailsStep";
import AddressStep from "@/components/forms/student-steps/AddressStep";
import AcademicStep from "@/components/forms/student-steps/AcademicStep";
import FeeDetailsStep from "@/components/forms/student-steps/FeeDetailsStep";
import DocumentsStep from "@/components/forms/student-steps/DocumentsStep";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

const STEP_FIELDS: Record<number, string[]> = {
  0: [
    "firstName",
    "lastName",
    "gender",
    "dateOfBirth",
    "bloodGroup",
    "aadhaar",
    "religion",
    "category",
    "motherTongue",
  ],
  1: [
    "fatherName",
    "fatherMobile",
    "fatherOccupation",
    "motherName",
    "motherMobile",
    "guardianName",
    "guardianMobile",
  ],
  2: [
    "residentialAddress",
    "city",
    "state",
    "pincode",
    "permanentAddress",
  ],
  3: [
    "admissionNo",
    "admissionDate",
    "class",
    "section",
    "stream",
    "previousSchool",
  ],
  4: [
    "facilities",
    "routeHostel",
    "vehicle",
    "accountType",
    "schemes",
    "smsCategory",
    "feesMonth",
    "transportMonth",
  ],
  5: ["photo", "documents"],
};

function EditStudentForm({ student }: { student: Student }) {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const updateMutation = useUpdateStudent();

  const methods = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    mode: "onChange",
    defaultValues: {
      firstName: student.firstName || "",
      lastName: student.lastName || "",
      gender: student.gender || undefined,
      dateOfBirth: student.dateOfBirth || "",
      bloodGroup: student.bloodGroup || "",
      aadhaar: student.aadhaar || "",
      religion: student.religion || "",
      category: student.category?.toLowerCase() || "",
      motherTongue: student.motherTongue || "",
      fatherName: student.fatherName || "",
      fatherMobile: student.fatherMobile || "",
      fatherOccupation: student.fatherOccupation || "",
      motherName: student.motherName || "",
      motherMobile: student.motherMobile || "",
      guardianName: student.guardianName || "",
      guardianMobile: student.guardianMobile || "",
      residentialAddress: student.residentialAddress || "",
      city: student.city || "",
      state: student.state || "",
      pincode: student.pincode || "",
      permanentAddress: student.permanentAddress || "",
      admissionNo: student.admissionNo || "",
      admissionDate: student.admissionDate || "",
      class: student.class || "",
      section: student.section || "",
      stream: student.stream || "",
      previousSchool: student.previousSchool || "",
      facilities: student.facilities || "No",
      routeHostel: student.routeHostel || "No",
      vehicle: student.vehicle || "",
      accountType: student.accountType || "Single",
      schemes: student.schemes || "Regular-01-1",
      smsCategory: student.smsCategory || "",
      feesMonth: student.feesMonth || [
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December", "January", "February", "March",
      ],
      transportMonth: student.transportMonth || [
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December", "January", "February", "March",
      ],
      photo: undefined,
      documents: [],
    },
  });

  const { handleSubmit, trigger } = methods;

  const handleNext = async () => {
    const fieldsToValidate = STEP_FIELDS[currentStep];
    const isValid = await trigger(
      fieldsToValidate as (keyof StudentFormData)[]
    );
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEP_LABELS.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: StudentFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "photo" && value instanceof File) {
        formData.append("photo", value);
      } else if (key === "documents" && Array.isArray(value)) {
        value.forEach((file: File) => formData.append("documents", file));
      } else if (
        (key === "feesMonth" || key === "transportMonth") &&
        Array.isArray(value)
      ) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null && value !== "") {
        formData.append(key, String(value));
      }
    });

    updateMutation.mutate(
      { id: student.id, data: formData },
      {
        onSuccess: () => router.push(`/students/${student.id}`),
      }
    );
  };

  const stepComponents = [
    <BasicInfoStep key="basic" />,
    <ParentDetailsStep key="parent" />,
    <AddressStep key="address" />,
    <AcademicStep key="academic" />,
    <FeeDetailsStep key="feeDetails" />,
    <DocumentsStep key="documents" />,
  ];

  return (
    <Card>
      <CardContent className="p-4 md:p-6 pt-4 md:pt-6">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <MultiStepForm steps={STEP_LABELS} currentStep={currentStep}>
              {stepComponents[currentStep]}
            </MultiStepForm>

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                Previous
              </Button>

              {currentStep < STEP_LABELS.length - 1 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}

export default function EditStudentPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: student, isLoading, isError } = useStudent(id);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[500px] rounded-xl" />
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
        <Link href={`/students/${id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">Edit Student</h1>
      </div>

      <EditStudentForm student={student} />
    </div>
  );
}
