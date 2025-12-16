export default function SubscriptionStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon size={20} className="text-white" />
              </div>
            </div>

            <div className="text-2xl font-bold text-gray-900">
              {stat.value}
            </div>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        );
      })}
    </div>
  );
}
