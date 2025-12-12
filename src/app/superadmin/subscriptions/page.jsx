"use client";

import { useEffect, useState, useMemo } from "react";
import { safeFetch } from "@/lib/safeFetch";
import RecordPaymentModal from "@/components/superadmin/RecordPaymentModal";

import {
  Store,
  Users,
  TrendingUp,
  DollarSign,
  CreditCard,
  Eye,
  Edit,
} from "lucide-react";
import EditSubscriptionModal from "@/components/superadmin/EditSubscriptionModal";

async function getAnalytics() {
  const res = await fetch("/api/superadmin/subscriptions/analytics", { cache: "no-store" });
  return res.json();
}



export default function SubscriptionsPage() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBiz, setSelectedBiz] = useState(null);
  const [showEditSub, setShowEditSub] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);


  const loadBusinesses = async () => {
    setLoading(true);
    setError("");

    const data = await safeFetch("/api/superadmin/businesses");

    if (!data.success) {
      setError(data.message || "Failed to load businesses");
      setBusinesses([]);
      setLoading(false);
      return;
    }

    setBusinesses(data.businesses || []);
    setLoading(false);
  };

  useEffect(() => {
    loadBusinesses();
  }, []);

  // Stats for the cards (top)
  const stats = useMemo(() => {
    const totalBusinesses = businesses.length;
    const activeBusinesses = businesses.filter(
      (b) => b.active && !b.deleted
    ).length;
    const paidBusinesses = businesses.filter(
      (b) => (b.subscriptionPrice || 0) > 0
    ).length;
    const monthlyRevenue = businesses.reduce(
      (sum, b) => sum + (b.subscriptionPrice || 0),
      0
    );

    return [
      {
        title: "Total Businesses",
        value: String(totalBusinesses),
        change: "",
        trend: "up",
        icon: Store,
        color: "bg-blue-500",
      },
      {
        title: "Active Businesses",
        value: String(activeBusinesses),
        change: "",
        trend: "up",
        icon: Users,
        color: "bg-green-500",
      },
      {
        title: "Monthly Subscription Revenue",
        value: `$${monthlyRevenue.toFixed(2)}`,
        change: "",
        trend: monthlyRevenue > 0 ? "up" : "down",
        icon: DollarSign,
        color: "bg-purple-500",
      },
      {
        title: "Paid Plans",
        value: String(paidBusinesses),
        change: "",
        trend: "up",
        icon: CreditCard,
        color: "bg-orange-500",
      },
    ];
  }, [businesses]);

  // Decide status badge style
  const getStatusBadge = (biz) => {
    const price = biz.subscriptionPrice || 0;
    const isActive = biz.active && !biz.deleted;

    if (!isActive) {
      return {
        label: "Suspended",
        classes: "bg-red-100 text-red-700",
      };
    }

    if (price > 0) {
      return {
        label: "Active",
        classes: "bg-green-100 text-green-700",
      };
    }

    return {
      label: "Free / Trial",
      classes: "bg-yellow-100 text-yellow-800",
    };
  };

  return (
    <div className="space-y-6">
      {/* Gradient Header / Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
        <div className="relative z-10">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">
            Subscriptions Overview
          </h2>
          <p className="text-blue-100 mb-4 text-sm">
            Monitor all business plans, prices, and subscription status in one place.
          </p>
        </div>
      </div>

      {/* Stats Grid (copied style from template, but using real data) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-gray-100"
              style={{ animationDelay: index * 100 + "ms" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={stat.color + " p-3 rounded-lg"}>
                  <Icon className="text-white" size={20} />
                </div>
                {stat.change && (
                  <div
                    className={
                      "flex items-center gap-1 text-sm font-semibold " +
                      (stat.trend === "up"
                        ? "text-green-600"
                        : "text-red-600")
                    }
                  >
                    <span>{stat.change}</span>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading text */}
      {loading && !error && (
        <p className="text-gray-500 text-sm">Loading subscription data...</p>
      )}

      {/* Main Subscriptions Table */}
      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Businesses &amp; Subscriptions
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Manage plan type, price, and subscription status for each business.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {businesses.map((biz, index) => {
                  const status = getStatusBadge(biz);

                  return (
                    <tr
                      key={biz.id}
                      className="hover:bg-gray-50 transition-colors"
                      style={{ animationDelay: index * 50 + "ms" }}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {biz.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {biz.email}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
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

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} className="text-gray-400" />
                          <span className="text-gray-700">
                            {(biz.subscriptionPrice || 0).toFixed(2)}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={
                            "inline-flex px-3 py-1 rounded-full text-xs font-semibold " +
                            status.classes
                          }
                        >
                          {status.label}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {/* View / Manage Users */}
                          <button
                            type="button"
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                            title="View Business Users"
                            onClick={() => {
                              window.location.href = `/superadmin/businesses/${biz.id}/users`;
                            }}
                          >
                            <Eye size={16} />
                          </button>

                          {/* Edit Subscription */}
                          <button
                            type="button"
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors text-green-600"
                            title="Edit Subscription"
                            onClick={() => {
                              setSelectedBiz(biz);
                              setShowEditSub(true);
                            }}
                          >
                            <Edit size={16} />
                          </button>



                          <button
                            onClick={() => {
                              setSelectedBusiness(biz);
                              setShowPaymentModal(true);
                            }}
                            className="px-3 py-2 bg-green-600 text-white rounded-lg"
                          >
                            Record Payment
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })}

                {businesses.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-6 text-center text-sm text-gray-500"
                    >
                      No businesses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Subscription Modal (already exists in your project) */}
      <EditSubscriptionModal
        open={showEditSub}
        business={selectedBiz}
        onClose={() => setShowEditSub(false)}
        onSaved={loadBusinesses}
      />

      {showPaymentModal && selectedBusiness && (
  <RecordPaymentModal
    business={selectedBusiness}
    onClose={() => setShowPaymentModal(false)}
    onSuccess={() => fetchBusinesses()} // Refresh
  />
)}

    </div>
  );
}
