import { useEffect, useState } from "react";
import { getTravellers } from "../api/travellerApi";

const TravellerList = ({ refreshSignal }) => {
  const [travellers, setTravellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTravellers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTravellers();
      setTravellers(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravellers();
  }, [refreshSignal]);

  return (
    <div className="bg-white border border-slate-200 rounded-[14px] p-3 sm:p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)] mt-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="uppercase tracking-wide text-xs text-slate-600 m-0">
            Travellers
          </p>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900">
            Traveller list
          </h2>
        </div>
      </div>

      {/* States */}
      {loading && (
        <p className="text-slate-600 font-medium">Loading travellers...</p>
      )}

      {error && <p className="text-red-700 font-semibold">{error}</p>}

      {!loading && !travellers.length && (
        <p className="text-slate-600">No travellers found.</p>
      )}

      {/* Table */}
      {!loading && travellers.length > 0 && (
        <div className="overflow-x-auto border border-slate-200 rounded-xl -mx-3 sm:mx-0">
          <table className="w-full min-w-[800px] border-collapse text-xs sm:text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["ID", "Name", "Gender", "DOB", "Meal", "Seat", "Created"].map(
                  (head) => (
                    <th
                      key={head}
                      className="text-left px-3 py-3 font-bold text-slate-900 border-b border-slate-200"
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {travellers.map((traveller) => (
                <tr
                  key={traveller._id}
                  className="border-b border-slate-200 last:border-b-0
                         hover:bg-slate-50 transition"
                >
                  {/* ID */}
                  <td className="px-3 py-3">
                    <code className="inline-block bg-slate-100 px-2 py-1 rounded-md text-[11px] text-slate-600 font-mono max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {traveller._id}
                    </code>
                  </td>

                  {/* Name */}
                  <td className="px-3 py-3 text-slate-900 font-medium">
                    {traveller.fullName}
                  </td>

                  {/* Gender */}
                  <td className="px-3 py-3 text-slate-900">
                    {traveller.gender || "-"}
                  </td>

                  {/* DOB */}
                  <td className="px-3 py-3 text-slate-900">
                    {traveller.dateOfBirth
                      ? new Date(traveller.dateOfBirth).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* Meal */}
                  <td className="px-3 py-3 text-slate-900">
                    {traveller.mealPreference || "-"}
                  </td>

                  {/* Seat */}
                  <td className="px-3 py-3 text-slate-900">
                    {traveller.seatPreference || "-"}
                  </td>

                  {/* Created */}
                  <td className="px-3 py-3 text-slate-900">
                    {traveller.createdAt
                      ? new Date(traveller.createdAt).toLocaleDateString()
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

export default TravellerList;
