"use client";

import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { safeFetch } from "@/lib/safeFetch";

export default function NotificationBell() {
  const [count, setCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    loadCount();
  }, []);

  const loadCount = async () => {
    const res = await safeFetch(
      "/api/superadmin/notifications/unread-count"
    );
    if (res?.success) setCount(res.count);
  };

  return (
    <button
      onClick={() => router.push("/superadmin/notifications")}
      className="relative p-2 rounded-full hover:bg-gray-100"
      aria-label="Notifications"
    >
      <Bell size={20} className="text-gray-600" />

      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
