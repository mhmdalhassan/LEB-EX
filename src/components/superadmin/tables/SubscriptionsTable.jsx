import SubscriptionRowActions from "../rows/SubscriptionRowActions";

export default function SubscriptionsTable({
  businesses,
  getStatusBadge,
  onEdit,
  
}) {
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
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Business
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Plan
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {businesses.map((biz) => {
            const status = getStatusBadge(biz);

            return (
              <tr key={biz.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">
                    {biz.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {biz.email}
                  </div>
                </td>

                <td className="px-6 py-4">
                  {biz.subscriptionPlan || "Basic"}
                </td>

                <td className="px-6 py-4">
                  ${(biz.subscriptionPrice || 0).toFixed(2)}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${status.classes}`}
                  >
                    {status.label}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <SubscriptionRowActions
                    business={biz}
                    onEdit={onEdit}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
