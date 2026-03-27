"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";


/* ----------------------------- TaskList ---------------------------- */
type Task = {
  id: string;
  title: string;
  time: string;
  level: "info" | "warning" | "critical";
};

const sampleTasks: Task[] = [
  { id: "a1", title: "Room 204 needs turndown service", time: "2h ago", level: "info" },
  { id: "a2", title: "Low housekeeping staff on 3rd floor", time: "4h ago", level: "warning" },
  { id: "a3", title: "Water leak reported - kitchen", time: "6h ago", level: "critical" },
];

export function TaskList({ tasks = sampleTasks }: {tasks?: Task[] }) {
  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "level",
      header: "",
      cell: ({ row }) => {
        const color = row.original.level === "critical" ? "bg-red-500" : row.original.level === "warning" ? "bg-yellow-500" : "bg-sky-500";
        return <span className={`inline-block h-3 w-3 rounded-full ${color}`} aria-hidden />;
      },
      size: 32,
    },
    {
      accessorKey: "title",
      header: "Alert",
      cell: ({ row }) => (
        <div className="text-sm font-medium text-slate-900">{row.original.title}</div>
      ),
    },
    {
      accessorKey: "time",
      header: "When",
      cell: ({ row }) => <div className="text-xs text-slate-400">{row.original.time}</div>,
    },
  ];

  return (
    <DataTable columns={columns} data={tasks} />
  );
};

/* -------------------------- RoomStatusBoard -------------------------- */
type RoomStatus = "occupied" | "vacant" | "cleaning" | "maintenance";

type Room = {
  number: string;
  type?: string;
  status: RoomStatus;
};

const sampleRooms: Room[] = [
  { number: "101", type: "Queen", status: "occupied" },
  { number: "102", type: "King", status: "vacant" },
  { number: "103", type: "Twin", status: "cleaning" },
  { number: "104", type: "Queen", status: "occupied" },
  { number: "201", type: "King", status: "maintenance" },
  { number: "202", type: "Queen", status: "vacant" },
];

export const RoomStatusBoard: React.FC<{ rooms?: Room[] }> = ({ rooms = sampleRooms }) => {
  const statusColor = (s: RoomStatus) =>
    s === "occupied" ? "bg-red-100 text-red-700" : s === "vacant" ? "bg-green-100 text-green-700" : s === "cleaning" ? "bg-yellow-100 text-yellow-700" : "bg-slate-100 text-slate-700";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {rooms.map((r) => (
        <Card key={r.number}>
          <CardContent>
            <div className="text-sm font-semibold text-slate-900">Room {r.number}</div>
            <div className="text-xs text-slate-500">{r.type}</div>
            <span className={`px-2 py-1 text-xs font-medium rounded ${statusColor(r.status)}`}>
              {r.status.replace("_", " ")}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};