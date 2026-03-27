import { ChartAreaInteractive } from "../tmp-components/chart-area-interactive";
import { DashboardCharts } from "./charts";
import PiechartPercentageOfRevenueComeFrom from "./piechart-percentage-of-revenue-come-from";

export default async function HotelManagerStatisticsPage() {
  return (
    <>
      <ChartAreaInteractive />
      <DashboardCharts />
      <PiechartPercentageOfRevenueComeFrom />
    </>
  );
}