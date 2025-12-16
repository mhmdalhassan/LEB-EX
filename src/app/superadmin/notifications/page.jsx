"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { safeFetch } from "@/lib/safeFetch";

export default function SuperAdminNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL"); // ALL | UNREAD

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    const res = await safeFetch("/api/superadmin/notifications");
if (res?.success) {
  setNotifications(res.notifications || []);
}
    setLoading(false);
  };

  const markAsRead = async (id) => {
    await safeFetch(`/api/superadmin/notifications/${id}/read`, {
      method: "PATCH",
    });
    loadNotifications();
  };

  const markAllAsRead = async () => {
    await safeFetch("/api/superadmin/notifications/mark-all-read", {
      method: "PATCH",
    });
    loadNotifications();
  };

  const visible =
  filter === "UNREAD"
    ? notifications.filter((n) => !n.isRead)
    : notifications ?? [];


  const typeStyle = (type) => {
    switch (type) {
      case "SUCCESS":
        return "border-green-200 bg-green-50";
      case "WARNING":
        return "border-yellow-200 bg-yellow-50";
      case "ERROR":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-white";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Bell size={22} /> Notifications
        </h1>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-3 py-1 rounded ${
              filter === "ALL"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("UNREAD")}
            className={`px-3 py-1 rounded ${
              filter === "UNREAD"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Unread
          </button>
          <button
            onClick={markAllAsRead}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
          >
            Mark all as read
          </button>
        </div>
      </div>

      {/* Content */}
      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && visible.length === 0 && (
        <p className="text-gray-500">
          {filter === "UNREAD"
            ? "No unread notifications 🎉"
            : "No notifications yet"}
        </p>
      )}

      <div className="space-y-3">
        {visible.map((n) => (
          <div
            key={n.id}
            className={`border rounded-xl p-4 flex justify-between items-start ${typeStyle(
              n.type
            )} ${n.isRead ? "opacity-80" : ""}`}
          >
            <div>
              <h3 className="font-medium">{n.title}</h3>
              <p className="text-sm text-gray-600">{n.message}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>

            {!n.isRead && (
              <button
                onClick={() => markAsRead(n.id)}
                className="text-xs px-3 py-1 rounded bg-indigo-600 text-white"
              >
                Mark as read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
