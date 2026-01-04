import { useEffect, useState } from "react";
import { getCustomers } from "../api/customerApi";

const CustomerList = ({ refreshSignal }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCustomers();
      setCustomers(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [refreshSignal]);

  return (
    <div className="bg-white border border-slate-200 rounded-[14px] p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)] mt-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="uppercase tracking-wide text-xs text-slate-600 m-0">
            Customers
          </p>
          <h2 className="text-lg font-semibold text-slate-900">
            Customer list
          </h2>
        </div>
      </div>

      {/* States */}
      {loading && (
        <p className="text-slate-600 font-medium">Loading customers...</p>
      )}

      {error && <p className="text-red-700 font-semibold">{error}</p>}

      {!loading && !customers.length && (
        <p className="text-slate-600">No customers found.</p>
      )}

      {/* Table */}
      {!loading && customers.length > 0 && (
        <div className="overflow-auto border border-slate-200 rounded-xl">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-3 py-3 text-sm font-bold text-slate-900 border-b border-slate-200">
                  ID
                </th>
                <th className="text-left px-3 py-3 text-sm font-bold text-slate-900 border-b border-slate-200">
                  Name
                </th>
                <th className="text-left px-3 py-3 text-sm font-bold text-slate-900 border-b border-slate-200">
                  Email
                </th>
                <th className="text-left px-3 py-3 text-sm font-bold text-slate-900 border-b border-slate-200">
                  Phone
                </th>
                <th className="text-left px-3 py-3 text-sm font-bold text-slate-900 border-b border-slate-200">
                  Created
                </th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer._id}
                  className="border-b border-slate-200 last:border-b-0"
                >
                  <td className="px-3 py-3 text-sm">
                    <code className="inline-block bg-slate-100 px-2 py-1 rounded-md text-[11px] text-slate-600 font-mono max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {customer._id}
                    </code>
                  </td>

                  <td className="px-3 py-3 text-sm text-slate-900">
                    {customer.fullName}
                  </td>

                  <td className="px-3 py-3 text-sm text-slate-900">
                    {customer.email || "-"}
                  </td>

                  <td className="px-3 py-3 text-sm text-slate-900">
                    {customer.phoneNumber}
                  </td>

                  <td className="px-3 py-3 text-sm text-slate-900">
                    {customer.createdAt
                      ? new Date(customer.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
