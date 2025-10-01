import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Search } from "lucide-react";

export type SortDirection = "asc" | "desc";

export interface ColumnDef<T> {
  key: keyof T | string;
  header: React.ReactNode;
  width?: string | number;
  className?: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  accessor?: (row: T) => React.ReactNode;
}

export interface CommonListProps<T> {
  title?: string;
  description?: string;

  // Data
  rows: T[];
  columns: ColumnDef<T>[];

  // Identity and selection
  getRowId: (row: T) => string;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;

  // Search
  enableSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;

  // Sorting
  sortKey?: string;
  sortDirection?: SortDirection;
  onSortChange?: (key: string, direction: SortDirection) => void;

  // Pagination (controlled)
  totalItems: number;
  page: number; // 1-based
  pageSize: number;
  onPageChange: (nextPage: number) => void;

  // Toolbar actions
  renderToolbarActions?: (context: {
    selectedIds: string[];
    clearSelection: () => void;
  }) => React.ReactNode;

  // Row actions per-row (optional)
  renderRowActions?: (row: T) => React.ReactNode;

  // Empty state
  emptyState?: React.ReactNode;

  // Caption (optional)
  caption?: React.ReactNode;
}

export function CommonList<T>(props: CommonListProps<T>) {
  const {
    title,
    description,
    rows,
    columns,
    getRowId,
    selectable = true,
    onSelectionChange,
    enableSearch = true,
    searchPlaceholder = "Search...",
    searchValue,
    onSearchChange,
    sortKey,
    sortDirection,
    onSortChange,
    totalItems,
    page,
    pageSize,
    onPageChange,
    renderToolbarActions,
    renderRowActions,
    emptyState,
    caption,
  } = props;

  const [localSearch, setLocalSearch] = useState<string>(searchValue || "");
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLocalSearch(searchValue || "");
  }, [searchValue]);

  useEffect(() => {
    if (onSelectionChange) {
      const selectedIds = Object.keys(selected).filter((id) => selected[id]);
      onSelectionChange(selectedIds);
    }
  }, [selected, onSelectionChange]);

  const allIds = useMemo(() => rows.map(getRowId), [rows, getRowId]);
  const allSelected = useMemo(
    () => allIds.length > 0 && allIds.every((id) => selected[id]),
    [allIds, selected],
  );
  const someSelected = useMemo(
    () => allIds.some((id) => selected[id]) && !allSelected,
    [allIds, selected, allSelected],
  );

  const totalPages = Math.max(1, Math.ceil(totalItems / Math.max(1, pageSize)));

  const toggleAll = (checked: boolean) => {
    const next: Record<string, boolean> = {};
    if (checked) {
      for (const id of allIds) next[id] = true;
    }
    setSelected(next);
  };

  const toggleOne = (id: string, checked: boolean) => {
    setSelected((prev) => ({ ...prev, [id]: checked }));
  };

  const clearSelection = () => setSelected({});

  const handleSearchChange = (val: string) => {
    setLocalSearch(val);
    onSearchChange?.(val);
  };

  const handleSort = (key: string) => {
    if (!onSortChange) return;
    const nextDir: SortDirection = sortKey === key ? (sortDirection === "asc" ? "desc" : "asc") : "asc";
    onSortChange(key, nextDir);
  };

  return (
    <div className="space-y-4 bg-white p-3 rounded-2xl">
      {(title || description || enableSearch || renderToolbarActions) && (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            {title && <div className="text-base font-semibold leading-none tracking-tight text-black">{title}</div>}
            {description && <div className="text-sm text-black/50">{description}</div>}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {enableSearch && (
              <div className="relative w-full md:w-64">
                <Input
                  value={localSearch}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="pl-9 bg-[#1B3C53] text-white"
                />
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
              </div>
            )}
            {renderToolbarActions && (
              <div className="flex items-center gap-2">
                {renderToolbarActions({
                  selectedIds: Object.keys(selected).filter((id) => selected[id]),
                  clearSelection,
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-10">
                  <Checkbox
                  className="bg-white text-black-50"
                    checked={allSelected}
                    onCheckedChange={(v) => toggleAll(Boolean(v))}
                    aria-checked={someSelected ? "mixed" : allSelected}
                  />
                </TableHead>
              )}

              {columns.map((col) => {
                const key = String(col.key);
                const isSorted = sortKey === key;
                const dir = isSorted ? sortDirection : undefined;
                const canSort = col.sortable && !!onSortChange;
                return (
                  <TableHead key={key} className={cn("whitespace-nowrap", col.className)} style={{ width: col.width }}>
                    {canSort ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-2 px-2"
                        onClick={() => handleSort(key)}
                      >
                        <span className="mr-1 text-black">{col.header}</span>
                        {dir === "asc" && <ArrowUpNarrowWide className="h-4 w-4 text-black" />}
                        {dir === "desc" && <ArrowDownNarrowWide className="h-4 w-4 text-black" />}
                      </Button>
                    ) : (
                      col.header
                    )}
                  </TableHead>
                );
              })}

              {renderRowActions && <TableHead className="w-0" />}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={(columns.length + (selectable ? 1 : 0) + (renderRowActions ? 1 : 0)) as any}>
                  {emptyState || (
                    <div className="py-10 text-center text-sm text-black">No data found.</div>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => {
                const id = getRowId(row);
                return (
                  <TableRow key={id} data-state={selected[id] ? "selected" : undefined}>
                    {selectable && (
                      <TableCell className="w-10 text-black">
                        <Checkbox checked={!!selected[id]} onCheckedChange={(v) => toggleOne(id, Boolean(v))} />
                      </TableCell>
                    )}

                    {columns.map((col) => {
                      const key = String(col.key);
                      let content: React.ReactNode = null;
                      if (col.render) content = col.render(row);
                      else if (col.accessor) content = col.accessor(row);
                      else content = (row as any)[col.key as any] as React.ReactNode;
                      return (
                        <TableCell key={`${id}-${key}`} className={cn("whitespace-nowrap text-black", col.className)}>
                          {content}
                        </TableCell>
                      );
                    })}

                    {renderRowActions && <TableCell className="w-0">{renderRowActions(row)}</TableCell>}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-black bg-white">
        <div className="text-sm">
          {totalItems > 0 ? (
            <span>
              Showing {Math.min((page - 1) * pageSize + 1, totalItems)} -
              {" "}
              {Math.min(page * pageSize, totalItems)} of {totalItems}
            </span>
          ) : (
            <span>0 items</span>
          )}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); onPageChange(Math.max(1, page - 1)); }} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  className="bg-white"
                  isActive={p === page}
                  onClick={(e) => { e.preventDefault(); onPageChange(p); }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" onClick={(e) => { e.preventDefault(); onPageChange(Math.min(totalPages, page + 1)); }} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default CommonList;


