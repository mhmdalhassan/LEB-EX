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

  // Sample stats for Business Admin
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
    <div className="min-h-screen bg-slate-950 text-gray-100">
      {/* Main content (this sits inside your Business Admin layout) */}
      <main className="p-4 lg:p-8 space-y-6">
        {/* Header / Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-2xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium mb-3">
                <LayoutDashboard size={14} />
                <span>Business Admin Dashboard</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                Welcome back, <span className="font-extrabold">Business Owner</span> 👋
              </h2>
              <p className="text-blue-100 max-w-xl">
                Here is an overview of your bookings, revenue, loyalty points, and top performing services today.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="flex items-center gap-2 text-sm bg-white/15 rounded-full px-3 py-1">
                <Clock size={14} className="text-blue-50" />
                <span className="text-blue-50">Today&apos;s snapshot</span>
              </div>
              <button className="bg-white text-blue-700 px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
                View detailed reports
              </button>
              <div className="flex items-center gap-2 text-xs text-blue-100">
                <MapPin size={14} />
                <span>Business Location · Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={20} />
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
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Bookings + Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Today's Bookings */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Today&apos;s bookings
                </h3>
                <p className="text-xs text-gray-500">
                  Manage your upcoming services and appointments
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs bg-white rounded-full px-2 py-1">
                {["today", "week"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1 rounded-full font-medium transition ${
                      activeFilter === filter
                        ? "bg-blue-600 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {filter === "today" ? "Today" : "This week"}
                  </button>
                ))}
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {todaysBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-semibold">
                      {booking.customer.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {booking.customer}
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.service}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={14} className="text-gray-400" />
                      <span>{booking.time}</span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          booking.status === "Confirmed"
                            ? "bg-green-500"
                            : booking.status === "In Progress"
                            ? "bg-blue-500"
                            : "bg-amber-500"
                        } animate-pulse`}
                      />
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products / Services */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Top services
                </h3>
                <p className="text-xs text-gray-500">
                  Your best performing products/services
                </p>
              </div>
              <Package size={18} className="text-gray-400" />
            </div>
            <div className="p-4 space-y-3">
              {topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.sold} sold
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-gray-700">
                    {product.revenue}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Loyalty + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Loyalty Overview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-2">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Loyalty & rewards overview
                </h3>
                <p className="text-xs text-gray-500">
                  Track points, redemptions and active rewards
                </p>
              </div>
              <Star size={18} className="text-yellow-400" />
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-xs font-medium text-blue-700">
                  Total points issued
                </p>
                <p className="mt-2 text-xl font-bold text-blue-900">
                  {loyaltyOverview.totalPointsIssued}
                </p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4">
                <p className="text-xs font-medium text-emerald-700">
                  Points redeemed
                </p>
                <p className="mt-2 text-xl font-bold text-emerald-900">
                  {loyaltyOverview.totalPointsRedeemed}
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-xs font-medium text-purple-700">
                  Avg. points / customer
                </p>
                <p className="mt-2 text-xl font-bold text-purple-900">
                  {loyaltyOverview.avgPointsPerCustomer}
                </p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <p className="text-xs font-medium text-amber-700">
                  Active rewards
                </p>
                <p className="mt-2 text-xl font-bold text-amber-900">
                  {loyaltyOverview.activeRewards}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Recent activity
                </h3>
                <p className="text-xs text-gray-500">
                  Latest updates from your business
                </p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 rounded-xl px-3 py-2 hover:bg-gray-50 transition"
                >
                  <div className="mt-1">
                    {activity.type === "booking" && (
                      <Calendar size={16} className="text-blue-500" />
                    )}
                    {activity.type === "points" && (
                      <Gift size={16} className="text-emerald-500" />
                    )}
                    {activity.type === "product" && (
                      <Package size={16} className="text-purple-500" />
                    )}
                    {activity.type === "staff" && (
                      <Users size={16} className="text-amber-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-800">
                      {activity.text}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
