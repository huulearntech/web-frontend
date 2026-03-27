"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Copy, Edit, Ellipsis, Trash2 } from "lucide-react";
import { toast } from "sonner";

import type { RoomSerialized } from "@/lib/actions/hotel-manager/rooms";

export function createColumns(handleDelete: (id: string) => void): ColumnDef<RoomSerialized>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original.name ?? "Untitled",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => row.original.type ?? "—",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => row.original.price?.toString() ?? "—",
    },
    {
      accessorKey: "adultCapacity",
      header: "Adults",
      cell: ({ row }) => row.original.adultCapacity ?? "—",
    },
    {
      accessorKey: "childrenCapacity",
      header: "Children",
      cell: ({ row }) => row.original.childrenCapacity ?? "—",
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) =>
        Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(row.original.createdAt),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const r = row.original;
        return (
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" aria-label="Open actions">
                  <Ellipsis className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(r.id);
                    toast("Copied room ID to clipboard", { description: r.id });
                  }}
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy ID
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/rooms/${r.id}/edit`} className="flex items-center gap-2">
                    <Edit className="h-4 w-4" /> Edit
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleDelete(r.id)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}