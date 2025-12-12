"use client";

import { useEffect, useState, useMemo } from "react";
import { safeFetch } from "@/lib/safeFetch";
import {
  Store,
  Users,
  CreditCard,
  DollarSign,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export default function SuperAdminDashboardPage() {
  const [businesses, setBusinesses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const [bizRes, userRes] = await Promise.all([
          safeFetch("/api/superadmin/businesses"),
          safeFetch("/api/superadmin/users"),
        ]);

        if (!bizRes.success) {
          throw new Error(bizRes.message || "Failed to load businesses");
        }
        if (!userRes.success) {
          throw new Error(userRes.message || "Failed to load users");
        }

        setBusinesses(bizRes.businesses || []);
        setUsers(userRes.users || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // ===== Stats =====
  const totalBusinesses = businesses.length;
  const activeBusinesses = businesses.filter(
    (b) => b.active && !b.deleted
  ).length;

  const totalUsers = users.length;
  const businessAdmins = users.filter(
    (u) => u.role === "BUSINESS_ADMIN"
  ).length;

  const monthlyRevenue = businesses.reduce(
    (sum, b) => sum + (b.subscriptionPrice || 0),
    0
  );

  const stats = useMemo(
    () => [
      {
        title: "Total Businesses",
        value: String(totalBusinesses),
        icon: Store,
        color: "bg-blue-500",
      },
      {
        title: "Active Businesses",
        value: String(activeBusinesses),
        icon: Store,
        color: "bg-green-500",
      },
      {
        title: "Total Users",
        value: String(totalUsers),
        icon: Users,
        color: "bg-purple-500",
      },
      {
        title: "Monthly Revenue",
        value: `$${monthlyRevenue.toFixed(2)}`,
        icon: DollarSign,
        color: "bg-orange-500",
      },
    ],
    [totalBusinesses, activeBusinesses, totalUsers, monthlyRevenue]
  );

  const getSubStatus = (biz) => {
    const price = biz.subscriptionPrice || 0;
    if (!biz.active || biz.deleted) {
      return { label: "Suspended", classes: "bg-red-100 text-red-700" };
    }
    if (price > 0) {
      return { label: "Paid Plan", classes: "bg-green-100 text-green-700" };
    }
    return { label: "Free / Trial", classes: "bg-yellow-100 text-yellow-800" };
  };

  const topBusinesses = businesses.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header – gradient like template */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Super Admin Dashboard
            </h1>
            <p className="text-blue-100 text-sm max-w-xl">
              Overview of all businesses, users, and subscriptions in your
              platform.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl backdrop-blur">
            <CreditCard size={20} className="text-yellow-300" />
            <div>
              <p className="text-xs text-blue-100">Monthly Revenue</p>
              <p className="font-semibold">
                ${monthlyRevenue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={stat.color + " p-3 rounded-lg"}>
                  <Icon className="text-white" size={20} />
                </div>
              </div>
              <div className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Loading state */}
      {loading && !error && (
        <p className="text-gray-500 text-sm">Loading dashboard data…</p>
      )}

      {/* Main content: Businesses + Quick links */}
      {!loading && !error && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Businesses & subscriptions table */}
          <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Businesses & Subscriptions
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Top businesses with their current plan and status.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  (window.location.href = "/superadmin/businesses")
                }
                className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800"
              >
                View all
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Business
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topBusinesses.map((biz) => {
                    const status = getSubStatus(biz);
                    return (
                      <tr key={biz.id} className="hover:bg-gray-50">
                        <td className="px-5 py-4">
                          <div className="font-medium text-gray-900">
                            {biz.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {biz.email}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={
                              "inline-flex px-3 py-1 rounded-full text-xs font-semibold " +
                              (biz.subscriptionPlan === "Premium"
                                ? "bg-purple-100 text-purple-700"
                                : biz.subscriptionPlan === "Pro"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700")
                            }
                          >
                            {biz.subscriptionPlan || "Basic"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1 text-gray-700">
                            <DollarSign size={14} className="text-gray-400" />
                            {(biz.subscriptionPrice || 0).toFixed(2)}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={
                              "inline-flex px-3 py-1 rounded-full text-xs font-semibold " +
                              status.classes
                            }
                          >
                            {status.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}

                  {topBusinesses.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-5 py-6 text-center text-gray-500 text-sm"
                      >
                        No businesses yet. Add a business from the Businesses
                        page.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick links / Users summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Users Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Users</span>
                  <span className="font-semibold text-gray-900">
                    {totalUsers}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Business Admins</span>
                  <span className="font-semibold text-gray-900">
                    {businessAdmins}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  (window.location.href = "/superadmin/users")
                }
                className="mt-4 w-full flex items-center justify-center gap-2 text-xs text-indigo-600 hover:text-indigo-800"
              >
                Manage Users
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Subscriptions
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                View all subscriptions, plans, and expiring businesses in one
                place.
              </p>
              <button
                type="button"
                onClick={() =>
                  (window.location.href = "/superadmin/subscriptions")
                }
                className="w-full flex items-center justify-center gap-2 text-xs text-indigo-600 hover:text-indigo-800"
              >
                Open Subscriptions
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
