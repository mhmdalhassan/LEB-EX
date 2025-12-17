"use client";

import { useEffect, useState } from "react";
import { safeFetch } from "@/lib/safeFetch";
import { Plus, Pencil, Trash2, X, Tags } from "lucide-react";

export const dynamic = "force-dynamic";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  /* ===============================
     LOAD
  =============================== */
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await safeFetch("/api/business/categories");
    if (res?.success) setCategories(res.categories);
  };

  /* ===============================
     CREATE
  =============================== */
  const handleAdd = async () => {
    if (!name.trim()) return;

    const res = await safeFetch("/api/business/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    if (res?.success) {
      setName("");
      loadCategories();
    }
  };

  /* ===============================
     EDIT
  =============================== */
  const handleEditSave = async () => {
    const res = await safeFetch(
      `/api/business/categories/${selectedCategory.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ name: selectedCategory.name }),
      }
    );

    if (res?.success) {
      setShowEdit(false);
      setSelectedCategory(null);
      loadCategories();
    }
  };

  /* ===============================
     DELETE
  =============================== */
  const handleDelete = async () => {
    const res = await safeFetch(
      `/api/business/categories/${selectedCategory.id}`,
      { method: "DELETE" }
    );

    if (res?.success) {
      setShowDelete(false);
      setSelectedCategory(null);
      loadCategories();
    }
  };

  /* ===============================
     RENDER
  =============================== */
  return (
    <main className="p-4 lg:p-8 space-y-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <Tags size={22} />
          <h1 className="text-2xl font-bold">Categories</h1>
        </div>
        <p className="text-indigo-100 mt-2">
          Manage product categories for your business
        </p>
      </div>

      {/* ADD CATEGORY */}
      <div className="bg-white rounded-xl p-6 border space-y-3">
        <h2 className="font-semibold text-gray-900">Add New Category</h2>
        <div className="flex gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            className="flex-1 bg-gray-100 border border-gray-200 rounded-xl px-3 py-2"
          />
          <button
            onClick={handleAdd}
            disabled={!name.trim()}
            className={`px-4 py-2 rounded-xl font-semibold text-white ${
              !name.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* CATEGORY LIST */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{cat.name}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    className="mr-3 text-blue-600 hover:text-blue-800"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowEdit(true);
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowDelete(true);
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td
                  colSpan="2"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No categories yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {showEdit && (
        <Modal title="Edit Category" onClose={() => setShowEdit(false)}>
          <input
            value={selectedCategory.name}
            onChange={(e) =>
              setSelectedCategory({
                ...selectedCategory,
                name: e.target.value,
              })
            }
            className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2"
          />

          <button
            onClick={handleEditSave}
            className="mt-4 w-full bg-blue-600 py-2 rounded-xl text-white font-semibold"
          >
            Save Changes
          </button>
        </Modal>
      )}

      {/* DELETE MODAL */}
      {showDelete && (
        <Modal title="Delete Category" onClose={() => setShowDelete(false)}>
          <p className="text-gray-800">
            Are you sure you want to delete{" "}
            <span className="font-semibold">
              {selectedCategory.name}
            </span>
            ?
          </p>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => setShowDelete(false)}
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-5 py-2 rounded-lg bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
}

/* ===============================
   MODAL
=============================== */
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          <X size={18} />
        </button>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}
