"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { safeFetch } from "@/lib/safeFetch";
import {
  UserX,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


/* ============================================================
   Super Admin - Business Users Page
============================================================ */
export default function BusinessUsersPage() {
  const { id } = useParams();
  const router = useRouter();


  /* -------------------- State -------------------- */
  const [users, setUsers] = useState([]);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  /* -------------------- Load Data -------------------- */
  const loadData = async () => {
    setLoading(true);

    const [usersRes, bizRes] = await Promise.all([
      safeFetch(`/api/superadmin/businesses/${id}/users`),
      safeFetch(`/api/superadmin/businesses`),
    ]);

    if (usersRes?.success) {
      setUsers(usersRes.users || []);
    }

    if (bizRes?.success) {
      const found = bizRes.businesses.find((b) => b.id === id);
      setBusiness(found || null);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  /* -------------------- Actions -------------------- */
  const toggleUserStatus = async (userId) => {
    const loadingToast = toast.loading("Updating user...");

    const res = await safeFetch(
      `/api/superadmin/businesses/${id}/users/${userId}/toggle`,
      { method: "PATCH" }
    );

    toast.dismiss(loadingToast);

    if (!res?.success) {
      return toast.error(res.message || "Failed to update user");
    }

    toast.success(
  res.user.deleted
    ? "User has been suspended"
    : "User has been removed"
);


    loadData();
  };

  /* -------------------- Helpers -------------------- */
  const roleBadge = (role) =>
    role === "BUSINESS_ADMIN" ? (
      <span className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-full font-semibold">
        Admin
      </span>
    ) : (
      <span className="px-3 py-1 bg-gray-200 text-xs rounded-full">
        User
      </span>
    );

  const statusBadge = (deleted) =>
    deleted ? (
      <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
        Suspended
      </span>
    ) : (
      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
        Active
      </span>
    );

  /* ============================================================
     UI
  ============================================================ */
  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {business?.name || "Business Users"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage users & admin roles for this business.
          </p>
        </div>

       <button
        onClick={() => router.push("/superadmin/businesses")}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition text-sm"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      </div>

      {/* ================= USERS CARD ================= */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Users</h2>
          <p className="text-sm text-gray-500 mt-1">
            All users linked to this business.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="p-6 text-center text-gray-500">
            Loading users...
          </div>
        )}

        {/* Empty */}
        {!loading && users.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No users found for this business.
          </div>
        )}

        {/* Table */}
        {!loading && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Email
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Role
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    {/* Email */}
                    <td className="px-5 py-4">{u.email}</td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      {roleBadge(u.role)}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      {statusBadge(u.deleted)}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {/* Suspend / Activate */}
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`p-2 rounded-lg hover:bg-gray-200 transition ${
                            u.deleted ? "text-green-600" : "text-red-600"
                          }`}
                          title={u.deleted ? "Activate User" : "Suspend User"}
                        >
                          {u.deleted ? "✔️" : <UserX size={18} />}
                        </button>

                        {/* Promote to Admin */}
                        {u.role !== "BUSINESS_ADMIN" && (
                          <button
                            onClick={() =>
                              (window.location.href =
                                `/superadmin/businesses/${id}?assignAdmin=true`)
                            }
                            className="p-2 rounded-lg hover:bg-gray-200 text-indigo-600 transition"
                            title="Set as Admin"
                          >
                            <ShieldCheck size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
