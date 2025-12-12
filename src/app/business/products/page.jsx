"use client";

import { useState } from "react";
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  X,
  UploadCloud,
  BadgeDollarSign,
  Tags,
  Image,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function ProductsPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // sample data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "VIP Haircut Package",
      category: "Grooming",
      price: "25",
      image: "",
      active: true,
    },
    {
      id: 2,
      name: "Color & Style",
      category: "Beauty",
      price: "60",
      image: "",
      active: true,
    },
    {
      id: 3,
      name: "Basic Haircut",
      category: "Grooming",
      price: "10",
      image: "",
      active: false,
    },
  ]);

  // Add Product Fields
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  // Edit Product Fields
  const handleEditOpen = (product) => {
    setSelectedProduct(product);
    setNewProduct(product);
    setShowEdit(true);
  };

  // Delete Product
  const handleDeleteOpen = (product) => {
    setSelectedProduct(product);
    setShowDelete(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      <main className="p-4 lg:p-8 space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

          <div className="relative z-10 flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
              <Package size={14} />
              <span>Products & Services</span>
            </div>

            <h2 className="text-3xl font-bold">Manage Products</h2>
            <p className="text-blue-100 max-w-xl">
              Add, edit, and organize your available services or items.
            </p>

            <button
              onClick={() => setShowAdd(true)}
              className="mt-4 bg-white text-blue-700 px-4 py-2 w-fit rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              <Plus size={16} className="inline mr-1" />
              Add New Product
            </button>
          </div>
        </div>

        {/* PRODUCTS TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Product List
          </h3>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-600 text-left border-b">
                <th className="pb-3">Image</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="py-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Image size={18} className="text-gray-400" />
                      )}
                    </div>
                  </td>

                  <td className="py-3 font-medium text-gray-900">
                    {product.name}
                  </td>

                  <td className="py-3 text-gray-700">{product.category}</td>

                  <td className="py-3 font-semibold text-gray-900">
                    ${product.price}
                  </td>

                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="py-3 text-right">
                    <button
                      className="mr-3 text-blue-600 hover:text-blue-800"
                      onClick={() => handleEditOpen(product)}
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteOpen(product)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ADD PRODUCT MODAL */}
        {showAdd && (
          <Modal title="Add New Product" onClose={() => setShowAdd(false)}>
            <ProductForm
              product={newProduct}
              setProduct={setNewProduct}
              submitLabel="Add Product"
              onSubmit={() => {
                setProducts([...products, { ...newProduct, id: Date.now() }]);
                setShowAdd(false);
              }}
            />
          </Modal>
        )}

        {/* EDIT PRODUCT MODAL */}
        {showEdit && (
          <Modal title="Edit Product" onClose={() => setShowEdit(false)}>
            <ProductForm
              product={newProduct}
              setProduct={setNewProduct}
              submitLabel="Save Changes"
              onSubmit={() => {
                setProducts(
                  products.map((p) =>
                    p.id === selectedProduct.id ? newProduct : p
                  )
                );
                setShowEdit(false);
              }}
            />
          </Modal>
        )}

        {/* DELETE CONFIRMATION */}
        {showDelete && (
          <Modal title="Delete Product" onClose={() => setShowDelete(false)}>
            <p className="text-gray-800">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {selectedProduct?.name}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowDelete(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setProducts(products.filter((p) => p.id !== selectedProduct.id));
                  setShowDelete(false);
                }}
                className="px-5 py-2 rounded-lg bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </Modal>
        )}
      </main>
    </div>
  );
}

/*****************************************
 *   REUSABLE FORM & MODAL COMPONENTS
 *****************************************/

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>

        {children}
      </div>
    </div>
  );
}

function ProductForm({ product, setProduct, submitLabel, onSubmit }) {
  // Upload Preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setProduct({ ...product, image: preview });
  };

  return (
    <div className="space-y-4">
      {/* Image Upload */}
      <div>
        <label className="text-sm font-semibold text-gray-800">
          Product Image
        </label>

        <div className="w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden mt-2">
          {product.image ? (
            <img src={product.image} className="w-full h-full object-cover" />
          ) : (
            <Image size={32} className="text-gray-400" />
          )}
        </div>

        <label className="mt-2 flex items-center justify-center gap-2 cursor-pointer bg-gray-900 text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-800 transition w-fit">
          <UploadCloud size={16} />
          Upload Image
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>

      {/* Name */}
      <Input
        label="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        icon={<Package size={16} />}
      />

      {/* Category */}
      <Input
        label="Category"
        value={product.category}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
        icon={<Tags size={16} />}
      />

      {/* Price */}
      <Input
        label="Price"
        type="number"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        icon={<BadgeDollarSign size={16} />}
      />

      <button
        onClick={onSubmit}
        className="w-full bg-blue-600 py-2 rounded-xl text-white font-semibold hover:bg-blue-700 transition"
      >
        {submitLabel}
      </button>
    </div>
  );
}

function Input({ label, value, onChange, icon, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-800">{label}</label>
      <div className="relative mt-1">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full bg-gray-100 text-gray-900 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
    </div>
  );
}
