import React from "react";

export const dynamic = "force-dynamic";

async function getInvoices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superadmin/invoices`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.invoices || [];
}

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Invoice History</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border">Business</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Method</th>
              <th className="p-3 border">Period</th>
              <th className="p-3 border">Paid At</th>
              <th className="p-3 border">Next Due Date</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50">
                <td className="p-3 border">{inv.business?.name || "N/A"}</td>
                <td className="p-3 border font-semibold">${inv.amount}</td>
                <td className="p-3 border">{inv.method}</td>
                <td className="p-3 border">{inv.period}</td>
                <td className="p-3 border">
                  {new Date(inv.paidAt).toLocaleDateString()}
                </td>
                <td className="p-3 border">
                  {new Date(inv.nextDueDate).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {invoices.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No invoices recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
