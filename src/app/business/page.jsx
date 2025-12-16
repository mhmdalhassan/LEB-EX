"use client";

import {
  Calendar,
  Users,
  DollarSign,
  Gift,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function BusinessDashboardPage() {
  const stats = [
    {
      title: "Today's Bookings",
      value: "18",
      change: "+4.2%",
      trend: "up",
      icon: Calendar,
    },
    {
      title: "Total Customers",
      value: "325",
      change: "+12.0%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Revenue (This Week)",
      value: "$2,480",
      change: "-3.1%",
      trend: "down",
      icon: DollarSign,
    },
    {
      title: "Active Rewards",
      value: "6",
      change: "+2",
      trend: "up",
      icon: Gift,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
          Business Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Overview of your business performance and activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="text-gray-500" size={22} />
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}
                  {stat.change}
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
    </div>
  );
}
