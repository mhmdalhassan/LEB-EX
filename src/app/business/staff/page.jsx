"use client";

import { useState } from "react";
import {
  Users,
  Plus,
  UserCog,
  UserPlus,
  ShieldCheck,
  Phone,
  Mail,
  LockKeyhole,
  BadgeCheck,
  Trash2,
  Pencil,
  X,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function StaffPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const [selectedStaff, setSelectedStaff] = useState(null);

  const roles = [
    "Admin",
    "Cashier",
    "Inventory Manager",
    "Delivery",
    "Reception",
    "Service Provider",
  ];

  const [staff, setStaff] = useState([
    {
      id: 1,
      name: "Omar Khaled",
      email: "omar@example.com",
      phone: "+96170123456",
      role: "Cashier",
      active: true,
    },
    {
      id: 2,
      name: "Rana Hassan",
      email: "rana@example.com",
      phone: "+96171123456",
      role: "Inventory Manager",
      active: true,
    },
    {
      id: 3,
      name: "Ali Ahmad",
      email: "ali@example.com",
      phone: "+96176123456",
      role: "Delivery",
      active: false,
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Cashier",
  });

  const handleAdd = () => {
    setStaff([...staff, { ...form, id: Date.now(), active: true }]);
    setShowAdd(false);
    setForm({ name: "", email: "", phone: "", role: "Cashier" });
  };

  const handleEdit = () => {
    setStaff(
      staff.map((s) => (s.id === selectedStaff.id ? { ...selectedStaff } : s))
    );
    setShowEdit(false);
    setSelectedStaff(null);
  };

  const handleDelete = (id) => {
    setStaff(staff.filter((s) => s.id !== id));
  };

  const handleResetPassword = () => {
    alert("Password reset link sent to staff email!");
    setShowReset(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      <main className="p-4 lg:p-8 space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
              <Users size={14} />
              <span>Internal Staff Management</span>
            </div>

            <h2 className="text-3xl font-bold">Manage Your Team</h2>
            <p className="text-indigo-100 max-w-xl text-sm">
              Add staff, assign roles, update access, and manage your internal
              team members easily.
            </p>

            <button
              onClick={() => setShowAdd(true)}
              className="mt-4 bg-white text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              <UserPlus size={16} className="inline mr-1" />
              Add New Staff
            </button>
          </div>
        </div>

        {/* STAFF TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Staff Members
          </h3>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-600 text-left border-b">
                <th className="pb-3">Staff</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition">
                  {/* Staff Name + Email */}
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="py-3">{member.role}</td>

                  {/* Phone */}
                  <td className="py-3 text-gray-800">{member.phone}</td>

                  {/* Status */}
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        member.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {member.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="py-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedStaff(member);
                        setShowEdit(true);
                      }}
                      className="mr-3 text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedStaff(member);
                        setShowReset(true);
                      }}
                      className="mr-3 text-purple-600 hover:text-purple-800"
                    >
                      <LockKeyhole size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ADD STAFF MODAL */}
        {showAdd && (
          <StaffModal
            title="Add New Staff"
            form={form}
            roles={roles}
            setForm={setForm}
            onClose={() => setShowAdd(false)}
            onSubmit={handleAdd}
          />
        )}

        {/* EDIT STAFF MODAL */}
        {showEdit && selectedStaff && (
          <StaffModal
            title="Edit Staff Member"
            form={selectedStaff}
            roles={roles}
            setForm={setSelectedStaff}
            onClose={() => setShowEdit(false)}
            onSubmit={handleEdit}
          />
        )}

        {/* RESET PASSWORD MODAL */}
        {showReset && selectedStaff && (
          <ResetPasswordModal
            staff={selectedStaff}
            onClose={() => setShowReset(false)}
            onSubmit={handleResetPassword}
          />
        )}
      </main>
    </div>
  );
}

/*************************************************
 *  STAFF MODAL (ADD + EDIT)
 *************************************************/
function StaffModal({ title, form, setForm, roles, onClose, onSubmit }) {
  return (
    <ModalTemplate title={title} onClose={onClose}>
      <InputField
        label="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        icon={<UserCog size={16} />}
      />

      <InputField
        label="Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        icon={<Mail size={16} />}
      />

      <InputField
        label="Phone Number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        icon={<Phone size={16} />}
      />

      {/* ROLE SELECT */}
      <div>
        <label className="text-sm font-semibold text-gray-800">Role</label>
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full bg-gray-100 text-gray-900 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none mt-1"
        >
          {roles.map((role) => (
            <option key={role}>{role}</option>
          ))}
        </select>
      </div>

      <SubmitButton onSubmit={onSubmit} label="Save Staff Member" />
    </ModalTemplate>
  );
}

/*************************************************
 *  RESET PASSWORD MODAL
 *************************************************/
function ResetPasswordModal({ staff, onClose, onSubmit }) {
  return (
    <ModalTemplate title="Reset Staff Password" onClose={onClose}>
      <p className="text-gray-700 text-sm leading-relaxed">
        You are about to send a password reset link to:
      </p>

      <div className="p-3 bg-gray-100 rounded-xl">
        <p className="font-semibold text-gray-900">{staff.name}</p>
        <p className="text-xs text-gray-600">{staff.email}</p>
      </div>

      <p className="text-xs text-gray-500">
        Once confirmed, the staff member will receive an email with reset
        instructions.
      </p>

      <SubmitButton onSubmit={onSubmit} label="Send Reset Link" />
    </ModalTemplate>
  );
}

/*************************************************
 *  SHARED COMPONENTS
 *************************************************/
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
