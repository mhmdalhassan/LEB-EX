"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { safeFetch } from "@/lib/safeFetch";
import { UserPlus, ShieldCheck, UserX, ArrowLeft } from "lucide-react";
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



const handleSuspend = async (userId) => {
  const loadingToast = toast.loading("Updating user status...");

  const data = await safeFetch(
    `/api/superadmin/businesses/${id}/users/${userId}/toggle`,
    { method: "PATCH" }
  );

  if (!data.success) {
    toast.error(data.message || "Failed");
    toast.dismiss(loadingToast);
    return;
  }

  toast.success(data.user.deleted ? "User Suspended" : "User Activated");
  toast.dismiss(loadingToast);

  loadData();
};


  const handleAddAdmin = () => {
    window.location.href = `/superadmin/businesses/${id}?assignAdmin=true`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{business?.name || "Business"}</h1>
          <p className="text-gray-600 text-sm">
            Manage Business Admin for this branch
          </p>
        </div>
        <button
          onClick={() => (window.location.href = "/superadmin/businesses")}
          className="flex items-center gap-1 text-sm border px-3 py-2 rounded hover:bg-gray-50"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Users</h2>
        <button
          onClick={handleAddAdmin}
          className="flex items-center gap-2 bg-black text-white px-3 py-2 text-sm rounded hover:bg-gray-900"
        >
          <UserPlus size={16} /> Add Admin
        </button>
      </div>

      {loading && <div>Loading users...</div>}

      {!loading && users.length === 0 && (
        <p className="text-gray-500 text-center py-10">
          No users found for this business.
        </p>
      )}

      {!loading && users.length > 0 && (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="p-3">{u.email}</td>

                  <td className="p-3 font-medium">
                    {u.role === "BUSINESS_ADMIN" ? (
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded">
                        Admin
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-200 text-xs rounded">
                        User
                      </span>
                    )}
                  </td>

                  <td className="p-3">
                    {u.deleted ? (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-md">
                        Suspended
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-md">
                        Active
                      </span>
                    )}
                  </td>



                  <td className="p-3 text-right space-x-2">
  <button
    onClick={() => handleSuspend(u.id)}
    className={`p-2 rounded hover:bg-gray-100 ${
      u.deleted ? "text-green-600" : "text-red-600"
    }`}
    title={u.deleted ? "Activate" : "Suspend"}
  >
    {u.deleted ? "✔️" : <UserX size={18} />}
  </button>

  {u.role !== "BUSINESS_ADMIN" && (
    <button
      onClick={() =>
        (window.location.href = `/superadmin/businesses/${id}?assignAdmin=true`)
      }
      className="p-2 rounded hover:bg-gray-100 text-blue-600"
      title="Set as Admin"
    >
      <ShieldCheck size={18} />
    </button>
  )}
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
