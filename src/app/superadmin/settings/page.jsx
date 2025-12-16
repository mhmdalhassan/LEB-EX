"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { safeFetch } from "@/lib/safeFetch";

import {
  Settings,
  CreditCard,
  DollarSign,
  Mail,
  Globe,
  Loader2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function SuperAdminSettingsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(null);
  const [dirty, setDirty] = useState(false);

  /* ================== LOAD SETTINGS ================== */
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const res = await safeFetch("/api/superadmin/settings");
    if (res?.success) {
      setSettings(res.settings);
      setDirty(false);
    }
  };

  /* ================== HANDLE CHANGE ================== */
  const handleChange = (key, value) => {
    setDirty(true);
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /* ================== SAVE SETTINGS ================== */
  const handleSave = async () => {
    setLoading(true);

    const res = await safeFetch("/api/superadmin/settings", {
      method: "PATCH",
      body: JSON.stringify(settings),
    });

    setLoading(false);

    if (res?.success) {
      setSettings(res.settings);
      setDirty(false);
      router.refresh();
      alert("Settings saved successfully");
    } else {
      alert("Failed to save settings");
    }
  };

  /* ================== LOADING ================== */
  if (!settings) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  /* ================== UI ================== */
  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      <main className="p-4 lg:p-8 space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl p-6 lg:p-8 text-white shadow-xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
              <Settings size={14} />
              Platform Settings
            </div>

            <h2 className="text-3xl font-bold">
              Super Admin Configuration
            </h2>

            <p className="text-blue-100 max-w-xl text-sm">
              Manage global platform behavior, subscriptions defaults,
              and system controls.
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-1 space-y-6">
            <Card title="Platform Information">
              <Input
                label="Platform Name"
                value={settings.platformName}
                onChange={(v) => handleChange("platformName", v)}
              />

              <Input
                label="Support Email"
                icon={<Mail size={16} />}
                value={settings.supportEmail || ""}
                onChange={(v) => handleChange("supportEmail", v)}
              />

              <Input
                label="Currency"
                icon={<Globe size={16} />}
                value={settings.currency}
                onChange={(v) => handleChange("currency", v)}
              />
            </Card>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 space-y-6">
            <Card title="Default Subscription Settings">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Default Plan"
                  value={settings.defaultPlan}
                  onChange={(v) =>
                    handleChange("defaultPlan", v)
                  }
                />

                <Input
                  label="Monthly Price"
                  type="number"
                  icon={<DollarSign size={16} />}
                  value={settings.defaultMonthlyPrice}
                  onChange={(v) =>
                    handleChange("defaultMonthlyPrice", Number(v))
                  }
                />

                <Select
                  label="Payment Method"
                  icon={<CreditCard size={16} />}
                  value={settings.defaultPaymentMethod}
                  onChange={(v) =>
                    handleChange("defaultPaymentMethod", v)
                  }
                  options={["CASH", "OMT", "WISH", "BANK", "OTHER"]}
                />
              </div>
            </Card>

            <Card title="System Control">
              <Toggle
                label="Maintenance Mode"
                description="Disable access for all non-admin users"
                value={settings.maintenanceMode}
                onChange={(v) =>
                  handleChange("maintenanceMode", v)
                }
              />
            </Card>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={loading || !dirty}
                className="bg-indigo-600 px-8 py-3 rounded-xl text-white disabled:bg-indigo-400"
              >
                {loading ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ================== UI HELPERS ================== */

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4 text-gray-900">
      <h3 className="text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, type = "text", icon }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-gray-100 border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options, icon }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-gray-100 border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 ${
            icon ? "pl-10" : ""
          }`}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function Toggle({ label, description, value, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      <input
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-5 w-5 accent-indigo-600"
      />
    </div>
  );
}
