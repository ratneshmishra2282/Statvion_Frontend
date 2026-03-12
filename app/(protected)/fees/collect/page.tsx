"use client";

import { useState, useMemo } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useStudentList } from "@/features/students/useStudents";
import { getFeeCollectColumns } from "@/components/tables/FeeCollectColumns";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { PAGINATION } from "@/lib/constants";

export default function CollectFeePage() {
  const academicYear = useAppSelector(
    (state) => state.ui.selectedAcademicYear
  );

  const [searchBy, setSearchBy] = useState("name");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
  });

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useStudentList({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: debouncedSearch || undefined,
    academicYear,
  });

  const columns = useMemo(() => getFeeCollectColumns(), []);

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Collect Fee</h1>
      </div>

      {/* Search Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Student</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-4">
            {/* Search By Dropdown */}
            <div className="w-full sm:w-[180px]">
              <label className="text-sm font-medium mb-1.5 block">
                Search By
              </label>
              <Select value={searchBy} onValueChange={setSearchBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Student Name</SelectItem>
                  <SelectItem value="admissionNo">Admission No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Input */}
            <div className="flex-1">
              <label className="text-sm font-medium mb-1.5 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={
                    searchBy === "name"
                      ? "Enter Student Name"
                      : "Enter Admission No"
                  }
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                  }}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Search Button */}
            <Button className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data?.data ?? []}
            pageCount={data?.meta.totalPages ?? 0}
            pagination={pagination}
            onPaginationChange={setPagination}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
