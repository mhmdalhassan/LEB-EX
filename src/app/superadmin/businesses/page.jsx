"use client";

import { useEffect, useState } from "react";
import { safeFetch } from "@/lib/safeFetch";

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

import AddBusinessModal from "@/components/superadmin/AddBusinessModal";
import AssignAdminModal from "@/components/superadmin/AssignAdminModal";
import EditBusinessModal from "@/components/superadmin/EditBusinessModal";
import EditSubscriptionModal from "@/components/superadmin/EditSubscriptionModal";

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState([]);
  const [filtered, setFiltered] = useState([]); // NEW
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(""); // NEW

  const [showAdd, setShowAdd] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showSub, setShowSub] = useState(false);

  const [selectedBiz, setSelectedBiz] = useState(null);

  // ============================================================
  // Load businesses
  // ============================================================
  const loadBusinesses = async () => {
    setLoading(true);
    const res = await safeFetch("/api/superadmin/businesses");

    if (res.success) {
      setBusinesses(res.businesses);
      setFiltered(res.businesses); // ← Important
    }

    setLoading(false);
  };

  useEffect(() => {
    loadBusinesses();
  }, []);

  // ============================================================
  // SEARCH FUNCTIONALITY
  // ============================================================
  const handleSearch = (value) => {
    setSearch(value);

    if (!value.trim()) {
      setFiltered(businesses);
      return;
    }

    const lower = value.toLowerCase();

    const results = businesses.filter((biz) => {
      return (
        biz.name.toLowerCase().includes(lower) ||
        biz.email.toLowerCase().includes(lower) ||
        (biz.industry || "").toLowerCase().includes(lower) ||
        (biz.phone || "").toLowerCase().includes(lower)
      );
    });

    setFiltered(results);
  };

  // ============================================================
  // TOGGLE STATUS
  // ============================================================
  const toggleStatus = async (id) => {
    const res = await safeFetch(`/api/superadmin/businesses/${id}/toggle`, {
      method: "PATCH",
    });

    if (res.success) loadBusinesses();
  };

  // ============================================================
  // DELETE BUSINESS
  // ============================================================
  const deleteBusiness = async (id) => {
    if (!confirm("Are you sure you want to delete this business?")) return;

    const res = await safeFetch(`/api/superadmin/businesses/${id}`, {
      method: "DELETE",
    });

    if (res.success) loadBusinesses();
  };

  // ============================================================
  // Status Badge Component
  // ============================================================
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

  // ============================================================
  // UI
  // ============================================================
  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Businesses Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage businesses, assign admins, control access & more.
          </p>
        </div>

        {/* SEARCH BAR */}
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

        {/* ADD BUSINESS BUTTON */}
        <button
          onClick={() => setShowAdd(true)}
         className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          <Plus size={18} />
          Add Business
        </button>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">All Businesses</h2>
          <p className="text-sm text-gray-500 mt-1">
            Showing {filtered.length} businesses
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        )}

        {/* NO RESULTS */}
        {!loading && filtered.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No businesses found.
          </div>
        )}

        {/* TABLE */}
        {!loading && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filtered.map((biz) => (
                  <tr key={biz.id} className="hover:bg-gray-50">
                    {/* BUSINESS */}
                    <td className="px-5 py-4">
                      <div className="font-semibold text-gray-900">{biz.name}</div>
                      <div className="text-xs text-gray-500">{biz.industry}</div>
                    </td>

                    {/* CONTACT */}
                    <td className="px-5 py-4">
                      <div className="text-gray-800">{biz.email}</div>
                      <div className="text-xs text-gray-500">
                        {biz.phone || "No phone"}
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-4">{statusBadge(biz.active)}</td>

                    {/* ACTIONS */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">

                        {/* TOGGLE */}
                        <button
                          className="p-2 rounded-lg hover:bg-gray-200"
                          onClick={() => toggleStatus(biz.id)}
                        >
                          {biz.active ? (
                            <Pause size={18} className="text-gray-600" />
                          ) : (
                            <Play size={18} className="text-green-600" />
                          )}
                        </button>

                        {/* USERS */}
                        <button
                          onClick={() =>
                            (window.location.href = `/superadmin/businesses/${biz.id}/users`)
                          }
                          className="p-2 rounded-lg hover:bg-gray-200"
                        >
                          <Users size={18} className="text-gray-600" />
                        </button>

                        {/* ASSIGN ADMIN */}
                        <button
                          onClick={() => {
                            setSelectedBiz(biz);
                            setShowAssign(true);
                          }}
                          className="p-2 rounded-lg hover:bg-gray-200"
                        >
                          <ShieldCheck size={18} className="text-indigo-600" />
                        </button>

                        {/* SUBSCRIPTION */}
                        <button
                          onClick={() => {
                            setSelectedBiz(biz);
                            setShowSub(true);
                          }}
                          className="p-2 rounded-lg hover:bg-gray-200"
                        >
                          <DollarSign size={18} className="text-yellow-600" />
                        </button>

                        {/* EDIT */}
                        <button
                          onClick={() => {
                            setSelectedBiz(biz);
                            setShowEdit(true);
                          }}
                          className="p-2 rounded-lg hover:bg-gray-200"
                        >
                          <Pencil size={18} className="text-blue-600" />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => deleteBusiness(biz.id)}
                          className="p-2 rounded-lg hover:bg-red-100"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

      {/* MODALS */}
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
