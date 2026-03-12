"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Student } from "@/features/students/student.types";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function getStudentColumns(): ColumnDef<Student>[] {
  return [
    {
      id: "photo",
      header: "Photo",
      cell: ({ row }) => (
        <Avatar className="h-8 w-8">
          {row.original.photoUrl ? (
            <AvatarImage src={row.original.photoUrl} alt={row.original.firstName} />
          ) : null}
          <AvatarFallback className="text-xs">
            {row.original.firstName.charAt(0)}
            {row.original.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: "admissionNo",
      header: "Admission No",
    },
    {
      id: "name",
      header: "Name",
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      accessorKey: "class",
      header: "Class",
    },
    {
      accessorKey: "section",
      header: "Section",
    },
    {
      accessorKey: "fatherMobile",
      header: "Mobile",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Link href={`/students/${row.original.id}`}>
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/students/edit/${row.original.id}`}>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ),
    },
  ];
}
