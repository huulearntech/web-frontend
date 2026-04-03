// TODO: Fix AI generated slops in the chart component.

"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { fetchLast90DaysRevenueAndNumberOfBookings } from "@/lib/actions/hotel-manager/analytics"

export const description = "An interactive area chart"

type TimeRangeOptions = "90d" | "30d" | "7d";
const timeRangeValues: Record<TimeRangeOptions, number> = {
  "90d": 90,
  "30d": 30,
  "7d": 7,
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--color-blue-500)",
  },
  numberOfBookings: {
    label: "Bookings",
    color: "var(--color-red-500)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = useState<TimeRangeOptions>("90d")
  const [chartData, setChartData] = useState<Awaited<ReturnType<typeof fetchLast90DaysRevenueAndNumberOfBookings>>>([])

  const [filteredData, setFilteredData] = useState(chartData)

  useEffect(() => {
    async function fetchData() {
      const data = await fetchLast90DaysRevenueAndNumberOfBookings();
      console.log("Fetched chart data:", data);
      setChartData(data)
      setFilteredData(data)
    }
    fetchData()
  }, []);

  useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  // TODO: filter data.

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => setTimeRange(value as TimeRangeOptions)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRangeOptions)}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-64 w-full"
        >
          <LineChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const n = Number(value)
                if (Number.isNaN(n)) return String(value)
                // Show thousands for bookings, e.g. 1.2k
                if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`
                return n.toString()
              }}
              label={{ value: "Bookings", angle: -90, position: "insideLeft", offset: 10 }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={80}
              tickFormatter={(value) => {
                const n = Number(value)
                if (Number.isNaN(n)) return String(value)
                // Currency formatting for revenue
                if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
                if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`
                return `$${n}`
              }}
              label={{ value: "Revenue (USD)", angle: 90, position: "insideRight", offset: 10 }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value, name) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  formatter={(value, name) => {
                    const key = String(name) as keyof typeof chartConfig
                    const label = chartConfig?.[key]?.label ?? String(name)

                    if (key === "numberOfBookings") {
                      const n = Number(value) || 0
                      return [n.toLocaleString(), label]
                    }

                    if (key === "revenue") {
                      const n = Number(value) || 0
                      const formatted =
                        n >= 1_000_000
                          ? `$${(n / 1_000_000).toFixed(1)}M`
                          : n >= 1000
                            ? `$${(n / 1000).toFixed(1)}k`
                            : `$${n.toFixed(2)}`
                      return [formatted, label]
                    }

                    return [String(value), label]
                  }}
                  indicator="dot"
                />
              }
              isAnimationActive={false}
            />
            <Line
              yAxisId="left"
              dataKey="numberOfBookings"
              type="monotone"
              stroke="var(--color-red-500)"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
            <Line
              yAxisId="right"
              dataKey="revenue"
              type="monotone"
              stroke="var(--color-blue-500)"
              strokeWidth={2}
              dot={{ r: 2 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
