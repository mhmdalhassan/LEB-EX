"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { safeFetch } from "@/lib/safeFetch";
import {
  UserPlus,
  ShieldCheck,
  UserX,
  ArrowLeft,
  Users,
} from "lucide-react";
import { toast } from "sonner";

export default function BusinessUsersPage() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);

    const usersRes = await safeFetch(`/api/superadmin/businesses/${id}/users`);
    const bizRes = await safeFetch(`/api/superadmin/businesses`);

    if (usersRes.success) setUsers(usersRes.users || []);

    if (bizRes.success) {
      const found = bizRes.businesses.find((b) => b.id === id);
      setBusiness(found || null);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  // Suspend / Activate user
  const handleSuspend = async (userId) => {
    const loadingToast = toast.loading("Updating user...");

    const result = await safeFetch(
      `/api/superadmin/businesses/${id}/users/${userId}/toggle`,
      { method: "PATCH" }
    );

    toast.dismiss(loadingToast);

    if (!result.success) {
      return toast.error(result.message || "Failed to update user");
    }

    toast.success(result.user.deleted ? "User Suspended" : "User Activated");
    loadData();
  };

  return (
    <div className="space-y-8">

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {business?.name || "Business Users"}
          </h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            Manage users & admin roles for this business.
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/superadmin/businesses")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition text-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* Users Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">

        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Users</h2>
            <p className="text-sm text-gray-500 mt-1">
              All users linked to this business.
            </p>
          </div>

          {/* Future: Add Admin button */}
          {/* <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">
            <UserPlus size={16} /> Add Admin
          </button> */}
        </div>

        {/* Loading */}
        {loading && (
          <div className="p-6 text-center text-gray-500">Loading users...</div>
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
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
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
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">{u.email}</td>

                    <td className="px-5 py-4">
                      {u.role === "BUSINESS_ADMIN" ? (
                        <span className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-full font-semibold">
                          Admin
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-200 text-xs rounded-full">
                          User
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      {u.deleted ? (
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                          Suspended
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Active
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">

                        {/* Suspend / Activate */}
                        <button
                          onClick={() => handleSuspend(u.id)}
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
                              (window.location.href = `/superadmin/businesses/${id}?assignAdmin=true`)
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
