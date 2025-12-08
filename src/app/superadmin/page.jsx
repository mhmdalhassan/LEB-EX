// export default function SuperAdminDashboard() {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-2">Super Admin Dashboard 🚀</h2>
//       <p className="text-gray-600">
//         Manage businesses, admins and system settings.
//       </p>
//     </div>
//   );
// }



"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs-motion";
import { BarChart, Building2, Users2 } from "lucide-react";

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-8">

      {/* Title */}
      <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>

      {/* Dashboard Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        
        <div className="bg-white p-5 rounded-lg shadow flex items-center gap-3">
          <Building2 className="text-blue-600" size={30} />
          <div>
            <p className="text-sm text-gray-600">Total Businesses</p>
            <p className="text-xl font-bold">0</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow flex items-center gap-3">
          <Users2 className="text-green-600" size={30} />
          <div>
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-xl font-bold">0</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow flex items-center gap-3">
          <BarChart className="text-purple-600" size={30} />
          <div>
            <p className="text-sm text-gray-600">Revenue</p>
            <p className="text-xl font-bold">$0</p>
          </div>
        </div>
      </div>

      {/* Animated Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="businesses">Businesses</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">
              Charts & analytics coming soon...
            </p>
          </div>
        </TabsContent>

        <TabsContent value="businesses">
          <p className="text-gray-600 text-sm py-4">
            We will embed Businesses management page here later.
          </p>
        </TabsContent>

        <TabsContent value="users">
          <p className="text-gray-600 text-sm py-4">
            We will embed Users management page here later.
          </p>
        </TabsContent>

      </Tabs>
    </div>
  );
}
