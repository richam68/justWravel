import { useEffect, useMemo, useState } from "react";
import { getBookings, getBookingByReference } from "../api/bookingApi";

const BookingList = ({ refreshSignal }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = async (query = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBookings(query);
      setBookings(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [refreshSignal]);

  const rows = useMemo(() => bookings || [], [bookings]);

  return (
    <div className="bg-white border border-slate-200 rounded-[14px] p-3 sm:p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)] mt-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="uppercase tracking-wide text-xs text-slate-600">
            Bookings
          </p>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900">
            Booking list
          </h2>
        </div>
      </div>

      {/* States */}
      {loading && (
        <p className="text-slate-600 font-medium">Loading bookings...</p>
      )}

      {error && <p className="text-red-700 font-semibold">{error}</p>}

      {!loading && !rows.length && (
        <p className="text-slate-600">No bookings found.</p>
      )}

      {/* Table */}
      {!loading && rows.length > 0 && (
        <div className="overflow-x-auto border border-slate-200 rounded-xl -mx-3 sm:mx-0">
          <table className="w-full min-w-[900px] border-collapse text-xs sm:text-sm">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "Reference",
                  "Type",
                  "Status",
                  "Customer",
                  "Total",
                  "Departure",
                  "Created",
                ].map((head) => (
                  <th
                    key={head}
                    className="text-left px-3 py-3 font-bold text-slate-900
                           border-b border-slate-200"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={row._id || row.bookingReference}
                  className="border-b border-slate-200 last:border-b-0
                         hover:bg-slate-50 transition"
                >
                  <td className="px-3 py-3 font-medium text-slate-900">
                    {row.bookingReference}
                  </td>

                  <td className="px-3 py-3 text-slate-900">
                    {row.bookingType}
                  </td>

                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold border
                    ${
                      row.bookingStatus === "confirmed"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : row.bookingStatus === "cancelled"
                        ? "bg-red-100 text-red-700 border-red-200"
                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                    }`}
                    >
                      {row.bookingStatus || "pending"}
                    </span>
                  </td>

                  <td className="px-3 py-3 text-slate-900">
                    {row.customerId?.fullName || row.customerId || "-"}
                  </td>

                  <td className="px-3 py-3 text-slate-900 font-semibold">
                    {row.totalAmount ?? "-"}
                  </td>

                  <td className="px-3 py-3 text-slate-900">
                    {row.departureDate
                      ? new Date(row.departureDate).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-3 py-3 text-slate-900">
                    {row.createdAt
                      ? new Date(row.createdAt).toLocaleString()
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

export default BookingList;
