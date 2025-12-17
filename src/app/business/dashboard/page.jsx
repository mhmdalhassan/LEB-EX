"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  Package,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { safeFetch } from "@/lib/safeFetch";
import { DollarSign } from "lucide-react";


export const dynamic = "force-dynamic";

export default function BusinessDashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      const res = await safeFetch("/api/business/dashboard");
      if (res?.success) {
        setDashboard(res.data);
      }
      setLoading(false);
    };
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-gray-500 text-sm">
        Loading dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="text-red-500 text-sm">
        Failed to load dashboard data
      </div>
    );
  }

  const stats = [
    {
      title: "Orders",
      value: dashboard.stats.orderCount,
      icon: ShoppingCart,
      trend: "up",
    },
    {
      title: "Staff",
      value: dashboard.stats.staffCount,
      icon: Users,
      trend: "up",
    },
    {
      title: "Products",
      value: dashboard.stats.productCount,
      icon: Package,
      trend: "up",
    },
    
    {
    title: "Staff Cost",
    value: dashboard.stats.totalStaffCost?.toLocaleString(),
    icon: DollarSign,
    trend: "down",
  },
];

  return (
    <main className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
          Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Overview of your business performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="text-gray-500" size={22} />
                <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-900">
            Recent Orders
          </h3>
          <p className="text-xs text-gray-500">
            Latest activity for your business
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {dashboard.recentOrders.length === 0 && (
            <div className="px-6 py-4 text-sm text-gray-500">
              No recent orders
            </div>
          )}

          {dashboard.recentOrders.map((order) => (
            <div
              key={order.id}
              className="px-6 py-4 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {order.customerName || "Customer"}
                </p>
                <p className="text-xs text-gray-500">
                  Status: {order.status}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {order.totalAmount ?? 0}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
