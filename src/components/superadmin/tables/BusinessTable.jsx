import BusinessRowActions from "../rows/BusinessRowActions";

export default function BusinessTable({
  businesses,
  loading,
  statusBadge,
  onToggle,
  onDelete,
  onAssign,
  onEdit,
  onSubscription,
}) {
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!businesses.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        No businesses found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Business
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Contact
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Status
            </th>
            <th className="px-5 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {businesses.map((biz) => (
            <tr key={biz.id} className="hover:bg-gray-50">
              <td className="px-5 py-4">
                <div className="font-semibold text-gray-900">
                  {biz.name}
                </div>
                <div className="text-xs text-gray-500">
                  {biz.industry}
                </div>
              </td>

              <td className="px-5 py-4">
                <div className="text-gray-800">{biz.email}</div>
                <div className="text-xs text-gray-500">
                  {biz.phone || "No phone"}
                </div>
              </td>

              <td className="px-5 py-4">
                {statusBadge(biz.active)}
              </td>

              <td className="px-5 py-4 text-right">
                <BusinessRowActions
                  business={biz}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onAssign={onAssign}
                  onEdit={onEdit}
                  onSubscription={onSubscription}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
