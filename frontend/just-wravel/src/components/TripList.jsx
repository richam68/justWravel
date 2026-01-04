import { useEffect, useState } from "react";
import { getTrips } from "../api/tripApi";

const TripList = ({ refreshSignal }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrips = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTrips();
      setTrips(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [refreshSignal]);

  return (
    <div className="bg-white border border-slate-200 rounded-[14px] p-3 sm:p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)] mt-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="uppercase tracking-wide text-xs text-slate-600 m-0">
            Trips
          </p>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900">
            Trip list
          </h2>
        </div>
      </div>

      {/* States */}
      {loading && (
        <p className="text-slate-600 font-medium">Loading trips...</p>
      )}

      {error && <p className="text-red-700 font-semibold">{error}</p>}

      {!loading && !trips.length && (
        <p className="text-slate-600">No trips found.</p>
      )}

      {/* Table */}
      {!loading && trips.length > 0 && (
        <div className="overflow-x-auto border border-slate-200 rounded-xl -mx-3 sm:mx-0">
          <table className="w-full min-w-[900px] border-collapse text-xs sm:text-sm">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "ID",
                  "Trip Name",
                  "Type",
                  "Status",
                  "Destination",
                  "Duration",
                  "Price",
                ].map((head) => (
                  <th
                    key={head}
                    className="text-left px-3 py-3 font-bold text-slate-900 border-b border-slate-200"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {trips.map((trip) => (
                <tr
                  key={trip._id}
                  className="border-b border-slate-200 last:border-b-0
                         hover:bg-slate-50 transition"
                >
                  {/* ID */}
                  <td className="px-3 py-3">
                    <code className="inline-block bg-slate-100 px-2 py-1 rounded-md text-[11px] text-slate-600 font-mono max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {trip._id}
                    </code>
                  </td>

                  {/* Trip Name */}
                  <td className="px-3 py-3 text-slate-900 font-medium">
                    {trip.tripName}
                  </td>

                  {/* Type */}
                  <td className="px-3 py-3 text-slate-900">{trip.tripType}</td>

                  {/* Status */}
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold border
                    ${
                      trip.status === "active"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : trip.status === "completed"
                        ? "bg-sky-100 text-sky-700 border-sky-200"
                        : trip.status === "cancelled"
                        ? "bg-red-100 text-red-700 border-red-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                    >
                      {trip.status || "draft"}
                    </span>
                  </td>

                  {/* Destination */}
                  <td className="px-3 py-3 text-slate-900">
                    {trip.destination?.city || "-"}
                    {trip.destination?.state
                      ? `, ${trip.destination.state}`
                      : ""}
                  </td>

                  {/* Duration */}
                  <td className="px-3 py-3 text-slate-900">
                    {trip.duration?.days || 0}D/
                    {trip.duration?.nights || 0}N
                  </td>

                  {/* Price */}
                  <td className="px-3 py-3 text-slate-900 font-semibold">
                    ₹{trip.pricing?.finalPrice || trip.pricing?.basePrice || 0}
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

export default TripList;
