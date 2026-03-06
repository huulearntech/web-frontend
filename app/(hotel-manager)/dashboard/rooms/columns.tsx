"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Copy, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

import type { Room } from "@/lib/generated/prisma/client";

type RoomSerialized = Omit<Room, "price"> & { price: string };

export function createColumns(
  handleDelete: (id: string) => void,
): ColumnDef<RoomSerialized>[] {
  return [
    // {
    //   accessorKey: "name",
    //   header: "Room",
    //   cell: (info) => info.getValue() ?? "Untitled",
    // },
    {
      accessorKey: "type",
      header: "Type",
      cell: (info) => info.getValue() ?? "—",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: (info) => info.getValue() ?? "—",
    },
    {
      accessorKey: "adultCapacity",
      header: "Adult Capacity",
      cell: (info) => info.getValue() ?? "—",
    },
    {
      accessorKey: "childrenCapacity",
      header: "Children Capacity",
      cell: (info) => info.getValue() ?? "—",
    },
    // {
    //   accessorKey: "isAvailable",
    //   header: "Status",
    //   cell: (info) => {
    //     const val = info.getValue() as boolean | null;
    //     return (
    //       <Badge variant={val ? "outline" : "secondary"}>
    //         {val ? "Available" : "Unavailable"}
    //       </Badge>
    //     );
    //   },
    // },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: (info) => format(new Date(info.getValue() as string), "PPP"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const r = row.original as RoomSerialized;
        return (
          <div className="flex justify-end items-center gap-2">
            <Button size="sm" variant="outline" className="p-2"
              onClick={() => {
                navigator.clipboard.writeText(r.id);
                toast("Copied room ID to clipboard", {
                  description: r.id,
                });
              }}
            >
              <Copy className="h-4 w-4" />
              Copy ID
            </Button>

            <Link href={`/dashboard/rooms/${r.id}/edit`}>
              <Button size="sm" variant="ghost" className="p-2">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>

            <Button
              size="sm"
              variant="ghost"
              className="p-2 text-destructive"
              onClick={() => handleDelete(r.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}