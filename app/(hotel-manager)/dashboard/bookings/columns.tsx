"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowRight, MoreHorizontal } from "lucide-react"

import type { BookingSerialized } from "@/lib/actions/hotel-manager/bookings"
import { BookingStatus } from "@/lib/generated/prisma/enums"

export const columns: ColumnDef<BookingSerialized>[] = [
  {
    id: "userName",
    accessorFn: (row) => row.user.name,
    header: "Customer",
  },
  {
    accessorKey: "roomNumber",
    header: "Room",
  },
  {
    id: "checkInOut",
    header: () => <div className="inline-flex gap-1 items-center">Check-in <ArrowRight className="size-4" /> Check-out</div>,
    cell: ({ row }) => {
      const { checkInDate, checkOutDate } = row.original;
      const opts: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const formattedStart = checkInDate.toLocaleDateString("en-US", opts);
      const formattedEnd = checkOutDate.toLocaleDateString("en-US", opts);
      return <div className="inline-flex gap-1 items-center">
        {formattedStart}
        <ArrowRight className="size-4" />
        {formattedEnd}
      </div>;
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return (
        <div className="text-right font-medium"> {formatted} </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return formatted;
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const colorForStatus: Record<Exclude<BookingStatus, "DRAFT">, string> = {
        PENDING: "bg-yellow-100 text-yellow-700",
        COMPLETED: "bg-blue-100 text-blue-700",
        CANCELLED: "bg-red-100 text-red-700",
        CONFIRMED: "bg-green-100 text-green-700",
      } as const;
      const status = row.original.status;
      const cls = colorForStatus[status] || "bg-gray-100 text-gray-700";
      return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${cls}`}>{status.replace("_", " ")}</span>;
    }
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const booking = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-xs text-secondary-foreground">Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(booking.id)}
            >
              Copy booking ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View booking details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]