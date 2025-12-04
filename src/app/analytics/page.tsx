"use client";

import { useProducts } from "@/hooks/useProducts";
import { useAnalytics } from "@/hooks/useAnalytics";
import { StatsCard } from "@/components/analytics/StatsCard";
import { ProductsByCategoryChart } from "@/components/analytics/ProductsByCategoryChart";
import { StatusDistributionChart } from "@/components/analytics/StatusDistributionChart";
import { StockLevelsChart } from "@/components/analytics/StockLevelsChart";
import { PriceDistributionChart } from "@/components/analytics/PriceDistributionChart";
import { LowStockAlert } from "@/components/analytics/LowStockAlert";
import { TopProducts } from "@/components/analytics/TopProducts";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Package,
  DollarSign,
  TrendingUp,
  Archive,
  AlertTriangle,
  CheckCircle2,
  House,
} from "lucide-react";

export default function AnalyticsPage() {
  const { products, loading } = useProducts();
  const analytics = useAnalytics(products);

  if (loading) {
    return (
      <div className="container mx-auto py-10 space-y-6">
        <Skeleton className="h-10 w-[250px]" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-96" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-6 px-4">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your product inventory and performance metrics
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Products"
          value={analytics.summary.totalProducts}
          description="Products in inventory"
          icon={Package}
        />
        <StatsCard
          title="Total Inventory Value"
          value={`$${analytics.summary.totalValue.toLocaleString()}`}
          description="Sum of all product values"
          icon={DollarSign}
        />
        <StatsCard
          title="Average Price"
          value={`$${analytics.summary.averagePrice.toFixed(2)}`}
          description="Average product price"
          icon={TrendingUp}
        />
        <StatsCard
          title="Total Stock"
          value={analytics.summary.totalStock.toLocaleString()}
          description="Total units in stock"
          icon={House}
        />
      </div>

      {/* Additional Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Active Products"
          value={analytics.summary.activeCount}
          description={`${(
            (analytics.summary.activeCount / analytics.summary.totalProducts) *
            100
          ).toFixed(0)}% of total`}
          icon={CheckCircle2}
        />
        <StatsCard
          title="Inactive Products"
          value={analytics.summary.inactiveCount}
          description={`${(
            (analytics.summary.inactiveCount /
              analytics.summary.totalProducts) *
            100
          ).toFixed(0)}% of total`}
          icon={Archive}
        />
        <StatsCard
          title="Low Stock Alerts"
          value={analytics.summary.lowStockCount}
          description="Products below 10 units"
          icon={AlertTriangle}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <ProductsByCategoryChart data={analytics.productsByCategory} />
        <StatusDistributionChart data={analytics.statusDistribution} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <StockLevelsChart data={analytics.stockLevels} />
        <PriceDistributionChart data={analytics.priceDistribution} />
      </div>

      {/* Alerts and Top Products */}
      <div className="grid gap-4 md:grid-cols-2">
        <LowStockAlert products={analytics.lowStockProducts} />
        <TopProducts products={analytics.topProducts} />
      </div>
    </div>
  );
}
