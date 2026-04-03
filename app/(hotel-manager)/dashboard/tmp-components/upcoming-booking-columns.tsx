"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import { Copy, Check, X } from "lucide-react";

import type { UpcomingBooking } from "@/lib/actions/hotel-manager/bookings";

export const columns: ColumnDef<UpcomingBooking>[] = [
  {
    accessorKey: "guestName",
    header: "Guest",
    cell: ({ row }) => <div className="text-sm font-medium text-slate-900">{row.original.user.name}</div>,
  },
  {
    accessorKey: "roomNumber",
    header: "Room",
  },
  {
    accessorKey: "checkInDate",
    header: "Check-in",
    cell: ({ row }) => (
      <div className="text-sm">{new Intl.DateTimeFormat(
        'en-US',
        {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }
      ).format(row.original.checkInDate)}
      </div>
    ),
  },
  {
    accessorKey: "checkOutDate",
    header: "Check-out",
    cell: ({ row }) => (
      <div className="text-sm">{new Intl.DateTimeFormat(
        'en-US',
        {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }
      ).format(row.original.checkOutDate)}
      </div>
    ),
  },
  // {
  //   id: "nights",
  //   header: "Nights",
  //   cell: ({ row }) => <div className="text-sm">{daysBetweenUTC(row.original.checkIn, row.original.checkOut)}</div>,
  // },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ row }) => <div className="text-sm font-medium">{row.original.totalPrice}</div>,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = row.original.status;
      const cls =
        s === "COMPLETED"
          ? "bg-green-100 text-green-800"
          : s === "CANCELLED"
            ? "bg-red-100 text-red-800"
            : "bg-yellow-100 text-yellow-800";
      return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${cls}`}>{s.replace("_", " ")}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost" aria-label="Open actions">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => console.log("check-in", row.original.id)}>
            <Check className="mr-2 h-4 w-4" />
            Check-in
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("cancel", row.original.id)}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(row.original.id);
                console.log("copied", row.original.id);
              } catch (e) {
                console.error(e);
              }
            }}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
