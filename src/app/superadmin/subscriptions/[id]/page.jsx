"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { safeFetch } from "@/lib/safeFetch";

import {
  ArrowLeft,
  CreditCard,
  DollarSign,
  CheckCircle,
  XCircle,
} from "lucide-react";

import EditSubscriptionModal from "@/components/superadmin/modals/EditSubscriptionModal";
// import RecordPaymentModal from "@/components/superadmin/modals/RecordPaymentModal";

export default function SubscriptionDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  /* -------------------- Load Business -------------------- */
  const loadBusiness = async () => {
    setLoading(true);
    setError("");

    const res = await safeFetch(`/api/superadmin/businesses/${id}`);

    if (!res?.success) {
      setError(res.message || "Failed to load subscription");
      setLoading(false);
      return;
    }

    setBusiness(res.business);
    setLoading(false);
  };

  useEffect(() => {
    if (id) loadBusiness();
  }, [id]);

  /* -------------------- Helpers -------------------- */
  const isActive = business?.active && !business?.deleted;
  const isPaid = (business?.subscriptionPrice || 0) > 0;

  /* =========================
     UI
  ========================= */
  if (loading) {
    return <p className="text-gray-500">Loading subscription…</p>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() => router.push("/superadmin/subscriptions")}
        className="flex items-center gap-2 text-sm text-indigo-600 hover:underline"
      >
        <ArrowLeft size={16} />
        Back to Subscriptions
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {business.name}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Subscription details & billing overview
        </p>
      </div>

      {/* Subscription Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          title="Subscription Plan"
          value={business.subscriptionPlan || "Basic"}
          icon={CreditCard}
        />

        <InfoCard
          title="Monthly Price"
          value={`$${(business.subscriptionPrice || 0).toFixed(2)}`}
          icon={DollarSign}
        />

        <InfoCard
          title="Status"
          value={isActive ? "Active" : "Suspended"}
          icon={isActive ? CheckCircle : XCircle}
          color={isActive ? "text-green-600" : "text-red-600"}
        />

        <InfoCard
          title="Payment Type"
          value={isPaid ? "Paid Subscription" : "Free / Trial"}
          icon={CreditCard}
        />



        <InfoCard
        title="Payment Type"
        value={
        {
            CASH: "Cash",
            OMT: "OMT",
            WISH: "Wish",
            BANK: "Bank Transfer",
            OTHER: "Other",
        }[business.defaultPaymentMethod] || "Cash"
        }        
        icon={CreditCard}
        />

      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowEdit(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
        >
          Edit Subscription
        </button>

        {/* <button
          onClick={() => setShowPayment(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
        >
          Record Payment
        </button> */}
      </div>

      {/* Modals */}
      <EditSubscriptionModal
        open={showEdit}
        business={business}
        onClose={() => setShowEdit(false)}
        onSaved={loadBusiness}
      />

      {showPayment && (
        <RecordPaymentModal
          business={business}
          onClose={() => setShowPayment(false)}
          onSuccess={loadBusiness}
        />
      )}
    </div>
  );
}

/* =========================
   Small UI Component
========================= */
function InfoCard({ title, value, icon: Icon, color = "text-gray-800" }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
      <div className="p-3 rounded-lg bg-gray-100">
        <Icon size={22} className={color} />
      </div>
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className={`font-semibold ${color}`}>{value}</p>
      </div>
    </div>
  );
}
