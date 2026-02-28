"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PaginationState } from "@tanstack/react-table";
import { useStudentList } from "@/features/students/useStudents";
import { getStudentColumns } from "@/components/tables/StudentColumns";
import DataTable from "@/components/tables/DataTable";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppSelector } from "@/store/hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { PAGINATION } from "@/lib/constants";

export default function StudentsPage() {
  const router = useRouter();
  const academicYear = useAppSelector(
    (state) => state.ui.selectedAcademicYear
  );

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
  });

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useStudentList({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: debouncedSearch || undefined,
    class: classFilter || undefined,
    academicYear,
  });

  const columns = useMemo(() => getStudentColumns(), []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <Button onClick={() => router.push("/students/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            }}
            className="pl-10"
          />
        </div>
        <Select
          value={classFilter || "all"}
          onValueChange={(v) => {
            setClassFilter(v === "all" ? "" : v);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Classes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {Array.from({ length: 12 }, (_, i) => (
              <SelectItem key={i + 1} value={String(i + 1)}>
                Class {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        pageCount={data?.meta.totalPages ?? 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        isLoading={isLoading}
      />
    </div>
  );
}
