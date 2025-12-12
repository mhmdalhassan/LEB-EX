"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  User,
  MapPin,
  Phone,
  BadgeDollarSign,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_COLORS = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-blue-100 text-blue-700",
  "In Progress": "bg-purple-100 text-purple-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function BookingsPage() {
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerName: "Ahmad Khalil",
      customerPhone: "+961 70 123 456",
      service: "VIP Haircut Package",
      date: "2025-12-11",
      time: "10:30 AM",
      staff: "Omar",
      status: "Confirmed",
      location: "Hamra, Beirut",
      price: 25,
      notes: "Prefers low fade, no beard.",
      pointsEarned: 50,
    },
    {
      id: 2,
      customerName: "Sara Ali",
      customerPhone: "+961 71 987 654",
      service: "Color & Style",
      date: "2025-12-11",
      time: "12:00 PM",
      staff: null,
      status: "Pending",
      location: "Hamra, Beirut",
      price: 60,
      notes: "Full color + curls.",
      pointsEarned: 120,
    },
    {
      id: 3,
      customerName: "Mohammad Z",
      customerPhone: "+961 76 222 333",
      service: "Basic Haircut",
      date: "2025-12-12",
      time: "3:15 PM",
      staff: "Ali",
      status: "In Progress",
      location: "Hamra, Beirut",
      price: 10,
      notes: "",
      pointsEarned: 20,
    },
    {
      id: 4,
      customerName: "Lama F",
      customerPhone: "+961 76 555 111",
      service: "Color & Style",
      date: "2025-12-10",
      time: "5:45 PM",
      staff: "Rana",
      status: "Completed",
      location: "Hamra, Beirut",
      price: 65,
      notes: "Customer likes warm tones.",
      pointsEarned: 130,
    },
  ]);

  const staffOptions = ["Omar", "Ali", "Rana", "Hussein"];

  const filteredBookings =
    filterStatus === "All"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  const openDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetails(true);
  };

  const updateBookingStatus = (bookingId, status) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking((prev) => ({ ...prev, status }));
    }
  };

  const assignStaff = (bookingId, staffName) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, staff: staffName } : b))
    );
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking((prev) => ({ ...prev, staff: staffName }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      <main className="p-4 lg:p-8 space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-2xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium mb-3">
                <Calendar size={14} />
                <span>Bookings & Service Requests</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">
                Manage your daily bookings
              </h2>
              <p className="text-blue-100 max-w-xl text-sm">
                Confirm, reschedule, assign staff, and track the status of all
                customer bookings and service requests.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="flex items-center gap-2 text-xs bg-white/15 rounded-full px-3 py-1">
                <Clock size={14} className="text-blue-50" />
                <span className="text-blue-50">Live overview</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-100">
                <Users size={14} />
                <span>Assign bookings to your staff in one click</span>
              </div>
            </div>
          </div>
        </div>

        {/* FILTERS + SUMMARY */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {["All", "Pending", "Confirmed", "In Progress", "Completed", "Cancelled"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition border ${
                    filterStatus === status
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-slate-900 text-gray-200 border-slate-700 hover:bg-slate-800"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-300">
            <div className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>
                Completed today:{" "}
                {
                  bookings.filter(
                    (b) => b.status === "Completed" && b.date === "2025-12-11"
                  ).length
                }
              </span>
            </div>
            <div className="flex items-center gap-1">
              <AlertTriangle size={14} className="text-amber-300" />
              <span>
                Pending: {bookings.filter((b) => b.status === "Pending").length}
              </span>
            </div>
          </div>
        </div>

        {/* BOOKINGS TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Bookings list
            </h3>
            <p className="text-xs text-gray-500">
              Total: {filteredBookings.length} bookings
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-600 text-left border-b">
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Service</th>
                  <th className="pb-3">Date & Time</th>
                  <th className="pb-3">Staff</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => openDetails(booking)}
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-semibold">
                          {booking.customerName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {booking.customerName}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            {booking.customerPhone}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 text-gray-800">{booking.service}</td>

                    <td className="py-3 text-gray-700">
                      <div className="flex flex-col text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} className="text-gray-400" />
                          {booking.date}
                        </span>
                        <span className="flex items-center gap-1 mt-0.5">
                          <Clock size={13} className="text-gray-400" />
                          {booking.time}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 text-gray-800">
                      {booking.staff ? (
                        <span className="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded-full">
                          <User size={12} className="text-slate-600" />
                          {booking.staff}
                        </span>
                      ) : (
                        <span className="text-[11px] text-amber-600 flex items-center gap-1">
                          <AlertTriangle size={12} />
                          Not assigned
                        </span>
                      )}
                    </td>

                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          STATUS_COLORS[booking.status]
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td
                      className="py-3 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => openDetails(booking)}
                        className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-slate-900 text-white hover:bg-slate-800"
                      >
                        View
                        <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredBookings.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-6 text-center text-sm text-gray-500"
                    >
                      No bookings found for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* DETAILS MODAL */}
        {showDetails && selectedBooking && (
          <BookingDetailsModal
            booking={selectedBooking}
            onClose={() => setShowDetails(false)}
            onStatusChange={updateBookingStatus}
            onAssignStaff={assignStaff}
            staffOptions={staffOptions}
          />
        )}
      </main>
    </div>
  );
}

/***************************************
 *  BOOKINGS DETAILS MODAL COMPONENT
 ***************************************/
function BookingDetailsModal({
  booking,
  onClose,
  onStatusChange,
  onAssignStaff,
  staffOptions,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Booking details
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              STATUS_COLORS[booking.status]
            }`}
          >
            {booking.status}
          </span>
        </div>

        {/* Customer & Service Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800">
              Customer details
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-semibold">
                {booking.customerName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {booking.customerName}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Phone size={12} className="text-gray-400" />
                  {booking.customerPhone}
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin size={12} className="text-gray-400" />
              {booking.location}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800">
              Service details
            </h3>
            <p className="text-sm text-gray-900">{booking.service}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar size={12} className="text-gray-400" />
              {booking.date}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock size={12} className="text-gray-400" />
              {booking.time}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <BadgeDollarSign size={12} className="text-gray-400" />
              {booking.price} USD · {booking.pointsEarned} points
            </p>
          </div>
        </div>

        {/* Staff & Status Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Assigned staff
            </h3>
            <select
              className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={booking.staff || ""}
              onChange={(e) =>
                onAssignStaff(booking.id, e.target.value || null)
              }
            >
              <option value="">Not assigned</option>
              {staffOptions.map((staff) => (
                <option key={staff} value={staff}>
                  {staff}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-gray-500 mt-1">
              Assign a staff member to handle this booking.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Update status
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => onStatusChange(booking.id, status)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                      booking.status === status
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">
            Notes
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 min-h-[48px]">
            {booking.notes || "No additional notes for this booking."}
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
