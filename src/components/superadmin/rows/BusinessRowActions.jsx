import {
  Users,
  ShieldCheck,
  DollarSign,
  Pause,
  Play,
  Pencil,
  Trash2,
} from "lucide-react";

export default function BusinessRowActions({
  business,
  onToggle,
  onDelete,
  onAssign,
  onEdit,
  onSubscription,
}) {
  return (
    <div className="flex justify-end gap-2">
      {/* Toggle */}
      <button
        onClick={() => onToggle(business.id)}
        className="p-2 rounded-lg hover:bg-gray-200"
      >
        {business.active ? (
          <Pause size={18} className="text-gray-600" />
        ) : (
          <Play size={18} className="text-green-600" />
        )}
      </button>

      {/* Users */}
      <button
        onClick={() =>
          (window.location.href =
            `/superadmin/businesses/${business.id}/users`)
        }
        className="p-2 rounded-lg hover:bg-gray-200"
      >
        <Users size={18} className="text-gray-600" />
      </button>

      {/* Assign Admin */}
      <button
        onClick={() => onAssign(business)}
        className="p-2 rounded-lg hover:bg-gray-200"
      >
        <ShieldCheck size={18} className="text-indigo-600" />
      </button>

      {/* Subscription */}
      <button
        onClick={() => onSubscription(business)}
        className="p-2 rounded-lg hover:bg-gray-200"
      >
        <DollarSign size={18} className="text-yellow-600" />
      </button>

      {/* Edit */}
      <button
        onClick={() => onEdit(business)}
        className="p-2 rounded-lg hover:bg-gray-200"
      >
        <Pencil size={18} className="text-blue-600" />
      </button>

      {/* Delete */}
      <button
        onClick={() => onDelete(business.id)}
        className="p-2 rounded-lg hover:bg-red-100"
      >
        <Trash2 size={18} className="text-red-600" />
      </button>
    </div>
  );
}
