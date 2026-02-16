"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currency } from "../helper-to-be-deleted";
import { Booking } from "../columns";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* ---------- Recharts small bar chart component ---------- */
function MiniBarChart({
  data,
  height = 140,
}: {
  data: { label: string; value: number }[];
  height?: number;
}) {
  const rechartsData = data.map((d) => ({ name: d.label, value: d.value }));
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rechartsData} margin={{ top: 16, right: 12, left: 6, bottom: 24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e6edf3" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip formatter={(val?: number) => (val == null ? "" : currency(val))} />
          <Bar dataKey="value" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function HotelManagerStatisticsPage({
  totalIncome,
  incomeByMonth,
  bookings,
}: {
  totalIncome: number;
  incomeByMonth: [string, number][];
  bookings: Booking[];
}) {
  return (
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
            </div>
          </div>

          <MiniBarChart data={incomeByMonth.map(([label, value]) => ({ label, value }))} />

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
  );
}