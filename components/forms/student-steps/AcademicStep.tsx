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

const SECTIONS = ["A", "B", "C", "D", "E"];
const STREAMS = ["Science", "Commerce", "Arts", "N/A"];

export default function AcademicStep() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<StudentFormData>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="admissionNo">Admission No (Auto)</Label>
        <Input
          id="admissionNo"
          placeholder="Auto-generated"
          {...register("admissionNo")}
          disabled
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="admissionDate">Admission Date *</Label>
        <Input
          id="admissionDate"
          type="date"
          {...register("admissionDate")}
        />
        {errors.admissionDate && (
          <p className="text-sm text-destructive">
            {errors.admissionDate.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Class *</Label>
        <Select
          value={watch("class") || ""}
          onValueChange={(v) =>
            setValue("class", v, { shouldValidate: true })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => (
              <SelectItem key={i + 1} value={String(i + 1)}>
                Class {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.class && (
          <p className="text-sm text-destructive">{errors.class.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Section *</Label>
        <Select
          value={watch("section") || ""}
          onValueChange={(v) =>
            setValue("section", v, { shouldValidate: true })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            {SECTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.section && (
          <p className="text-sm text-destructive">
            {errors.section.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Stream</Label>
        <Select
          value={watch("stream") || ""}
          onValueChange={(v) => setValue("stream", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select stream" />
          </SelectTrigger>
          <SelectContent>
            {STREAMS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="previousSchool">Previous School</Label>
        <Input id="previousSchool" {...register("previousSchool")} />
      </div>
    </div>
  );
}
