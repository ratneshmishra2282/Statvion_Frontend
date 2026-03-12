"use client";

import { useState, useMemo } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useReceiptList } from "@/features/fees/useFees";
import { getPaymentHistoryColumns } from "@/components/tables/PaymentHistoryColumns";
import DataTable from "@/components/tables/DataTable";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, History } from "lucide-react";
import { PAGINATION } from "@/lib/constants";

export default function PaymentHistoryPage() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
  });

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useReceiptList({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: debouncedSearch || undefined,
  });

  const columns = useMemo(() => getPaymentHistoryColumns(), []);

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <History className="h-7 w-7 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold">Payment History</h1>
      </div>

      {/* Search Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <label className="text-sm font-medium mb-1.5 block">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Receipt No, Student Name, or Admission No"
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

      {/* Results Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment Records</CardTitle>
            {data?.meta.total !== undefined && (
              <span className="text-sm text-muted-foreground">
                {data.meta.total} record{data.meta.total !== 1 ? "s" : ""}
              </span>
            )}
          </div>
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
