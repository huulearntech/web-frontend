"use client"

// FIXME: table.nextPage can go next even if there is no next page.
import { useState } from "react"

import { Button } from "./ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "./ui/pagination"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { type Table as TableType } from "@tanstack/react-table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  })

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}

// TODO: mimic shadcn's style or somehow use shadcn component
function DataTablePagination<TData>({ table } : { table: TableType<TData> }) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            isActive={table.getCanPreviousPage()}
            onClick={table.previousPage}
          />
        </PaginationItem>
        {
          totalPages <= 7 ? (
            Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                // TODO: this should only have the appearance of link, not need to have href
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => table.setPageIndex(index)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))
          ) : (
            <>
              {
                currentPage >= 4 &&
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
              }
              {
                currentPage >= 5 &&
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              }
              {
                currentPage >= 3 &&
                <PaginationItem>
                  <PaginationLink href="#">{currentPage - 1}</PaginationLink>
                </PaginationItem>
              }
              {
                <PaginationItem>
                  <PaginationLink href="#" isActive>{currentPage}</PaginationLink>
                </PaginationItem>
              }
              {
                currentPage <= totalPages - 2 &&
                <PaginationItem>
                  <PaginationLink href="#">{currentPage + 1}</PaginationLink>
                </PaginationItem>
              }
              {
                currentPage <= totalPages - 3 &&
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              }
              {
                currentPage < totalPages &&
                <PaginationItem>
                  <PaginationLink href="#">{totalPages}</PaginationLink>
                </PaginationItem>
              }
            </>
          )}
        <PaginationItem>
          <PaginationNext
            href="#"
            isActive={table.getCanNextPage()}
            onClick={table.nextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}