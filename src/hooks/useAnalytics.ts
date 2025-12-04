"use client";

import { useMemo } from "react";
import { Product } from "@/types";

export const useAnalytics = (products: Product[]) => {
  const analytics = useMemo(() => {
    // Products by Category
    const categoryData = products.reduce((acc: any, product) => {
      const category = product.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const productsByCategory = Object.entries(categoryData).map(
      ([name, value]) => ({
        name,
        value: value as number,
      })
    );

    // Status Distribution
    const activeCount = products.filter((p) => p.status === "active").length;
    const inactiveCount = products.filter(
      (p) => p.status === "inactive"
    ).length;

    const statusDistribution = [
      { name: "Active", value: activeCount },
      { name: "Inactive", value: inactiveCount },
    ];

    // Stock Levels by Category
    const stockByCategory = products.reduce((acc: any, product) => {
      const category = product.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = { category, stock: 0, count: 0 };
      }
      acc[category].stock += product.stock;
      acc[category].count += 1;
      return acc;
    }, {});

    const stockLevels = Object.values(stockByCategory).map((item: any) => ({
      category: item.category,
      stock: item.stock,
      average: Math.round(item.stock / item.count),
    }));

    // Price Distribution by Category
    const priceByCategory = products.reduce((acc: any, product) => {
      const category = product.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = { category, totalPrice: 0, count: 0 };
      }
      acc[category].totalPrice += product.price;
      acc[category].count += 1;
      return acc;
    }, {});

    const priceDistribution = Object.values(priceByCategory).map(
      (item: any) => ({
        category: item.category,
        averagePrice: Math.round(item.totalPrice / item.count),
        totalValue: Math.round(item.totalPrice),
      })
    );

    // Low Stock Products
    const lowStockProducts = products
      .filter((p) => p.stock < 10)
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 5);

    // Top Products by Value
    const topProducts = products
      .map((p) => ({
        name: p.name,
        value: p.price * p.stock,
        stock: p.stock,
        price: p.price,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    // Summary Stats
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
    const averagePrice =
      products.length > 0
        ? products.reduce((sum, p) => sum + p.price, 0) / products.length
        : 0;
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const lowStockCount = products.filter((p) => p.stock < 10).length;

    return {
      productsByCategory,
      statusDistribution,
      stockLevels,
      priceDistribution,
      lowStockProducts,
      topProducts,
      summary: {
        totalProducts,
        totalValue,
        averagePrice,
        totalStock,
        activeCount,
        inactiveCount,
        lowStockCount,
      },
    };
  }, [products]);

  return analytics;
};
