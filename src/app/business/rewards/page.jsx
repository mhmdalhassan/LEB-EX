"use client";

import { useState } from "react";
import {
  Gift,
  Plus,
  Tags,
  Percent,
  Calendar,
  X,
  Sparkles,
  Trash2,
  Pencil,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function RewardsPage() {
  const [showAddReward, setShowAddReward] = useState(false);
  const [showAddDiscount, setShowAddDiscount] = useState(false);
  const [selected, setSelected] = useState(null);

  const [rewards, setRewards] = useState([
    {
      id: 1,
      title: "Free Haircut",
      pointsRequired: 350,
      active: true,
    },
    {
      id: 2,
      title: "20% Off Any Service",
      pointsRequired: 200,
      active: true,
    },
    {
      id: 3,
      title: "VIP Package Upgrade",
      pointsRequired: 500,
      active: false,
    },
  ]);

  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      title: "Holiday Offer",
      percentage: 15,
      expires: "2025-12-30",
      active: true,
    },
    {
      id: 2,
      title: "Weekend Special",
      percentage: 10,
      expires: "2025-12-15",
      active: false,
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    pointsRequired: "",
    percentage: "",
    expires: "",
  });

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      <main className="p-4 lg:p-8 space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-2xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
              <Sparkles size={14} />
              <span>Rewards & Discounts</span>
            </div>

            <h2 className="text-3xl font-bold">Manage Loyalty Campaigns</h2>
            <p className="text-pink-100 max-w-xl text-sm">
              Create attractive rewards and discount offers to encourage repeat
              customers and increase brand loyalty.
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowAddReward(true)}
                className="bg-white text-purple-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                <Plus size={16} className="inline mr-1" />
                Add Reward
              </button>

              <button
                onClick={() => setShowAddDiscount(true)}
                className="bg-white text-pink-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                <Plus size={16} className="inline mr-1" />
                Add Discount
              </button>
            </div>
          </div>
        </div>

        {/* REWARDS TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rewards</h3>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-600 text-left border-b">
                <th className="pb-3">Reward</th>
                <th className="pb-3">Points Required</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rewards.map((reward) => (
                <tr key={reward.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 font-medium text-gray-900">
                    {reward.title}
                  </td>
                  <td className="py-3 text-gray-800">
                    {reward.pointsRequired} pts
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        reward.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {reward.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <RewardActions
                      item={reward}
                      list={rewards}
                      setList={setRewards}
                      setForm={setForm}
                      setSelected={setSelected}
                      setShowModal={setShowAddReward}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DISCOUNTS TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Discounts</h3>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-600 text-left border-b">
                <th className="pb-3">Discount</th>
                <th className="pb-3">Percentage</th>
                <th className="pb-3">Expires</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {discounts.map((discount) => (
                <tr key={discount.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 font-medium text-gray-900">
                    {discount.title}
                  </td>
                  <td className="py-3">{discount.percentage}%</td>
                  <td className="py-3 text-gray-700 flex items-center gap-1">
                    <Calendar size={14} className="text-gray-400" />
                    {discount.expires}
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        discount.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {discount.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <RewardActions
                      item={discount}
                      list={discounts}
                      setList={setDiscounts}
                      setForm={setForm}
                      setSelected={setSelected}
                      setShowModal={setShowAddDiscount}
                      isDiscount
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ADD / EDIT MODALS */}
        {showAddReward && (
          <RewardModal
            title={selected ? "Edit Reward" : "Add Reward"}
            form={form}
            setForm={setForm}
            onClose={() => {
              setShowAddReward(false);
              setSelected(null);
              setForm({ title: "", pointsRequired: "" });
            }}
            onSubmit={() => {
              if (selected) {
                setRewards(
                  rewards.map((r) =>
                    r.id === selected.id ? { ...r, ...form } : r
                  )
                );
              } else {
                setRewards([
                  ...rewards,
                  {
                    ...form,
                    id: Date.now(),
                    active: true,
                  },
                ]);
              }
              setShowAddReward(false);
              setSelected(null);
              setForm({ title: "", pointsRequired: "" });
            }}
          />
        )}

        {showAddDiscount && (
          <DiscountModal
            title={selected ? "Edit Discount" : "Add Discount"}
            form={form}
            setForm={setForm}
            onClose={() => {
              setShowAddDiscount(false);
              setSelected(null);
              setForm({ title: "", percentage: "", expires: "" });
            }}
            onSubmit={() => {
              if (selected) {
                setDiscounts(
                  discounts.map((d) =>
                    d.id === selected.id ? { ...d, ...form } : d
                  )
                );
              } else {
                setDiscounts([
                  ...discounts,
                  {
                    ...form,
                    id: Date.now(),
                    active: true,
                  },
                ]);
              }
              setShowAddDiscount(false);
              setSelected(null);
              setForm({ title: "", percentage: "", expires: "" });
            }}
          />
        )}
      </main>
    </div>
  );
}

/*****************************************
 *  ACTION BUTTON COMPONENT (EDIT/DELETE)
 *****************************************/
function RewardActions({
  item,
  list,
  setList,
  setForm,
  setSelected,
  setShowModal,
  isDiscount = false,
}) {
  return (
    <div className="flex items-center justify-end gap-2">
      {/* EDIT */}
      <button
        onClick={() => {
          setSelected(item);
          setForm(item);
          setShowModal(true);
        }}
        className="text-blue-600 hover:text-blue-800"
      >
        <Pencil size={16} />
      </button>

      {/* DELETE */}
      <button
        onClick={() => setList(list.filter((r) => r.id !== item.id))}
        className="text-red-600 hover:text-red-800"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

/*****************************************
 *  REWARD MODAL
 *****************************************/
function RewardModal({ title, form, setForm, onClose, onSubmit }) {
  return (
    <ModalTemplate title={title} onClose={onClose}>
      <InputField
        label="Reward Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        icon={<Gift size={16} />}
      />

      <InputField
        label="Points Required"
        type="number"
        value={form.pointsRequired}
        onChange={(e) =>
          setForm({ ...form, pointsRequired: Number(e.target.value) })
        }
        icon={<Sparkles size={16} />}
      />

      <SubmitButton onSubmit={onSubmit} label="Save Reward" />
    </ModalTemplate>
  );
}

/*****************************************
 *  DISCOUNT MODAL
 *****************************************/
function DiscountModal({ title, form, setForm, onClose, onSubmit }) {
  return (
    <ModalTemplate title={title} onClose={onClose}>
      <InputField
        label="Discount Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        icon={<Tags size={16} />}
      />

      <InputField
        label="Discount Percentage"
        type="number"
        value={form.percentage}
        onChange={(e) =>
          setForm({ ...form, percentage: Number(e.target.value) })
        }
        icon={<Percent size={16} />}
      />

      <InputField
        label="Expiry Date"
        type="date"
        value={form.expires}
        onChange={(e) => setForm({ ...form, expires: e.target.value })}
        icon={<Calendar size={16} />}
      />

      <SubmitButton onSubmit={onSubmit} label="Save Discount" />
    </ModalTemplate>
  );
}

/*****************************************
 *  SHARED UI COMPONENTS
 *****************************************/
function ModalTemplate({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>

        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, icon, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-800">{label}</label>

      <div className="relative mt-1">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full bg-gray-100 text-gray-900 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
    </div>
  );
}

function SubmitButton({ onSubmit, label }) {
  return (
    <button
      onClick={onSubmit}
      className="w-full bg-blue-600 py-2 rounded-xl text-white font-semibold hover:bg-blue-700 transition"
    >
      {label}
    </button>
  );
}
