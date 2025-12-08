"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { safeFetch } from "@/lib/safeFetch";

export default function AssignAdminModal({ open, onClose, business, onSaved }) {
  if (!open || !business) return null;

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    const data = await safeFetch("/api/superadmin/users?noBusiness=true");

    if (!data.success) return;
    setUsers(data.users || []);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAssign = async () => {
    if (!selectedUser) {
      alert("Please select a user");
      return;
    }

    setLoading(true);
    const res = await safeFetch(`/api/superadmin/businesses/${business.id}/assign-admin`, {
      method: "POST",
      body: JSON.stringify({ userId: selectedUser }),
    });

    setLoading(false);

    if (!res.success) return alert(res.message);
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Assign Business Admin</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
            disabled={loading}
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-gray-600">
          Select a user to become the admin of:
          <span className="font-medium"> {business.name}</span>
        </p>

        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
        >
          <option value="">Select a user</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.email}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="border px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleAssign}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Assigning..." : "Assign Admin"}
          </button>
        </div>
      </div>
    </div>
  );
}
