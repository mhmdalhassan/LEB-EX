"use client";

import { useState } from "react";
import {
  Percent,
  BadgeDollarSign,
  Info,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function PointsSettingsPage() {
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState("percentage"); // "percentage" or "fixed"

  const [settings, setSettings] = useState({
    percentage: 5, // 5% default
    fixedPoints: 1, // earn 1 point per 1$
    minSpend: 0,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Points settings saved successfully!");
    }, 1200);
  };

  const calculatedPreview =
    mode === "percentage"
      ? ((settings.percentage / 100) * 100).toFixed(1)
      : settings.fixedPoints * 100;

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      <main className="p-4 lg:p-8 space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

          <div className="relative z-10 flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
              <Sparkles size={14} />
              <span>Loyalty Points System</span>
            </div>

            <h2 className="text-3xl font-bold">Configure Points Rewards</h2>
            <p className="text-indigo-100 max-w-xl text-sm">
              Set how customers earn loyalty points with every purchase.
              Points encourage repeat visits and increase engagement.
            </p>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-8">
          {/* MODE SELECTOR */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Points Calculation Method
            </h3>

            <div className="flex gap-2 mt-3 md:mt-0">
              <button
                onClick={() => setMode("percentage")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition border ${
                  mode === "percentage"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                Percentage
              </button>

              <button
                onClick={() => setMode("fixed")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition border ${
                  mode === "fixed"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                Fixed Points
              </button>
            </div>
          </div>

          {/* PERCENTAGE MODE */}
          {mode === "percentage" && (
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                Points Percentage
                <Info size={14} className="text-gray-400" />
              </label>

              <input
                type="number"
                min={1}
                max={100}
                value={settings.percentage}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    percentage: Number(e.target.value),
                  })
                }
                className="w-full bg-gray-100 text-gray-900 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <p className="text-xs text-gray-500 mt-1">
                Example: If you set 5%, customer earns 5 points for every 100$
                spent.
              </p>
            </div>
          )}

          {/* FIXED POINTS MODE */}
          {mode === "fixed" && (
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                Points Per Dollar
                <Info size={14} className="text-gray-400" />
              </label>

              <input
                type="number"
                min={1}
                max={100}
                value={settings.fixedPoints}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    fixedPoints: Number(e.target.value),
                  })
                }
                className="w-full bg-gray-100 text-gray-900 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <p className="text-xs text-gray-500 mt-1">
                Example: If you set 2, customer earns 2 points for every 1$.
              </p>
            </div>
          )}

          {/* MINIMUM SPEND */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-800 flex items-center gap-1">
              Minimum Spend Required
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <BadgeDollarSign size={16} />
              </span>

              <input
                type="number"
                min={0}
                value={settings.minSpend}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    minSpend: Number(e.target.value),
                  })
                }
                className="w-full bg-gray-100 text-gray-900 border border-gray-300 rounded-xl pl-10 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Customer must spend at least this amount to earn points.
              (Set 0 to always award points.)
            </p>
          </div>

          {/* PREVIEW */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-900">
                Customer earns:
              </p>
              <p className="text-2xl font-bold text-blue-700 mt-1">
                {calculatedPreview} points
              </p>
              <p className="text-xs text-blue-700/70">
                Based on a 100$ purchase
              </p>
            </div>

            <ArrowRight size={32} className="text-blue-600" />
          </div>

          {/* SAVE BUTTON */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-600 px-8 py-3 rounded-xl text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2 shadow-md hover:shadow-lg disabled:bg-blue-400"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : null}
              Save Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
