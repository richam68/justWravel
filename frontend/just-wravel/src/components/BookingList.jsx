import { useEffect, useMemo, useState } from "react";
import { getBookings, getBookingByReference } from "../api/bookingApi";

const statusOptions = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
  "on-hold",
];
const bookingTypes = ["package", "hotel", "flight", "bus", "custom"];

const BookingList = ({ refreshSignal }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    bookingType: "",
    bookingStatus: "",
  });
  const [reference, setReference] = useState("");

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
    fetchBookings({
      bookingType: filters.bookingType || undefined,
      bookingStatus: filters.bookingStatus || undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.bookingType, filters.bookingStatus, refreshSignal]);

  const handleReferenceSearch = async () => {
    if (!reference.trim()) return fetchBookings();
    setLoading(true);
    setError(null);
    try {
      const booking = await getBookingByReference(reference.trim());
      setBookings(booking ? [booking] : []);
    } catch (err) {
      setError(err.message);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const rows = useMemo(() => bookings || [], [bookings]);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Bookings</p>
          <h2>Booking list</h2>
        </div>
      </div>

      <div className="filters">
        <label>
          <span>Booking Type</span>
          <select
            value={filters.bookingType}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, bookingType: e.target.value }))
            }
          >
            <option value="">All</option>
            {bookingTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Status</span>
          <select
            value={filters.bookingStatus}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, bookingStatus: e.target.value }))
            }
          >
            <option value="">All</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="reference-search">
          <span>Booking Reference</span>
          <div className="inline-input">
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="e.g. JW-ABC123"
            />
            <button type="button" onClick={handleReferenceSearch}>
              Search
            </button>
          </div>
        </label>

        <button
          type="button"
          className="ghost"
          onClick={() => {
            setFilters({ bookingType: "", bookingStatus: "" });
            setReference("");
            fetchBookings();
          }}
        >
          Reset
        </button>
      </div>

      {loading && <p>Loading bookings...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !rows.length && <p>No bookings found.</p>}

      {!loading && rows.length > 0 && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Reference</th>
                <th>Type</th>
                <th>Status</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Departure</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row._id || row.bookingReference}>
                  <td>{row.bookingReference}</td>
                  <td>{row.bookingType}</td>
                  <td>
                    <span
                      className={`tag tag-${row.bookingStatus || "pending"}`}
                    >
                      {row.bookingStatus || "pending"}
                    </span>
                  </td>
                  <td>{row.customerId?.fullName || row.customerId || "-"}</td>
                  <td>{row.totalAmount ?? "-"}</td>
                  <td>
                    {row.departureDate
                      ? new Date(row.departureDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
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
