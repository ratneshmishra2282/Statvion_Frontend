"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  studentSchema,
  StudentFormData,
  STEP_LABELS,
} from "@/features/students/student.schema";
import { useCreateStudent } from "@/features/students/useStudents";
import MultiStepForm from "@/components/forms/MultiStepForm";
import BasicInfoStep from "@/components/forms/student-steps/BasicInfoStep";
import ParentDetailsStep from "@/components/forms/student-steps/ParentDetailsStep";
import AddressStep from "@/components/forms/student-steps/AddressStep";
import AcademicStep from "@/components/forms/student-steps/AcademicStep";
import FeeDetailsStep from "@/components/forms/student-steps/FeeDetailsStep";
import DocumentsStep from "@/components/forms/student-steps/DocumentsStep";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

export default function AddStudentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const createMutation = useCreateStudent();

  const methods = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      dateOfBirth: "",
      bloodGroup: "",
      aadhaar: "",
      religion: "",
      category: "",
      motherTongue: "",
      fatherName: "",
      fatherMobile: "",
      fatherOccupation: "",
      motherName: "",
      motherMobile: "",
      guardianName: "",
      guardianMobile: "",
      residentialAddress: "",
      city: "",
      state: "",
      pincode: "",
      permanentAddress: "",
      admissionNo: "",
      admissionDate: "",
      class: "",
      section: "",
      stream: "",
      previousSchool: "",
      facilities: "No",
      routeHostel: "No",
      vehicle: "",
      accountType: "Single",
      schemes: "Regular-01-1",
      smsCategory: "",
      feesMonth: [
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December", "January", "February", "March",
      ],
      transportMonth: [
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
    const isValid = await trigger(fieldsToValidate as (keyof StudentFormData)[]);
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

    createMutation.mutate(formData, {
      onSuccess: () => router.push("/students"),
    });
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
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/students">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">Add Student</h1>
      </div>

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
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
