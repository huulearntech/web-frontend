/* Client-side interactive table for actions (delete, edit, refresh) */
"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";

type RoomFromServer = {
  id: string;
  name: string | null;
  slug?: string | null;
  type?: string | null;
  price?: number | null;
  capacity?: number | null;
  isAvailable?: boolean | null;
  createdAt: string;
};

export default function TableWrapper({ rooms }: { rooms: RoomFromServer[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [rows, setRows] = useState<RoomFromServer[]>(rooms);

  async function handleDelete(id: string) {
    if (!confirm("Delete this room? This action cannot be undone.")) return;
    try {
      setLoadingId(id);
      const res = await fetch(`/api/rooms/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message ?? "Failed to delete");
      }
      setRows((prev) => prev.filter((r) => r.id !== id));
      router.refresh();
    } catch (err: any) {
      alert(err?.message ?? "An error occurred");
    } finally {
      setLoadingId(null);
    }
  }

  function currency(n?: number | null) {
    if (n == null) return "-";
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);
  }

  const columns: ColumnDef<RoomFromServer, any>[] = [
    {
      accessorKey: "name",
      header: "Room",
      cell: (info) => info.getValue() ?? "Untitled",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: (info) => info.getValue() ?? "—",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: (info) => currency(info.getValue() as number | null),
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
      cell: (info) => info.getValue() ?? "—",
    },
    {
      accessorKey: "isAvailable",
      header: "Status",
      cell: (info) => {
        const val = info.getValue() as boolean | null;
        return (
          <Badge variant={val ? "outline" : "secondary"}>
            {val ? "Available" : "Unavailable"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: (info) => format(new Date(info.getValue() as string), "PPP"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const r = row.original as RoomFromServer;
        return (
          <div className="flex justify-end items-center gap-2">
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
              disabled={loadingId === r.id}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Card>
      <CardContent>
          <DataTable columns={columns} data={rows} />
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {rows.length} room{rows.length !== 1 ? "s" : ""}.
          </div>
      </CardContent>
    </Card>
  );
}