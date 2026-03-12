import { z } from "zod";

// Step 1: Basic Info
export const basicInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female", "other"], {
    message: "Gender is required",
  }),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  bloodGroup: z.string().optional(),
  aadhaar: z
    .string()
    .regex(/^\d{12}$/, "Aadhaar must be 12 digits")
    .optional()
    .or(z.literal("")),
  religion: z.string().optional(),
  category: z.string().optional(),
  motherTongue: z.string().optional(),
});

// Step 2: Parent Details
export const parentDetailsSchema = z.object({
  fatherName: z.string().min(2, "Father's name is required"),
  fatherMobile: z.string().regex(/^\d{10}$/, "Mobile must be 10 digits"),
  fatherOccupation: z.string().optional(),
  motherName: z.string().min(2, "Mother's name is required"),
  motherMobile: z
    .string()
    .regex(/^\d{10}$/, "Mobile must be 10 digits")
    .optional()
    .or(z.literal("")),
  guardianName: z.string().optional(),
  guardianMobile: z
    .string()
    .regex(/^\d{10}$/, "Mobile must be 10 digits")
    .optional()
    .or(z.literal("")),
});

// Step 3: Address
export const addressSchema = z.object({
  residentialAddress: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  permanentAddress: z.string().optional(),
});

// Step 4: Academic Details
export const academicSchema = z.object({
  admissionNo: z.string().optional(),
  admissionDate: z.string().min(1, "Admission date is required"),
  class: z.string().min(1, "Class is required"),
  section: z.string().min(1, "Section is required"),
  stream: z.string().optional(),
  previousSchool: z.string().optional(),
});

// Step 5: Fee Details
export const feeDetailsSchema = z.object({
  facilities: z.string().optional(),
  routeHostel: z.string().optional(),
  vehicle: z.string().optional(),
  accountType: z.string().optional(),
  schemes: z.string().optional(),
  smsCategory: z.string().optional(),
  feesMonth: z.array(z.string()).optional(),
  transportMonth: z.array(z.string()).optional(),
});

// Step 6: Documents
export const documentsSchema = z.object({
  photo: z.any().optional(),
  documents: z.array(z.any()).optional(),
});

// Combined schema
export const studentSchema = basicInfoSchema
  .merge(parentDetailsSchema)
  .merge(addressSchema)
  .merge(academicSchema)
  .merge(feeDetailsSchema)
  .merge(documentsSchema);

export type BasicInfoFormData = z.infer<typeof basicInfoSchema>;
export type ParentDetailsFormData = z.infer<typeof parentDetailsSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type AcademicFormData = z.infer<typeof academicSchema>;
export type FeeDetailsFormData = z.infer<typeof feeDetailsSchema>;
export type DocumentsFormData = z.infer<typeof documentsSchema>;
export type StudentFormData = z.infer<typeof studentSchema>;

export const STEP_SCHEMAS = [
  basicInfoSchema,
  parentDetailsSchema,
  addressSchema,
  academicSchema,
  feeDetailsSchema,
  documentsSchema,
] as const;

export const STEP_LABELS = [
  "Basic Info",
  "Parent Details",
  "Address",
  "Academic",
  "Fee Details",
  "Documents",
] as const;
