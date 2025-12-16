export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow text-center max-w-md">
        <h1 className="text-2xl font-bold mb-2">Maintenance Mode</h1>
        <p className="text-gray-600">
          The platform is currently under maintenance.
          <br />
          Please check back later.
        </p>
      </div>
    </div>
  );
}
