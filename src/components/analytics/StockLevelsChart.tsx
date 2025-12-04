"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface StockLevelsChartProps {
  data: { category: string; stock: number; average: number }[];
}

export function StockLevelsChart({ data }: StockLevelsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Levels by Category</CardTitle>
        <CardDescription>Total and average stock per category</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stock" fill="#E97F4A" name="Total Stock" />
            <Bar dataKey="average" fill="#8884d8" name="Average Stock" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
