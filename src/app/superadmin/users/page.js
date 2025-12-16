"use client";

import { useEffect, useState } from "react";
import { safeFetch } from "@/lib/safeFetch";
import {
  Users,
  Building2,
  Shield,
  Trash2,
} from "lucide-react";

export default function SuperAdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL | ACTIVE | DELETED
  const [roleFilter, setRoleFilter] = useState("ALL");     // ALL | CASHIER | ...

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const res = await safeFetch("/api/superadmin/users");
    if (res?.success) setUsers(res.users);
    setLoading(false);
  };

  /* ===================== FILTER LOGIC ===================== */

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();

    // 🔍 Text search
    const matchesSearch =
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.business?.name?.toLowerCase().includes(q);

    // 🟢 Status filter
    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "ACTIVE" && !u.business?.deleted) ||
      (statusFilter === "DELETED" && u.business?.deleted);

    // 🛡️ Role filter
    const matchesRole =
      roleFilter === "ALL" || u.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  /* ===================== UI ===================== */

  return (
    <div className="p-6 space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Users size={22} />
            Users Management
          </h1>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Search */}
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="DELETED">Deleted</option>
            </select>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ALL">All Roles</option>
              <option value="BUSINESS_ADMIN">Business Admin</option>
              <option value="ACCOUNTANT">Accountant</option>
              <option value="STOREKEEPER">Storekeeper</option>
              <option value="CASHIER">Cashier</option>
              <option value="DELIVERY">Delivery</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-3">
        {loading && (
          <div className="bg-white rounded-xl p-6 border text-gray-500">
            Loading users...
          </div>
        )}

        {!loading && filteredUsers.length === 0 && (
          <div className="bg-white rounded-xl p-6 border text-gray-500">
            No users match your filters
          </div>
        )}

        {!loading &&
          filteredUsers.map((u) => (
            <div
              key={u.id}
              className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 hover:shadow-md transition"
            >
              {/* User Info */}
              <div className="space-y-1">
                <p className="font-medium text-gray-900">
                  {u.name || "—"}
                </p>
                <p className="text-xs text-gray-500">{u.email}</p>

                {u.business && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Building2 size={14} />
                    {u.business.name}
                    {!u.business.active && (
                      <span className="text-xs text-red-500">
                        (Inactive)
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {/* Role */}
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                  <Shield size={12} />
                  {u.role}
                </span>

                {/* Status */}
                {u.business?.deleted ? (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    Business Deleted
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Active
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                <button
                  title="Remove User"
                  className="p-2 rounded-xl hover:bg-red-50 text-red-600 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
