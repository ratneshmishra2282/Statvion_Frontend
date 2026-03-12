"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FeeReceipt } from "@/features/fees/fee.types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import Link from "next/link";

export function getPaymentHistoryColumns(): ColumnDef<FeeReceipt>[] {
  return [
    {
      accessorKey: "receiptNo",
      header: "Receipt No",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.receiptNo}</span>
      ),
    },
    {
      accessorKey: "studentName",
      header: "Student Name",
    },
    {
      accessorKey: "class",
      header: "Class",
    },
    {
      id: "paymentDate",
      header: "Date",
      accessorFn: (row) => {
        try {
          return new Date(row.paymentDate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        } catch {
          return row.paymentDate;
        }
      },
    },
    {
      accessorKey: "installment",
      header: "Installment",
    },
    {
      id: "totalPaid",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.totalPaid.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          })}
        </span>
      ),
    },
    {
      id: "paymentMode",
      header: "Mode",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={
            row.original.paymentMode === "Cash"
              ? "border-green-500 text-green-700"
              : row.original.paymentMode === "UPI"
                ? "border-blue-500 text-blue-700"
                : "border-gray-500 text-gray-700"
          }
        >
          {row.original.paymentMode}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <Link href={`/fees/receipt/${row.original.id}`}>
          <Button variant="outline" size="sm">
            <Eye className="mr-1 h-4 w-4" />
            View
          </Button>
        </Link>
      ),
    },
  ];
}
