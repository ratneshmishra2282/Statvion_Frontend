import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
      <h1 className="text-2xl font-bold mb-2">Something Went Wrong</h1>
      <p className="text-muted-foreground mb-6">
        An unexpected error occurred. Please try again later.
      </p>
      <Link href="/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  );
}
