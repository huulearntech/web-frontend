import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: React.ReactNode;
  trend?: string;
};

function MetricCard({ title, value, trend } : MetricCardProps) {
  const trendIsIncreasing = trend ? trend.startsWith("+") : false;
  return (
    <Card>
      <CardHeader>
        <CardDescription> {title} </CardDescription>
        <CardTitle className="text-2xl font-semibold text-slate-900"> {value} </CardTitle>
        <CardAction>
          {trend && (
            <Badge variant="outline">
              {trendIsIncreasing ? <TrendingUpIcon /> : <TrendingDownIcon />}
              {trend}
            </Badge>
          )}
        </CardAction>
      </CardHeader>
      <CardFooter>
        bla bla bla
      </CardFooter>
    </Card>
  );
};

const metrics = [
  { id: "checkins", title: "Today's Check-ins", value: 8, trend: "+2" },
  { id: "occupancy", title: "Occupancy %", value: "74%", trend: "+3%" },
  { id: "roomsAvailable", title: "Rooms Available", value: 12, trend: "-1" },
  { id: "revenueMTD", title: "Revenue (MTD)", value: "$24,300", trend: "+12%" },
];

export default function DashboardMetricCards() {
  return (
    <section className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-5" >
      {metrics.map((m) => (
        <MetricCard key={m.id} title={m.title} value={m.value} trend={m.trend} />
      ))}
    </section>
  );
}