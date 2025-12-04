"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PriceDistributionChartProps {
  data: { category: string; averagePrice: number; totalValue: number }[];
}

export function PriceDistributionChart({ data }: PriceDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Analysis by Category</CardTitle>
        <CardDescription>
          Average price and total value per category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="averagePrice"
              stroke="#8884d8"
              name="Avg Price ($)"
            />
            <Line
              type="monotone"
              dataKey="totalValue"
              stroke="#E97F4A"
              name="Total Value ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
