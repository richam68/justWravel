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
    // 🔒 UI UNCHANGED
    <div className="card">
      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="field">
          <span>Booking Type</span>
          <select
            value={bookingType}
            onChange={(e) => setBookingType(e.target.value)}
            required
          >
            {bookingTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          {/* <span>Customer ID {reduxCustomerId && "✓ Auto-filled"}</span> */}
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="ObjectId of customer"
            required
            className={reduxCustomerId ? "auto-filled" : ""}
          />
        </label>

        {bookingType !== "custom" && (
          <label className="field">
            {/* <span>Trip ID {reduxTripId && "✓ Auto-filled"}</span> */}
            <input
              type="text"
              value={tripId}
              onChange={(e) => setTripId(e.target.value)}
              placeholder="ObjectId of trip"
              required
              className={reduxTripId ? "auto-filled" : ""}
            />
          </label>
        )}

        <label className="field">
          <span>
            Traveller IDs{" "}
            {reduxTravellerIds &&
              reduxTravellerIds.length > 0 &&
              "✓ Auto-filled"}
          </span>
          <input
            value={travellersRaw}
            onChange={(e) => setTravellersRaw(e.target.value)}
            rows={3}
            required
            className={
              reduxTravellerIds && reduxTravellerIds.length > 0
                ? "auto-filled"
                : ""
            }
          />
          <small>{travellersArray.length || 0} travellers</small>
        </label>

        <label className="field">
          <span>Departure Date</span>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Total Amount</span>
          <input
            type="number"
            min="0"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            placeholder="e.g. 12000"
            required
          />
        </label>

        {bookingType === "custom" && (
          <div className="field custom-grid">
            <span className="field-title">Custom Trip Details</span>
            <label>
              <span>Destination</span>
              <input
                type="text"
                value={customDetails.destination}
                onChange={(e) =>
                  handleCustomChange("destination", e.target.value)
                }
                required
              />
            </label>
            <label>
              <span>Days</span>
              <input
                type="number"
                min="1"
                value={customDetails.numberOfDays}
                onChange={(e) =>
                  handleCustomChange("numberOfDays", e.target.value)
                }
                required
              />
            </label>
            <label>
              <span>Nights (optional)</span>
              <input
                type="number"
                min="0"
                value={customDetails.numberOfNights}
                onChange={(e) =>
                  handleCustomChange("numberOfNights", e.target.value)
                }
              />
            </label>
            <label>
              <span>Budget Min</span>
              <input
                type="number"
                min="0"
                value={customDetails.budgetMin}
                onChange={(e) =>
                  handleCustomChange("budgetMin", e.target.value)
                }
                required
              />
            </label>
            <label>
              <span>Budget Max</span>
              <input
                type="number"
                min="0"
                value={customDetails.budgetMax}
                onChange={(e) =>
                  handleCustomChange("budgetMax", e.target.value)
                }
                required
              />
            </label>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" disabled={status.loading}>
            {status.loading ? "Creating..." : "Create Booking"}
          </button>
          {status.message && <span className="success">{status.message}</span>}
          {status.error && <span className="error">{status.error}</span>}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
