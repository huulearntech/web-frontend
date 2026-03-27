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
      const { startDate, endDate } = row.original;
      const start = new Date(startDate);
      const end = new Date(endDate);
      const opts: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const formattedStart = start.toLocaleDateString("en-US", opts);
      const formattedEnd = end.toLocaleDateString("en-US", opts);
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
      const colorForStatus: Record<BookingStatus, string> = {
        PENDING: "bg-yellow-100 text-yellow-700",
        COMPLETED: "bg-green-100 text-green-700",
        CANCELLED: "bg-red-100 text-red-700",
        CONFIRMED: "bg-blue-100 text-blue-700",
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

// {
//   id: "actions",
//   header: "Actions",
//   cell: ({ row }) => (
//     <DropdownMenu modal={false}>
//       <DropdownMenuTrigger asChild>
//         <Button size="sm" variant="ghost" aria-label="Open actions">
//           <MoreHorizontal className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => console.log("check-in", row.original.id)}>
//           <Check className="mr-2 h-4 w-4" />
//           Check-in
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => console.log("cancel", row.original.id)}>
//           <X className="mr-2 h-4 w-4" />
//           Cancel
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           onClick={async () => {
//             try {
//               await navigator.clipboard.writeText(row.original.id);
//               console.log("copied", row.original.id);
//             } catch (e) {
//               console.error(e);
//             }
//           }}
//         >
//           <Copy className="mr-2 h-4 w-4" />
//           Copy ID
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   ),
// },