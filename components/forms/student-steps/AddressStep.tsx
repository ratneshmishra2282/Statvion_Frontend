"use client";

import { useFormContext } from "react-hook-form";
import { StudentFormData } from "@/features/students/student.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddressStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<StudentFormData>();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Residential Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="residentialAddress">Address *</Label>
            <Input
              id="residentialAddress"
              {...register("residentialAddress")}
            />
            {errors.residentialAddress && (
              <p className="text-sm text-destructive">
                {errors.residentialAddress.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input id="city" {...register("city")} />
            {errors.city && (
              <p className="text-sm text-destructive">
                {errors.city.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Input id="state" {...register("state")} />
            {errors.state && (
              <p className="text-sm text-destructive">
                {errors.state.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode *</Label>
            <Input id="pincode" placeholder="6-digit pincode" {...register("pincode")} />
            {errors.pincode && (
              <p className="text-sm text-destructive">
                {errors.pincode.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">
          Permanent Address (if different)
        </h3>
        <div className="space-y-2">
          <Label htmlFor="permanentAddress">Permanent Address</Label>
          <Input
            id="permanentAddress"
            {...register("permanentAddress")}
          />
        </div>
      </div>
    </div>
  );
}
