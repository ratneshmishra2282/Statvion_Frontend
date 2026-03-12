"use client";

import { useFormContext } from "react-hook-form";
import { StudentFormData } from "@/features/students/student.schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MONTHS = [
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
];

const ACCOUNT_TYPES = ["Single", "Sibling", "Staff", "RTE"];
const SCHEMES = [
  "Regular-01-1",
  "Regular-01-2",
  "Regular-02-1",
  "Regular-02-2",
];

export default function FeeDetailsStep() {
  const { setValue, watch } = useFormContext<StudentFormData>();

  const feesMonth = watch("feesMonth") || [];
  const transportMonth = watch("transportMonth") || [];

  const toggleMonth = (
    field: "feesMonth" | "transportMonth",
    month: string,
    currentValues: string[]
  ) => {
    const updated = currentValues.includes(month)
      ? currentValues.filter((m) => m !== month)
      : [...currentValues, month];
    setValue(field, updated);
  };

  const toggleAll = (
    field: "feesMonth" | "transportMonth",
    currentValues: string[]
  ) => {
    if (currentValues.length === MONTHS.length) {
      setValue(field, []);
    } else {
      setValue(field, [...MONTHS]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Fee Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Facilities</Label>
            <Select
              value={watch("facilities") || "No"}
              onValueChange={(v) => setValue("facilities", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Route Hostel</Label>
            <Select
              value={watch("routeHostel") || "No"}
              onValueChange={(v) => setValue("routeHostel", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicle">Vehicle</Label>
            <Input
              id="vehicle"
              placeholder="Select vehicle"
              value={watch("vehicle") || ""}
              onChange={(e) => setValue("vehicle", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Account Type</Label>
            <Select
              value={watch("accountType") || "Single"}
              onValueChange={(v) => setValue("accountType", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Schemes *</Label>
            <Select
              value={watch("schemes") || "Regular-01-1"}
              onValueChange={(v) => setValue("schemes", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select scheme" />
              </SelectTrigger>
              <SelectContent>
                {SCHEMES.map((scheme) => (
                  <SelectItem key={scheme} value={scheme}>
                    {scheme}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="smsCategory">SMS Category</Label>
            <Input
              id="smsCategory"
              placeholder="Enter SMS category"
              value={watch("smsCategory") || ""}
              onChange={(e) => setValue("smsCategory", e.target.value)}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Fees Month */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Fees Month</h3>
          <button
            type="button"
            className="text-sm text-primary hover:underline"
            onClick={() => toggleAll("feesMonth", feesMonth)}
          >
            {feesMonth.length === MONTHS.length ? "Deselect All" : "Select All"}
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {MONTHS.map((month) => (
            <label
              key={`fee-${month}`}
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <Checkbox
                checked={feesMonth.includes(month)}
                onCheckedChange={() =>
                  toggleMonth("feesMonth", month, feesMonth)
                }
              />
              <span className="text-sm">{month}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Transport Month */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Transport Month</h3>
          <button
            type="button"
            className="text-sm text-primary hover:underline"
            onClick={() => toggleAll("transportMonth", transportMonth)}
          >
            {transportMonth.length === MONTHS.length
              ? "Deselect All"
              : "Select All"}
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {MONTHS.map((month) => (
            <label
              key={`transport-${month}`}
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <Checkbox
                checked={transportMonth.includes(month)}
                onCheckedChange={() =>
                  toggleMonth("transportMonth", month, transportMonth)
                }
              />
              <span className="text-sm">{month}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
