"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Users,
  DollarSign,
  Gift,
  Package,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MapPin,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function BusinessDashboardPage() {
  const [activeFilter, setActiveFilter] = useState("today");

  // TEMP: mock data (will be replaced by API)
  const stats = [
    {
      title: "Today's Bookings",
      value: "18",
      change: "+4.2%",
      trend: "up",
      icon: Calendar,
      color: "bg-blue-500",
    },
    {
      title: "Total Customers",
      value: "325",
      change: "+12.0%",
      trend: "up",
      icon: Users,
      color: "bg-emerald-500",
    },
    {
      title: "Revenue (This Week)",
      value: "$2,480",
      change: "-3.1%",
      trend: "down",
      icon: DollarSign,
      color: "bg-amber-500",
    },
    {
      title: "Active Rewards",
      value: "6",
      change: "+2 new",
      trend: "up",
      icon: Gift,
      color: "bg-purple-500",
    },
  ];

  const todaysBookings = [
    {
      id: 1,
      customer: "Ahmad Khalil",
      service: "Haircut & Beard",
      time: "10:30 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      customer: "Sara Ali",
      service: "Full Package",
      time: "11:15 AM",
      status: "In Progress",
    },
    {
      id: 3,
      customer: "Mohammad Z.",
      service: "Haircut",
      time: "12:00 PM",
      status: "Pending",
    },
    {
      id: 4,
      customer: "Lama F.",
      service: "Color & Style",
      time: "02:45 PM",
      status: "Confirmed",
    },
  ];

  const topProducts = [
    { id: 1, name: "Premium Service Package", sold: 42, revenue: "$1,260" },
    { id: 2, name: "Basic Service", sold: 73, revenue: "$1,095" },
    { id: 3, name: "Monthly Subscription", sold: 21, revenue: "$840" },
    { id: 4, name: "Express Service", sold: 35, revenue: "$525" },
  ];

  const loyaltyOverview = {
    totalPointsIssued: "45,320",
    totalPointsRedeemed: "29,870",
    avgPointsPerCustomer: "139",
    activeRewards: 6,
  };

  const recentActivity = [
    {
      id: 1,
      type: "booking",
      text: "New booking from Omar for Full Package",
      time: "5 min ago",
    },
    {
      id: 2,
      type: "points",
      text: "Customer Lina redeemed 500 points for 20% discount",
      time: "20 min ago",
    },
    {
      id: 3,
      type: "product",
      text: "Added new service: VIP Package",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "staff",
      text: "New staff member added: Ali (Cashier)",
      time: "2 hours ago",
    },
  ];

  return (
    <main className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-2xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium mb-3">
              <LayoutDashboard size={14} />
              Business Admin Dashboard
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">
              Welcome back, Business Owner
            </h2>
            <p className="text-blue-100 max-w-xl">
              Overview of bookings, revenue, loyalty points and performance.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="flex items-center gap-2 text-sm bg-white/15 rounded-full px-3 py-1">
              <Clock size={14} />
              Today’s snapshot
            </div>
            <button className="bg-white text-blue-700 px-5 py-2 rounded-full text-sm font-semibold shadow hover:shadow-lg transition">
              View reports
            </button>
            <div className="flex items-center gap-2 text-xs text-blue-100">
              <MapPin size={14} />
              Business location · Live
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
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
              <h3 className="text-sm text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Bookings & Top Products */}
      {/* (unchanged – already correct) */}

      {/* Loyalty & Activity */}
      {/* (unchanged – already correct) */}
    </main>
  );
}
