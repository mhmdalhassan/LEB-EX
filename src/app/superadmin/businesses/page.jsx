// "use client";
// import { useEffect, useState } from "react";
// import AddBusinessModal from "@/components/superadmin/AddBusinessModal";
// import AssignAdminModal from "@/components/superadmin/AssignAdminModal";
// import EditSubscriptionModal from "@/components/superadmin/EditSubscriptionModal";

// export default function BusinessesPage() {
//   const [businesses, setBusinesses] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [assignBiz, setAssignBiz] = useState(null);
//   const [editBiz, setEditBiz] = useState(null);

//   const loadBusinesses = () => {
//     fetch("/api/superadmin/businesses")
//       .then((res) => res.json())
//       .then((data) => setBusinesses(data.businesses || []))
//       .catch((err) => console.error("Fetch error:", err));
//   };

//   useEffect(() => {
//     loadBusinesses();
//   }, []);

//   // Toggle Active / Suspend
//   const handleToggleActive = async (businessId) => {
//     try {
//       const res = await fetch("/api/superadmin/businesses/toggle-active", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ businessId }),
//       });

//       const data = await res.json();

//       if (!data.success) {
//         alert(data.message || "Failed to update business");
//         return;
//       }

//       loadBusinesses();
//     } catch (err) {
//       console.error("Toggle error:", err);
//       alert("Error toggling the business");
//     }
//   };

//   return (
//     <div className="p-6">

// {/* \\\\\\\\\\\\\\\\\\\\\\\\\Header\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}

//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold">Manage Businesses</h2>

//         <button
//           className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900"
//           onClick={() => setShowModal(true)}
//         >
//           + Add Business
//         </button>
//       </div>

//  {/*\\\\\\\\\\\\\\\\\\\\\\\\Add Business Modal\\\\\\\\\\\\\\\\\\\ */}

//       <AddBusinessModal
//         open={showModal}
//         onClose={() => setShowModal(false)}
//         onCreated={loadBusinesses}
//       />

//   {/*\\\\\\\\\\\\\\\\\\\\\ Assign Admin Modal\\\\\\\\\\\\\\\\\\\ */}

//       <AssignAdminModal
//         open={!!assignBiz}
//         business={assignBiz}
//         onClose={() => setAssignBiz(null)}
//         onAssigned={loadBusinesses}
//       />


// {/*\\\\\\\\\\\\\\\\\\\\\Edit Subscription Modal\\\\\\\\\\\\\\\\\\\ */}

//         <EditSubscriptionModal
//         open={!!editBiz}
//         business={editBiz}
//         onClose={() => setEditBiz(null)}
//         onSaved={loadBusinesses}
//         />


// {/*\\\\\\\\\\\\\\\\\\\\\\\\ Table \\\\\\\\\\\\\\\\\\\\\*/}

//       {businesses.length === 0 ? (
//         <p className="text-gray-600">No businesses found</p>
//       ) : (
//         <table className="w-full border text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2">Name</th>
//               <th className="p-2">Email</th>
//               <th className="p-2">Industry</th>
//               <th className="p-2">Owner</th>
//               <th className="p-2">Status</th>
//               <th className="p-2">Actions</th>
//               <th className="p-2">Subscription</th>

//             </tr>
//           </thead>

//           <tbody>
//             {businesses.map((biz) => (
//               <tr key={biz.id} className="border-t">
//                 <td className="p-2">{biz.name}</td>
//                 <td className="p-2">{biz.email}</td>
//                 <td className="p-2">{biz.industry}</td>
//                 <td className="p-2">{biz.owner?.email || "No Admin"}</td>
//                 <td className="p-2">{biz.active ? "Active" : "Suspended"}</td>
//                 <td className="p-2">{biz.subscriptionPrice? `${biz.subscriptionPrice} ${biz.currency}`: "Not Set"}</td>


//             <td className="p-2 flex gap-3">

// {/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\Suspend/Activate button\\\\\\\\\\\\\\\\\\\\\\\ */}

//              <button className={`px-3 py-1 rounded text-sm ${biz.active? "bg-red-100 text-red-700 hover:bg-red-200"
//                : "bg-green-100 text-green-700 hover:bg-green-200"}`}
//                onClick={() => handleToggleActive(biz.id)}>
//               {biz.active ? "Suspend" : "Activate"}
//               </button>

//  {/*\\\\\\\\\\\\\\\\\\\\\\\\ Assign Admin\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}

//               <button className="text-blue-600 underline text-sm"
//                onClick={() => setAssignBiz(biz)} >
//                     Assign Admin
//                </button>


// {/*\\\\\\\\\\\\\\\\\\\ Edit Subscription\\\\\\\\\\\\\\\\\\\\\ */}
//                <button
//                   className="text-purple-700 underline"
//                   onClick={() => setEditBiz(biz)}>
//                        Edit Subscription
//                 </button>




// {/* \\\\\\\\\\\\\\\\\\\\\\EDIT \\\\\\\\\\\\\\\\\\\\\\\\*/}

//               <button className="text-green-600 underline text-sm"
//               onClick={() => setAssignBiz({ ...biz, mode: "edit" })}>
//                         Edit
//               </button>

               
// {/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\Delete\\\\\\\\\\\\\\\\\\\\\\\\ */}
//               <button className="text-red-600 underline ml-3"
//               onClick={async () => {
//                 if (!confirm("Are you sure you want to delete this business?")) return;
//                     const res = await fetch(`/api/superadmin/businesses/${biz.id}`, {
//                         method: "DELETE",});
//                   let data = {};
//                       try {
//                         data = await res.json();
//                       } catch {
//                         alert("Delete failed: Server returned no response");
//                         return;
//                       }

//                       if (!data.success) {
//                         alert("Delete failed: " + (data.message || "Unknown error"));
//                         return;
//                       }
//                          loadBusinesses();
//                    }}>
//                         Delete
//                   </button>


// {/* \\\\\\\\\\\\\\\\\\\\\\\\\\Manage Users \\\\\\\\\\\\\\\\\\\\\\\ */}
//                   <button
//                     className="text-purple-600 underline text-sm"
//                     onClick={() => window.location.href = `/superadmin/businesses/${biz.id}/users`}>
//                     Manage Users
//                   </button>


// {/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\ Add User\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}

//                     <button
//                       className="bg-black text-white px-3 py-1 rounded text-sm"
//                       onClick={async () => {
//                         const email = prompt("Enter user email to add:");
//                         if (!email) return;
//                           const res = await fetch(`/api/superadmin/businesses/${biz.id}/users/add`, {
//                           method: "POST",
//                           headers: { "Content-Type": "application/json" },
//                           body: JSON.stringify({ email }),
//                         });
//                         const data = await res.json();
//                         if (!data.success) {
//                           alert("Failed to add user: " + data.message);
//                           return;
//                         }
//                         alert("User added successfully!");
//                         loadBusinesses();
//                       }}>
//                            + Add User
//                     </button>





//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }









"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, Users, ShieldCheck, DollarSign } from "lucide-react";
import { safeFetch } from "@/lib/safeFetch";
import AddBusinessModal from "@/components/superadmin/AddBusinessModal";
import AssignAdminModal from "@/components/superadmin/AssignAdminModal";
import EditBusinessModal from "@/components/superadmin/EditBusinessModal";
import EditSubscriptionModal from "@/components/superadmin/EditSubscriptionModal";

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showSub, setShowSub] = useState(false);

  const [selectedBiz, setSelectedBiz] = useState(null);

  const fetchBusinesses = async () => {
    setLoading(true);
    const data = await safeFetch("/api/superadmin/businesses");

    if (!data.success) {
      alert(data.message || "Failed to load businesses");
      setLoading(false);
      return;
    }

    setBusinesses(data.businesses || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this business?")) return;

    const data = await safeFetch(`/api/superadmin/businesses/${id}`, {
      method: "DELETE",
    });

    if (!data.success) {
      alert(data.message);
      return;
    }

    fetchBusinesses();
  };

  const handleToggleStatus = async (biz) => {
    const data = await safeFetch(`/api/superadmin/businesses/${biz.id}/toggle`, {
      method: "PATCH",
    });

    if (!data.success) {
      alert(data.message);
      return;
    }

    fetchBusinesses();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Businesses</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900"
          onClick={() => setShowAdd(true)}
        >
          + Add Business
        </button>
      </div>

      {/* Loading */}
      {loading && <div className="text-gray-600">Loading...</div>}

      {/* No Data */}
      {!loading && businesses.length === 0 && (
        <p className="text-gray-500 text-center py-10">
          No businesses yet...
        </p>
      )}

      {/* Table */}
      {!loading && businesses.length > 0 && (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="py-3 px-4">Business</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map((biz) => (
                <tr key={biz.id} className="border-t">
                  <td className="py-3 px-4 font-medium">{biz.name}</td>
                  <td className="py-3 px-4">{biz.email}</td>
                  <td className="py-3 px-4">{biz.phone || "-"}</td>
                  <td className="py-3 px-4">
                    {biz.active ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                        Suspended
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    {/* Toggle Status */}
                    <button
                      className="p-2 hover:bg-gray-200 rounded"
                      title={biz.active ? "Suspend" : "Activate"}
                      onClick={() => handleToggleStatus(biz)}
                    >
                      {biz.active ? "⏸️" : "▶️"}
                    </button>

                    {/* Users */}
                    <button
                      className="p-2 hover:bg-gray-200 rounded"
                      title="Manage Users"
                      onClick={() =>
                        (window.location.href = `/superadmin/businesses/${biz.id}/users`)
                      }
                    >
                      <Users size={18} />
                    </button>

                    {/* Assign Admin */}
                    <button
                      className="p-2 hover:bg-gray-200 rounded"
                      title="Assign Admin"
                      onClick={() => {
                        setSelectedBiz(biz);
                        setShowAssign(true);
                      }}
                    >
                      <ShieldCheck size={18} />
                    </button>

                    {/* Subscription */}
                    <button
                      className="p-2 hover:bg-gray-200 rounded"
                      title="Edit Subscription"
                      onClick={() => {
                        setSelectedBiz(biz);
                        setShowSub(true);
                      }}
                    >
                      <DollarSign size={18} />
                    </button>

                    {/* Edit */}
                    <button
                      className="p-2 hover:bg-gray-200 rounded"
                      title="Edit Business"
                      onClick={() => {
                        setSelectedBiz(biz);
                        setShowEdit(true);
                      }}
                    >
                      <Edit size={18} />
                    </button>

                    {/* Delete */}
                    <button
                      className="p-2 hover:bg-red-100 rounded text-red-600"
                      title="Delete Business"
                      onClick={() => handleDelete(biz.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      <AddBusinessModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onCreated={fetchBusinesses}
      />

      <AssignAdminModal
        open={showAssign}
        business={selectedBiz}
        onClose={() => setShowAssign(false)}
        onSaved={fetchBusinesses}
      />

      <EditBusinessModal
        open={showEdit}
        business={selectedBiz}
        onClose={() => setShowEdit(false)}
        onSaved={fetchBusinesses}
      />

      <EditSubscriptionModal
        open={showSub}
        business={selectedBiz}
        onClose={() => setShowSub(false)}
        onSaved={fetchBusinesses}
      />
    </div>
  );
}

