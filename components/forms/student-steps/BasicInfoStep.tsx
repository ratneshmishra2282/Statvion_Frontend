"use client";

import { useFormContext } from "react-hook-form";
import { StudentFormData } from "@/features/students/student.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function BasicInfoStep() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<StudentFormData>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">Full Name (First) *</Label>
        <Input id="firstName" {...register("firstName")} />
        {errors.firstName && (
          <p className="text-sm text-destructive">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name *</Label>
        <Input id="lastName" {...register("lastName")} />
        {errors.lastName && (
          <p className="text-sm text-destructive">
            {errors.lastName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Gender *</Label>
        <Select
          value={watch("gender") || ""}
          onValueChange={(v) =>
            setValue("gender", v as "male" | "female" | "other", { shouldValidate: true })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.gender && (
          <p className="text-sm text-destructive">{errors.gender.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
        <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
        {errors.dateOfBirth && (
          <p className="text-sm text-destructive">
            {errors.dateOfBirth.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Blood Group</Label>
        <Select
          value={watch("bloodGroup") || ""}
          onValueChange={(v) => setValue("bloodGroup", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select blood group" />
          </SelectTrigger>
          <SelectContent>
            {BLOOD_GROUPS.map((bg) => (
              <SelectItem key={bg} value={bg}>
                {bg}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="aadhaar">Aadhaar Number</Label>
        <Input
          id="aadhaar"
          placeholder="12-digit Aadhaar"
          {...register("aadhaar")}
        />
        {errors.aadhaar && (
          <p className="text-sm text-destructive">{errors.aadhaar.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="religion">Religion</Label>
        <Input id="religion" {...register("religion")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={watch("category") || ""}
          onValueChange={(v) => setValue("category", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="obc">OBC</SelectItem>
            <SelectItem value="sc">SC</SelectItem>
            <SelectItem value="st">ST</SelectItem>
            <SelectItem value="ews">EWS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="motherTongue">Mother Tongue</Label>
        <Input id="motherTongue" {...register("motherTongue")} />
      </div>
    </div>
  );
}
