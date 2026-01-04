import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearBookingData } from "../store/bookingSlice";
import { createBooking } from "../api/bookingApi";

const initialCustom = {
  destination: "",
  numberOfDays: "",
  numberOfNights: "",
  budgetMin: "",
  budgetMax: "",
};

const bookingTypes = ["package", "hotel", "flight", "bus", "custom"];

const BookingForm = ({ onCreated }) => {
  const dispatch = useDispatch();
  const {
    customerId: reduxCustomerId,
    tripId: reduxTripId,
    travellerIds: reduxTravellerIds,
  } = useSelector((state) => state.booking);

  const [bookingType, setBookingType] = useState("package");
  const [customerId, setCustomerId] = useState("");
  const [travellersRaw, setTravellersRaw] = useState("");
  const [tripId, setTripId] = useState("");
  const [customDetails, setCustomDetails] = useState(initialCustom);
  const [departureDate, setDepartureDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    message: null,
    error: null,
  });

  // Auto-fill from Redux when available
  useEffect(() => {
    if (reduxCustomerId) {
      setCustomerId(reduxCustomerId);
    }
  }, [reduxCustomerId]);

  useEffect(() => {
    if (reduxTripId) {
      setTripId(reduxTripId);
    }
  }, [reduxTripId]);

  useEffect(() => {
    if (reduxTravellerIds && reduxTravellerIds.length > 0) {
      setTravellersRaw(reduxTravellerIds.join("\n"));
    }
  }, [reduxTravellerIds]);

  // ✅ SAFELY PARSE TRAVELLERS
  const travellersArray = travellersRaw
    .split(/[\n,]/)
    .map((t) => t.trim())
    .filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: null, error: null });

    try {
      // ✅ BASE PAYLOAD
      const payload = {
        bookingType,
        customerId: customerId.trim(),
        travellers: travellersArray,
        departureDate,
        totalAmount: Number(totalAmount),
      };

      // ✅ CONDITIONAL PAYLOAD
      if (bookingType === "custom") {
        payload.customDetails = {
          destination: customDetails.destination.trim(),
          numberOfDays: Number(customDetails.numberOfDays),
          numberOfNights: customDetails.numberOfNights
            ? Number(customDetails.numberOfNights)
            : undefined,
          budgetRange: {
            min: Number(customDetails.budgetMin),
            max: Number(customDetails.budgetMax),
          },
        };
      } else {
        payload.tripId = tripId.trim();
      }

      const created = await createBooking(payload);

      setStatus({
        loading: false,
        message: `Booking created. Reference: ${created.bookingReference}`,
        error: null,
      });

      // ✅ RESET FORM
      setCustomerId("");
      setTravellersRaw("");
      setTripId("");
      setCustomDetails(initialCustom);
      setDepartureDate("");
      setTotalAmount("");
      setBookingType("package");

      // Clear Redux state after successful booking
      dispatch(clearBookingData());

      if (onCreated) onCreated(created);
    } catch (err) {
      setStatus({
        loading: false,
        message: null,
        error: err.message || "Something went wrong",
      });
    }
  };

  const handleCustomChange = (key, value) => {
    setCustomDetails((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[14px] p-3 sm:p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)] mt-6">
      <div className="mb-4">
        <p className="uppercase tracking-wide text-xs text-slate-600 m-0">
          New Booking
        </p>
        <h2 className="text-base sm:text-lg font-semibold text-slate-900">
          Create booking
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-3">
        {/* Booking Type */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Booking Type</span>
          <select
            value={bookingType}
            onChange={(e) => setBookingType(e.target.value)}
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          >
            {bookingTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        {/* Customer ID */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">
            Customer ID {reduxCustomerId && "✓ Auto-filled"}
          </span>
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="ObjectId of customer"
            required
            className={`px-3 py-2.5 border rounded-lg
          ${
            reduxCustomerId
              ? "bg-green-100 border-green-300 focus:ring-green-500"
              : "border-slate-300 focus:ring-blue-700"
          }
          focus:outline-none focus:ring-2 focus:ring-offset-1`}
          />
        </label>

        {/* Trip ID (not custom) */}
        {bookingType !== "custom" && (
          <label className="flex flex-col gap-1.5">
            <span className="font-semibold text-slate-900">
              Trip ID {reduxTripId && "✓ Auto-filled"}
            </span>
            <input
              type="text"
              value={tripId}
              onChange={(e) => setTripId(e.target.value)}
              placeholder="ObjectId of trip"
              required
              className={`px-3 py-2.5 border rounded-lg
            ${
              reduxTripId
                ? "bg-green-100 border-green-300 focus:ring-green-500"
                : "border-slate-300 focus:ring-blue-700"
            }
            focus:outline-none focus:ring-2 focus:ring-offset-1`}
            />
          </label>
        )}

        {/* Traveller IDs */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">
            Traveller IDs {reduxTravellerIds?.length > 0 && "✓ Auto-filled"}
          </span>
          <input
            value={travellersRaw}
            onChange={(e) => setTravellersRaw(e.target.value)}
            rows={3}
            required
            className={`px-3 py-2.5 border rounded-lg resize-vertical
          ${
            reduxTravellerIds?.length > 0
              ? "bg-green-100 border-green-300 focus:ring-green-500"
              : "border-slate-300 focus:ring-blue-700"
          }
          focus:outline-none focus:ring-2 focus:ring-offset-1`}
          />
          <small className="text-slate-500">
            {travellersArray.length || 0} travellers
          </small>
        </label>

        {/* Departure Date */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Departure Date</span>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          />
        </label>

        {/* Total Amount */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Total Amount</span>
          <input
            type="number"
            min="0"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            placeholder="e.g. 12000"
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          />
        </label>

        {/* Custom Trip Details */}
        {bookingType === "custom" && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3
                      border border-dashed border-slate-300 rounded-xl"
          >
            <span className="md:col-span-2 font-bold text-slate-900">
              Custom Trip Details
            </span>

            {[
              {
                label: "Destination",
                value: customDetails.destination,
                key: "destination",
                type: "text",
                required: true,
              },
              {
                label: "Days",
                value: customDetails.numberOfDays,
                key: "numberOfDays",
                type: "number",
                min: 1,
                required: true,
              },
              {
                label: "Nights (optional)",
                value: customDetails.numberOfNights,
                key: "numberOfNights",
                type: "number",
                min: 0,
              },
              {
                label: "Budget Min",
                value: customDetails.budgetMin,
                key: "budgetMin",
                type: "number",
                min: 0,
                required: true,
              },
              {
                label: "Budget Max",
                value: customDetails.budgetMax,
                key: "budgetMax",
                type: "number",
                min: 0,
                required: true,
              },
            ].map((field) => (
              <label key={field.key} className="flex flex-col gap-1.5">
                <span className="font-semibold text-slate-900">
                  {field.label}
                </span>
                <input
                  type={field.type}
                  min={field.min}
                  value={field.value}
                  onChange={(e) =>
                    handleCustomChange(field.key, e.target.value)
                  }
                  required={field.required}
                  className="px-3 py-2.5 border border-slate-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
                />
              </label>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
          <button
            type="submit"
            disabled={status.loading}
            className="bg-blue-700 text-white font-bold px-4 py-2.5 rounded-lg
                   transition-all duration-150
                   hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)]
                   disabled:opacity-60 disabled:cursor-not-allowed
                   disabled:shadow-none disabled:transform-none
                   w-full sm:w-auto"
          >
            {status.loading ? "Creating..." : "Create Booking"}
          </button>

          {status.message && (
            <span className="text-green-700 font-semibold text-sm sm:text-base break-words">
              {status.message}
            </span>
          )}

          {status.error && (
            <span className="text-red-700 font-semibold text-sm sm:text-base break-words">
              {status.error}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
