"use client";

import { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { StudentFormData } from "@/features/students/student.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Upload } from "lucide-react";
import Image from "next/image";

export default function DocumentsStep() {
  const { setValue, watch } = useFormContext<StudentFormData>();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [docPreviews, setDocPreviews] = useState<
    { name: string; size: string }[]
  >([]);

  const handlePhotoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setValue("photo", file, { shouldValidate: true });
        const reader = new FileReader();
        reader.onloadend = () => setPhotoPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    },
    [setValue]
  );

  const handleDocumentsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const existing = (watch("documents") as File[]) || [];
      const updated = [...existing, ...files];
      setValue("documents", updated, { shouldValidate: true });
      setDocPreviews(
        updated.map((f) => ({
          name: f.name,
          size: `${(f.size / 1024).toFixed(1)} KB`,
        }))
      );
    },
    [setValue, watch]
  );

  const removeDocument = useCallback(
    (index: number) => {
      const existing = (watch("documents") as File[]) || [];
      const updated = existing.filter((_, i) => i !== index);
      setValue("documents", updated);
      setDocPreviews((prev) => prev.filter((_, i) => i !== index));
    },
    [setValue, watch]
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Student Photo</Label>
        <div className="flex items-start gap-4">
          <div>
            <Input type="file" accept="image/*" onChange={handlePhotoChange} />
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG or GIF. Max 2MB.
            </p>
          </div>
          {photoPreview && (
            <div className="relative w-24 h-24 rounded-md overflow-hidden border">
              <Image
                src={photoPreview}
                alt="Photo preview"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          Documents (Birth Certificate, Aadhaar, TC, Marksheet, Caste
          Certificate)
        </Label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Click to upload or drag and drop
          </p>
          <Input
            type="file"
            multiple
            onChange={handleDocumentsChange}
            className="max-w-xs mx-auto"
          />
        </div>

        {docPreviews.length > 0 && (
          <div className="mt-4 space-y-2">
            {docPreviews.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-muted p-3 rounded-md"
              >
                <span className="text-sm truncate flex-1">
                  {doc.name} ({doc.size})
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDocument(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
