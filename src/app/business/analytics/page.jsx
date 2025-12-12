"use client";

import { useState } from "react";
import {
  BarChart2,
  LineChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  Gift,
  BadgeDollarSign,
  Star,
  User,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function AnalyticsPage() {
  const [range, setRange] = useState("week"); // "today" | "week" | "month"

  const kpis = [
    {
      title: "Total Revenue",
      value: "$4,820",
      change: "+12.4%",
      trend: "up",
      icon: BadgeDollarSign,
    },
    {
      title: "Total Bookings",
      value: "96",
      change: "+8.1%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Points Issued",
      value: "15,320",
      change: "+18.9%",
      trend: "up",
      icon: Gift,
    },
    {
      title: "Points Redeemed",
      value: "9,870",
      change: "-3.4%",
      trend: "down",
      icon: Star,
    },
  ];

  const revenueData = [
    { label: "Mon", value: 420 },
    { label: "Tue", value: 610 },
    { label: "Wed", value: 390 },
    { label: "Thu", value: 780 },
    { label: "Fri", value: 920 },
    { label: "Sat", value: 1030 },
    { label: "Sun", value: 670 },
  ];

  const bookingsData = [
    { label: "Haircut", value: 52 },
    { label: "Color & Style", value: 34 },
    { label: "VIP Package", value: 21 },
    { label: "Beard Only", value: 18 },
  ];

  const pointsRatio = [
    { label: "Issued", value: 15320 },
    { label: "Redeemed", value: 9870 },
  ];

  const topStaff = [
    { name: "Omar", role: "Cashier", bookings: 38, revenue: "$1,420" },
    { name: "Rana", role: "Inventory / Service", bookings: 27, revenue: "$1,080" },
    { name: "Ali", role: "Delivery", bookings: 14, revenue: "$620" },
  ];

  const maxRevenue = Math.max(...revenueData.map((d) => d.value));
  const maxBookings = Math.max(...bookingsData.map((d) => d.value));
  const maxPoints = Math.max(...pointsRatio.map((d) => d.value));

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      <main className="p-4 lg:p-8 space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-2xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium mb-3">
                <BarChart2 size={14} />
                <span>Reports & Analytics</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">
                Business Performance Overview
              </h2>
              <p className="text-blue-100 max-w-xl text-sm">
                Track revenue, bookings, loyalty usage, and staff performance to
                understand how your business is performing.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="flex items-center gap-2 text-xs bg-white/15 rounded-full px-3 py-1">
                <Calendar size={14} className="text-blue-50" />
                <span className="text-blue-50">Reporting range</span>
              </div>
              <div className="flex gap-2">
                {["today", "week", "month"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition border ${
                      range === r
                        ? "bg-white text-blue-700 border-white"
                        : "bg-white/10 text-blue-50 border-white/30 hover:bg-white/20"
                    }`}
                  >
                    {r === "today"
                      ? "Today"
                      : r === "week"
                      ? "This week"
                      : "This month"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.title}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-slate-900 p-3 rounded-xl">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-semibold ${
                      kpi.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {kpi.trend === "up" ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                    {kpi.change}
                  </div>
                </div>
                <p className="text-xs font-medium text-gray-500 mb-1">
                  {kpi.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              </div>
            );
          })}
        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Revenue "line" chart (CSS-based) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Revenue trend
                </h3>
                <p className="text-xs text-gray-500">
                  Daily revenue for the selected period
                </p>
              </div>
              <LineChart size={18} className="text-gray-400" />
            </div>

            <div className="mt-4">
              <div className="flex items-end gap-3 h-40">
                {revenueData.map((d) => {
                  const height = (d.value / maxRevenue) * 100;
                  return (
                    <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full rounded-t-xl bg-gradient-to-t from-blue-500 to-indigo-500"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-[11px] text-gray-500">
                        {d.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-[11px] text-gray-500">
                Highest revenue day:{" "}
                <span className="font-semibold text-gray-800">
                  {
                    revenueData.reduce((a, b) => (a.value > b.value ? a : b))
                      .label
                  }
                </span>
              </p>
            </div>
          </div>

          {/* Bookings bar chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Bookings by service
                </h3>
                <p className="text-xs text-gray-500">
                  Which services customers book the most
                </p>
              </div>
              <BarChart2 size={18} className="text-gray-400" />
            </div>

            <div className="space-y-2">
              {bookingsData.map((item) => {
                const width = (item.value / maxBookings) * 100;
                return (
                  <div key={item.label}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-gray-700 font-medium">
                        {item.label}
                      </span>
                      <span className="text-gray-500">{item.value} bookings</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* POINTS + STAFF PERFORMANCE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Points issued vs redeemed */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Points issued vs redeemed
                </h3>
                <p className="text-xs text-gray-500">
                  Loyalty points usage for the selected period
                </p>
              </div>
              <Gift size={18} className="text-gray-400" />
            </div>

            <div className="space-y-3 mt-2">
              {pointsRatio.map((item) => {
                const width = (item.value / maxPoints) * 100;
                return (
                  <div key={item.label}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-gray-700 font-medium">
                        {item.label}
                      </span>
                      <span className="text-gray-500">{item.value} pts</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          item.label === "Issued"
                            ? "bg-blue-500"
                            : "bg-emerald-500"
                        }`}
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-[11px] text-gray-500">
              Redemption rate:{" "}
              <span className="font-semibold text-gray-800">
                {((pointsRatio[1].value / pointsRatio[0].value) * 100).toFixed(
                  1
                )}
                %
              </span>
            </p>
          </div>

          {/* Staff performance table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Staff performance
                </h3>
                <p className="text-xs text-gray-500">
                  Who is bringing the most bookings and revenue
                </p>
              </div>
              <Users size={18} className="text-gray-400" />
            </div>

            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-600 text-left border-b">
                  <th className="pb-2">Staff</th>
                  <th className="pb-2">Role</th>
                  <th className="pb-2">Bookings</th>
                  <th className="pb-2">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topStaff.map((s) => (
                  <tr key={s.name} className="hover:bg-gray-50 transition">
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-[11px] font-semibold">
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {s.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2">{s.role}</td>
                    <td className="py-2">{s.bookings}</td>
                    <td className="py-2">{s.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-3 text-[11px] text-gray-500 flex items-center gap-1">
              <User size={12} className="text-gray-400" />
              Use this data to reward high-performing staff.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
