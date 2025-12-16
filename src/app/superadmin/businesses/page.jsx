"use client";

import { useEffect, useState } from "react";
import { safeFetch } from "@/lib/safeFetch";
import BusinessTable from "@/components/superadmin/tables/BusinessTable";
import { useRouter } from "next/navigation";


import {
  Plus,
  Users,
  ShieldCheck,
  DollarSign,
  Pause,
  Play,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";

import AddBusinessModal from "@/components/superadmin/modals/AddBusinessModal";
import AssignAdminModal from "@/components/superadmin/modals/AssignAdminModal";
import EditBusinessModal from "@/components/superadmin/modals/EditBusinessModal";
import EditSubscriptionModal from "@/components/superadmin/modals/EditSubscriptionModal";

/* ============================================================
   Super Admin - Businesses Page
============================================================ */
export default function BusinessesPage() {
  /* -------------------- State -------------------- */
  const router = useRouter();

  const [businesses, setBusinesses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showSub, setShowSub] = useState(false);

  const [selectedBiz, setSelectedBiz] = useState(null);

  /* -------------------- Load Data -------------------- */
  const loadBusinesses = async () => {
    setLoading(true);

    const res = await safeFetch("/api/superadmin/businesses");

    if (res?.success) {
      setBusinesses(res.businesses);
      setFiltered(res.businesses);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadBusinesses();
  }, []);

  /* -------------------- Search -------------------- */
  const handleSearch = (value) => {
    setSearch(value);

    if (!value.trim()) {
      setFiltered(businesses);
      return;
    }

    const q = value.toLowerCase();

    const results = businesses.filter((biz) => {
      return (
        biz.name.toLowerCase().includes(q) ||
        biz.email.toLowerCase().includes(q) ||
        (biz.industry || "").toLowerCase().includes(q) ||
        (biz.phone || "").toLowerCase().includes(q)
      );
    });

    setFiltered(results);
  };

  /* -------------------- Actions -------------------- */
  const toggleStatus = async (id) => {
    const res = await safeFetch(
      `/api/superadmin/businesses/${id}/toggle`,
      { method: "PATCH" }
    );

    if (res?.success) loadBusinesses();
  };

  const deleteBusiness = async (id) => {
    if (!confirm("Are you sure you want to delete this business?")) return;

    const res = await safeFetch(
      `/api/superadmin/businesses/${id}`,
      { method: "DELETE" }
    );

    if (res?.success) loadBusinesses();
  };

  /* -------------------- Helpers -------------------- */
  const statusBadge = (active) =>
    active ? (
      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
        Active
      </span>
    ) : (
      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
        Suspended
      </span>
    );

  /* ============================================================
     UI
  ============================================================ */
  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Businesses Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage businesses, assign admins, control access & more.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 w-full max-w-sm">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search businesses..."
            className="bg-transparent w-full outline-none px-2 text-sm"
          />
        </div>

        {/* Add */}
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          <Plus size={18} />
          Add Business
        </button>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            All Businesses
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Showing {filtered.length} businesses
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="p-6 text-center text-gray-500">
            Loading...
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No businesses found.
          </div>
        )}

        {/* Table */}
{!loading && (
  <BusinessTable
    businesses={filtered}
    loading={loading}
    statusBadge={statusBadge}
    onToggle={toggleStatus}
    onDelete={deleteBusiness}
    onAssign={(biz) => {
      setSelectedBiz(biz);
      setShowAssign(true);
    }}
    onEdit={(biz) => {
      setSelectedBiz(biz);
      setShowEdit(true);
    }}
    onSubscription={(biz) => {
      setSelectedBiz(biz);
      setShowSub(true);
    }}
    onManageUsers={(biz) => {
      router.push(`/superadmin/businesses/${biz.id}`);
    }}
  />
)}


      </div>

      {/* ================= MODALS ================= */}
      <AddBusinessModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onBusinessAdded={loadBusinesses}
      />

      <AssignAdminModal
        open={showAssign}
        business={selectedBiz}
        onClose={() => setShowAssign(false)}
        onSaved={loadBusinesses}
      />

      <EditBusinessModal
        open={showEdit}
        business={selectedBiz}
        onClose={() => setShowEdit(false)}
        onSaved={loadBusinesses}
      />

      <EditSubscriptionModal
        open={showSub}
        business={selectedBiz}
        onClose={() => setShowSub(false)}
        onSaved={loadBusinesses}
      />
    </div>
  );
}
