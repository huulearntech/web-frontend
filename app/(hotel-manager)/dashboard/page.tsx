"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type BookingStatus = "pending" | "confirmed" | "cancelled" | "checked-in";

type Booking = {
  id: string;
  guestName: string;
  room: string;
  start: string; // ISO
  end: string; // ISO
  price: number; // total price
  status: BookingStatus;
  createdAt: string;
};

/* ---------- Mock data (replace with real API calls) ---------- */
const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "BKG-001",
    guestName: "Alice Johnson",
    room: "Deluxe 101",
    start: "2026-02-05",
    end: "2026-02-08",
    price: 450,
    status: "confirmed",
    createdAt: "2026-01-10",
  },
  {
    id: "BKG-002",
    guestName: "Bob Smith",
    room: "Suite 201",
    start: "2026-02-10",
    end: "2026-02-12",
    price: 600,
    status: "pending",
    createdAt: "2026-01-20",
  },
  {
    id: "BKG-003",
    guestName: "Carol Rivera",
    room: "Standard 03",
    start: "2026-01-20",
    end: "2026-01-22",
    price: 240,
    status: "cancelled",
    createdAt: "2025-12-28",
  },
  {
    id: "BKG-004",
    guestName: "David Lee",
    room: "Suite 202",
    start: "2026-02-15",
    end: "2026-02-18",
    price: 780,
    status: "checked-in",
    createdAt: "2026-02-02",
  },
];

/* ---------- Helpers ---------- */
const currency = (n: number) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });

const formatDate = (iso: string) => {
  try {
    return format(new Date(iso), "MMM d, yyyy");
  } catch {
    return iso;
  }
};

const statusColor = (s: BookingStatus) =>
  s === "confirmed"
    ? "bg-green-100 text-green-800"
    : s === "pending"
    ? "bg-yellow-100 text-yellow-800"
    : s === "cancelled"
    ? "bg-red-100 text-red-800"
    : "bg-sky-100 text-sky-800";

// TODO: replace with proper chart library
/* ---------- Small bar chart component (SVG) ---------- */
function MiniBarChart({
  data,
  width = 600,
  height = 120,
}: {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const padding = 16;
  const barWidth = (width - padding * 2) / data.length;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-32">
      <rect x="0" y="0" width={width} height={height} rx={8} fill="transparent" />
      {data.map((d, i) => {
        const barHeight = (d.value / max) * (height - 40);
        const x = padding + i * barWidth + 6;
        const y = height - barHeight - 20;
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={y}
              width={barWidth - 12}
              height={barHeight}
              rx={6}
              fill="#0ea5e9"
              opacity={0.9}
            />
            <text
              x={x + (barWidth - 12) / 2}
              y={height - 6}
              fontSize={10}
              fill="#374151"
              textAnchor="middle"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- Main Page Component ---------- */
export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [activeTab, setActiveTab] = useState<"bookings" | "stats">("bookings");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      if (statusFilter && statusFilter !== "all") {
        if (b.status !== statusFilter) return false;
      }
      if (!q) return true;
      return (
        b.guestName.toLowerCase().includes(q) ||
        b.room.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    });
  }, [bookings, query, statusFilter]);

  // Income by month (simple grouping by month-year from booking start)
  const incomeByMonth = useMemo(() => {
    const map = new Map<string, number>();
    bookings.forEach((b) => {
      const dt = new Date(b.start);
      const key = format(dt, "MMM yyyy");
      map.set(key, (map.get(key) || 0) + b.price);
    });
    const sorted = Array.from(map.entries()).sort(
      (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
    );
    // fallback: last 6 months if empty
    if (sorted.length === 0) {
      const now = new Date();
      const arr = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        arr.push([format(d, "MMM yyyy"), 0] as [string, number]);
      }
      return arr;
    }
    return sorted;
  }, [bookings]);

  const totalIncome = useMemo(
    () => bookings.reduce((s, b) => s + b.price, 0),
    [bookings]
  );

  /* ---------- Actions ---------- */
  const updateStatus = (id: string, status: BookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const cancelBooking = (id: string) => updateStatus(id, "cancelled");
  const confirmBooking = (id: string) => updateStatus(id, "confirmed");

  const exportCsv = () => {
    const header = ["id", "guestName", "room", "start", "end", "price", "status"];
    const rows = bookings.map((b) =>
      [b.id, b.guestName, b.room, b.start, b.end, b.price, b.status].join(",")
    );
    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ---------- Render ---------- */
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Hotel Manager Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage bookings, track income, and keep rooms running smoothly.
          </p>
        </div>
      </header>

      <Tabs
        value={activeTab === "bookings" ? "bookings" : "stats"}
        onValueChange={(v) =>
          setActiveTab(v === "bookings" ? "bookings" : "stats")
        }
      >
        <TabsList>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Bookings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 items-center">
                  <Input
                    placeholder="Search by guest, room, or id..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Select
                    value={statusFilter}
                    onValueChange={(v) =>
                      setStatusFilter(v as BookingStatus | "all")
                    }
                  >
                    <SelectTrigger className="w-56" >
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="checked-in">Checked-in</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => { setQuery(""); setStatusFilter("all"); }}>
                    Clear
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="py-2">ID</TableHead>
                        <TableHead className="py-2">Guest</TableHead>
                        <TableHead className="py-2">Room</TableHead>
                        <TableHead className="py-2">Dates</TableHead>
                        <TableHead className="py-2">Price</TableHead>
                        <TableHead className="py-2">Status</TableHead>
                        <TableHead className="py-2 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="py-6 text-center text-sm">
                            No bookings found.
                          </TableCell>
                        </TableRow>
                      )}

                      {filtered.map((b) => (
                        <TableRow key={b.id} className="border-t">
                          <TableCell className="py-3 font-mono text-xs">{b.id}</TableCell>
                          <TableCell className="py-3">{b.guestName}</TableCell>
                          <TableCell className="py-3">{b.room}</TableCell>
                          <TableCell className="py-3">
                            <div className="text-sm">
                              {formatDate(b.start)} — {formatDate(b.end)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              created {formatDate(b.createdAt)}
                            </div>
                          </TableCell>
                          <TableCell className="py-3">{currency(b.price)}</TableCell>
                          <TableCell className="py-3">
                            <Badge
                              className={cn(
                                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                statusColor(b.status)
                              )}
                            >
                              {b.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3 text-right">
                            <div className="flex justify-end gap-2">
                              {b.status !== "confirmed" && b.status !== "checked-in" && (
                                <Button size="sm" onClick={() => confirmBooking(b.id)}>
                                  Confirm
                                </Button>
                              )}
                              {b.status !== "cancelled" && (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => cancelBooking(b.id)}
                                >
                                  Cancel
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => alert(JSON.stringify(b, null, 2))}
                              >
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filtered.length} booking(s)
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={exportCsv}>Export CSV</Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border rounded-md">
                    <div className="text-xs text-muted-foreground">Total Bookings</div>
                    <div className="text-lg font-semibold">{bookings.length}</div>
                  </div>
                  <div className="p-3 border rounded-md">
                    <div className="text-xs text-muted-foreground">Total Income</div>
                    <div className="text-lg font-semibold">{currency(totalIncome)}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-2">Status Distribution</div>
                  <div className="flex flex-col gap-2">
                    {(["pending","confirmed","checked-in","cancelled"] as BookingStatus[]).map(
                      (s) => {
                        const c = bookings.filter((b) => b.status === s).length;
                        const pct = Math.round((c / Math.max(1, bookings.length)) * 100);
                        return (
                          <div key={s} className="text-sm">
                            <div className="flex justify-between">
                              <div className="capitalize">{s}</div>
                              <div className="text-muted-foreground">{c} ({pct}%)</div>
                            </div>
                            <div className="w-full bg-muted h-2 rounded mt-1">
                              <div
                                className="bg-sky-500 h-2 rounded"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Income Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Last months</div>
                    <div className="text-2xl font-semibold">{currency(totalIncome)}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => alert("Load more (stub)")}>Last 12 months</Button>
                    <Button variant="secondary" onClick={() => exportCsv()}>
                      Export
                    </Button>
                  </div>
                </div>

                <MiniBarChart
                  data={incomeByMonth.map(([label, value]) => ({ label, value }))}
                />

                <div className="mt-4 grid grid-cols-2 gap-4">
                  {incomeByMonth.map(([label, value]) => (
                    <div key={label} className="p-3 border rounded">
                      <div className="text-xs text-muted-foreground">{label}</div>
                      <div className="text-lg font-semibold">{currency(value)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="text-sm text-muted-foreground">Total Income</div>
                    <div className="font-medium">{currency(totalIncome)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm text-muted-foreground">Bookings</div>
                    <div className="font-medium">{bookings.length}</div>
                  </div>

                  <div className="flex justify-between">
                    <div className="text-sm text-muted-foreground">Confirmed</div>
                    <div className="font-medium">
                      {bookings.filter((b) => b.status === "confirmed").length}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm text-muted-foreground">Pending</div>
                    <div className="font-medium">
                      {bookings.filter((b) => b.status === "pending").length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};