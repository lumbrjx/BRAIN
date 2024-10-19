import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useState } from "react";
import WebSocketConsoleLogger from "../sock";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";
const chartConfig = {
  Temp: {
    label: "Temperature",
    color: "hsl(224.7, 76.9%, 37.05%)", 
  },
} satisfies ChartConfig;

export function Component() {
  const [chartData, setChartData] = useState([
    { month: "January", temperature: 186 }, // get data from somewhere
    { month: "February", temperature: 120 },
    { month: "March", temperature: 20 },
    { month: "April", temperature: 100 },
    { month: "May", temperature: 220 },
    { month: "June", temperature: 214 },
  ]);

  const handleIncomingData = (newData: any) => {
    setChartData((prevData) => {
      return prevData.map((entry, index) => ({
        ...entry,
        temperature: newData[index]?.Temp ?? entry.temperature,
      }));
    });
  };

  return (
    <>
      <WebSocketConsoleLogger onDataReceived={handleIncomingData} />
      <Card className="w-96 h-72">
        <CardHeader>
          <CardTitle>Bar Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              width={300}
              height={400}
              data={chartData}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="temperature"
                fill="hsl(224.7, 76.9%, 37.05%)" // Use the blue color here
                radius={4}
                barSize={25}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Rise by 2.5% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total temperature produced for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
