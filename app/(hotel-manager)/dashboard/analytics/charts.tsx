"use client";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type OccupancyPoint = { label: string; occupied: number; total: number };

export function OccupancyBarChart({ data = defaultOccupancy }: { data?: OccupancyPoint[] }) {
  const formatted = data.map((d) => ({ ...d, occupancyPct: d.total ? Math.round((d.occupied / d.total) * 100) : 0 }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Occupancy Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formatted} margin={{ top: 8, right: 12, left: 0, bottom: 6 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} />
              <YAxis unit="%" />
              <Tooltip
                // careful with any
                formatter={(v: any) => `${v}%`}
              />
              <Bar dataKey="occupancyPct" fill="#7c3aed" isAnimationActive={false}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-xs text-slate-600">
          {formatted.map((f) => (
            <div key={f.label} className="flex justify-between">
              <div>{f.label}</div>
              <div className="font-medium">{f.occupied}/{f.total} ({f.occupancyPct}%)</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardCharts({
  occupancy = defaultOccupancy,
}: {
  occupancy?: OccupancyPoint[];
}) {
  return (
    <OccupancyBarChart data={occupancy} />
  );
}

// Sample data useful for development/demo

const defaultOccupancy: OccupancyPoint[] = [
  { label: "1st Floor", occupied: 18, total: 24 },
  { label: "2nd Floor", occupied: 14, total: 20 },
  { label: "3rd Floor", occupied: 12, total: 16 },
];
