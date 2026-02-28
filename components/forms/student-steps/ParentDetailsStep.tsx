"use client";

import { useFormContext } from "react-hook-form";
import { StudentFormData } from "@/features/students/student.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function ParentDetailsStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<StudentFormData>();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Father&apos;s Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fatherName">Father&apos;s Name *</Label>
            <Input id="fatherName" {...register("fatherName")} />
            {errors.fatherName && (
              <p className="text-sm text-destructive">
                {errors.fatherName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="fatherMobile">Father&apos;s Mobile *</Label>
            <Input
              id="fatherMobile"
              placeholder="10-digit mobile"
              {...register("fatherMobile")}
            />
            {errors.fatherMobile && (
              <p className="text-sm text-destructive">
                {errors.fatherMobile.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="fatherOccupation">Occupation</Label>
            <Input
              id="fatherOccupation"
              {...register("fatherOccupation")}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Mother&apos;s Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="motherName">Mother&apos;s Name *</Label>
            <Input id="motherName" {...register("motherName")} />
            {errors.motherName && (
              <p className="text-sm text-destructive">
                {errors.motherName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="motherMobile">Mother&apos;s Mobile</Label>
            <Input
              id="motherMobile"
              placeholder="10-digit mobile"
              {...register("motherMobile")}
            />
            {errors.motherMobile && (
              <p className="text-sm text-destructive">
                {errors.motherMobile.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">
          Guardian Details (Optional)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="guardianName">Guardian Name</Label>
            <Input id="guardianName" {...register("guardianName")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guardianMobile">Guardian Mobile</Label>
            <Input
              id="guardianMobile"
              placeholder="10-digit mobile"
              {...register("guardianMobile")}
            />
            {errors.guardianMobile && (
              <p className="text-sm text-destructive">
                {errors.guardianMobile.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
