"use client";

import { useEffect, useState, useMemo } from "react";
import { safeFetch } from "@/lib/safeFetch";
import SubscriptionStats from "@/components/superadmin/stats/SubscriptionStats";
import SubscriptionsTable from "@/components/superadmin/tables/SubscriptionsTable";



import {
  Store,
  Users,
  DollarSign,
  CreditCard,
  Eye,
  Edit,
} from "lucide-react";

import EditSubscriptionModal from "@/components/superadmin/modals/EditSubscriptionModal";
import RecordPaymentModal from "@/components/superadmin/modals/RecordPaymentModal";

/* ============================================================
   Super Admin - Subscriptions Page
============================================================ */
export default function SubscriptionsPage() {
  /* -------------------- State -------------------- */
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showEditSub, setShowEditSub] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  /* -------------------- Load Data -------------------- */
  const loadBusinesses = async () => {
    setLoading(true);
    setError("");

    const res = await safeFetch("/api/superadmin/businesses");

    if (!res?.success) {
      setError(res.message || "Failed to load businesses");
      setBusinesses([]);
      setLoading(false);
      return;
    }

    setBusinesses(res.businesses || []);
    setLoading(false);
  };

  useEffect(() => {
    loadBusinesses();
  }, []);

  /* -------------------- Stats -------------------- */
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
        value: totalBusinesses,
        icon: Store,
        color: "bg-blue-500",
      },  
      {
        title: "Active Businesses",
        value: activeBusinesses,
        icon: Users,
        color: "bg-green-500",
      },
      {
        title: "Monthly Revenue",
        value: `$${monthlyRevenue.toFixed(2)}`,
        icon: DollarSign,
        color: "bg-purple-500",
      },
      {
        title: "Paid Plans",
        value: paidBusinesses,
        icon: CreditCard,
        color: "bg-orange-500",
      },
    ];
  }, [businesses]);

  /* -------------------- Helpers -------------------- */
  const getStatusBadge = (biz) => {
    if (!biz.active || biz.deleted) {
      return { label: "Suspended", classes: "bg-red-100 text-red-700" };
    }

    if ((biz.subscriptionPrice || 0) > 0) {
      return { label: "Active", classes: "bg-green-100 text-green-700" };
    }

    return {
      label: "Free / Trial",
      classes: "bg-yellow-100 text-yellow-800",
    };
  };

  /* ============================================================
     UI
  ============================================================ */
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 lg:p-8 text-white shadow-xl">
        <h2 className="text-2xl lg:text-3xl font-bold mb-2">
          Subscriptions Overview
        </h2>
        <p className="text-blue-100 text-sm">
          Monitor all business plans, prices, and subscription status.
        </p>
      </div>

      {/* ================= STATS ================= */}
      <SubscriptionStats stats={stats} />

      {/* ================= ERROR / LOADING ================= */}
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {loading && !error && (
        <p className="text-gray-500 text-sm">Loading subscriptions…</p>
      )}

     {/* ================= TABLE ================= */}
{!loading && !error && (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="p-6 border-b border-gray-100">
      <h3 className="text-lg font-bold text-gray-900">
        Businesses & Subscriptions
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        Manage plans, prices, and payments.
      </p>
    </div>

    <SubscriptionsTable
      businesses={businesses}
      getStatusBadge={getStatusBadge}

//////view button//////////////////
      onViewUsers={(biz) =>
        (window.location.href = `/superadmin/businesses/${biz.id}/users`)
      }

//////edite button//////////////////
      onEdit={(biz) => {
        setSelectedBusiness(biz);
        setShowEditSub(true);
      }}



      // onRecordPayment={(biz) => {
      //   setSelectedBusiness(biz);
      //   setShowPaymentModal(true);
      // }}
    />
  </div>
)}


      {/* ================= MODALS ================= */}
      <EditSubscriptionModal
        open={showEditSub}
        business={selectedBusiness}
        onClose={() => setShowEditSub(false)}
        onSaved={loadBusinesses}
      />

      {/* {showPaymentModal && selectedBusiness && (
        <RecordPaymentModal
          business={selectedBusiness}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={loadBusinesses}
        />
      )} */}
    </div>
  );
}
