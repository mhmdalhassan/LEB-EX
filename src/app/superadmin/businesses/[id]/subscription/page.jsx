// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { safeFetch } from "@/lib/safeFetch";
// import {
//   DollarSign,
//   Calendar,
//   AlertTriangle,
//   CheckCircle,
// } from "lucide-react";
// import { toast } from "sonner";

// /* ============================================================
//    Super Admin - Business Subscription Page
// ============================================================ */
// export default function BusinessSubscriptionPage() {
//   const { id } = useParams();

//   /* -------------------- State -------------------- */
//   const [business, setBusiness] = useState(null);
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [price, setPrice] = useState(0);
//   const [plan, setPlan] = useState("Basic");
//   const [status, setStatus] = useState("ACTIVE");

//   /* -------------------- Load Data -------------------- */
//   const loadData = async () => {
//     setLoading(true);

//     const [bizRes, invRes] = await Promise.all([
//       safeFetch("/api/superadmin/businesses"),
//       safeFetch(`/api/superadmin/invoices?businessId=${id}`),
//     ]);

//     if (bizRes?.success) {
//       const found = bizRes.businesses.find((b) => b.id === id);
//       if (found) {
//         setBusiness(found);
//         setPrice(found.subscriptionPrice || 0);
//         setPlan(found.subscriptionPlan || "Basic");
//         setStatus(found.subscriptionStatus || "ACTIVE");
//       }
//     }

//     if (invRes?.success) {
//       setInvoices(invRes.invoices || []);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     loadData();
//   }, [id]);

//   /* -------------------- Actions -------------------- */
//   const saveSubscription = async () => {
//     const toastId = toast.loading("Saving subscription...");

//     const res = await safeFetch(
//       "/api/superadmin/businesses/update-subscription",
//       {
//         method: "POST",
//         body: {
//           businessId: id,
//           subscriptionPrice: price,
//           subscriptionPlan: plan,
//           subscriptionStatus: status,
//         },
//       }
//     );

//     toast.dismiss(toastId);

//     if (!res?.success) {
//       return toast.error(res.message || "Failed to update subscription");
//     }

//     toast.success("Subscription updated");
//     loadData();
//   };

//   /* -------------------- Helpers -------------------- */
//   const statusBadge = {
//     ACTIVE: "bg-green-100 text-green-700",
//     SUSPENDED: "bg-yellow-100 text-yellow-800",
//     EXPIRED: "bg-red-100 text-red-700",
//   };

//   /* ============================================================
//      UI
//   ============================================================ */
//   if (loading) {
//     return (
//       <div className="text-center text-gray-500 p-8">
//         Loading subscription...
//       </div>
//     );
//   }

//   if (!business) {
//     return (
//       <div className="text-center text-red-500 p-8">
//         Business not found.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* ================= HEADER ================= */}
//       <div>
//         <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
//           Subscription – {business.name}
//         </h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage plan, pricing, status & billing.
//         </p>
//       </div>

//       {/* ================= SUBSCRIPTION CARD ================= */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* Price */}
//           <div>
//             <label className="text-xs font-semibold text-gray-600">
//               Monthly Price
//             </label>
//             <div className="flex items-center mt-1">
//               <DollarSign size={16} className="text-gray-400" />
//               <input
//                 type="number"
//                 value={price}
//                 onChange={(e) => setPrice(Number(e.target.value))}
//                 className="ml-2 w-full border rounded-lg px-3 py-2 text-sm"
//               />
//             </div>
//           </div>

//           {/* Plan */}
//           <div>
//             <label className="text-xs font-semibold text-gray-600">
//               Plan
//             </label>
//             <input
//               value={plan}
//               onChange={(e) => setPlan(e.target.value)}
//               className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
//             />
//           </div>

//           {/* Status */}
//           <div>
//             <label className="text-xs font-semibold text-gray-600">
//               Status
//             </label>
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
//             >
//               <option value="ACTIVE">ACTIVE</option>
//               <option value="SUSPENDED">SUSPENDED</option>
//               <option value="EXPIRED">EXPIRED</option>
//             </select>
//           </div>
//         </div>

//         <button
//           onClick={saveSubscription}
//           className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
//         >
//           Save Subscription
//         </button>
//       </div>

//       {/* ================= INVOICES ================= */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//         <div className="p-5 border-b border-gray-100">
//           <h2 className="text-lg font-semibold text-gray-900">
//             Invoices
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Payment history for this business.
//           </p>
//         </div>

//         {invoices.length === 0 && (
//           <div className="p-6 text-center text-gray-500">
//             No invoices yet.
//           </div>
//         )}

//         {invoices.length > 0 && (
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50 border-b border-gray-100">
//               <tr>
//                 <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                   Amount
//                 </th>
//                 <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                   Period
//                 </th>
//                 <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                   Paid At
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {invoices.map((inv) => (
//                 <tr key={inv.id}>
//                   <td className="px-5 py-4">
//                     ${inv.amount.toFixed(2)}
//                   </td>
//                   <td className="px-5 py-4">{inv.period}</td>
//                   <td className="px-5 py-4">
//                     {new Date(inv.paidAt).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }
