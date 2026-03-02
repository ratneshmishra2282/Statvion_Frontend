"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface MultiStepFormProps {
  steps: readonly string[];
  currentStep: number;
  children: React.ReactNode;
}

export default function MultiStepForm({
  steps,
  currentStep,
  children,
}: MultiStepFormProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
        {steps.map((label, index) => (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium border-2 transition-colors flex-shrink-0",
                  index < currentStep
                    ? "bg-primary text-primary-foreground border-primary"
                    : index === currentStep
                      ? "border-primary text-primary"
                      : "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-1 whitespace-nowrap hidden sm:block",
                  index <= currentStep
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-[2px] w-6 sm:w-12 lg:w-20 mx-1 sm:mx-2 flex-shrink-0",
                  index < currentStep ? "bg-primary" : "bg-muted-foreground/30"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div>{children}</div>
    </div>
  );
}
