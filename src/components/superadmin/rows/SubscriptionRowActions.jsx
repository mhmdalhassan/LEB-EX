import { Eye, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubscriptionRowActions({
  business,
  onEdit,
  onRecordPayment,
}) {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      {/* Show Subscription Details */}
      <button
        onClick={() =>
          router.push(`/superadmin/subscriptions/${business.id}`)
        }
        className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
        title="View Subscription"
      >
        <Eye size={16} />
      </button>

      {/* Edit Subscription */}
      <button
        onClick={() => onEdit(business)}
        className="p-2 hover:bg-green-50 rounded-lg text-green-600"
        title="Edit Subscription"
      >
        <Edit size={16} />
      </button>

      
    </div>
  );
}
