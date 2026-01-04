import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTripId } from "../store/bookingSlice";
import { createTrip } from "../api/tripApi";

const tripTypes = ["package", "custom"];
const tripStatuses = ["draft", "active", "inactive", "expired"];
const transportModes = ["flight", "train", "bus", "self"];
const accommodationTypes = ["hotel", "homestay", "resort"];

const TripForm = ({ onCreated }) => {
  const dispatch = useDispatch();
  const [tripName, setTripName] = useState("");
  const [tripType, setTripType] = useState("package");
  const [status, setStatus] = useState("draft");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [days, setDays] = useState("");
  const [nights, setNights] = useState("");
  const [transportMode, setTransportMode] = useState("flight");
  const [accommodationType, setAccommodationType] = useState("hotel");
  const [basePrice, setBasePrice] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [formStatus, setFormStatus] = useState({
    loading: false,
    message: null,
    error: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, message: null, error: null });

    try {
      const payload = {
        tripName: tripName.trim(),
        tripType,
        status,
        destination: {
          country: country.trim(),
          state: state.trim(),
          city: city.trim(),
        },
        duration: {
          days: Number(days),
          nights: Number(nights),
        },
        transportMode,
        accommodationType,
        pricing: {
          basePrice: Number(basePrice),
          finalPrice: Number(finalPrice),
        },
      };

      const created = await createTrip(payload);

      // Store trip ID in Redux
      dispatch(setTripId(created._id));

      setFormStatus({
        loading: false,
        message: `Trip created: ${created._id}`,
        error: null,
      });

      // Reset form
      setTripName("");
      setTripType("package");
      setStatus("draft");
      setCity("");
      setState("");
      setCountry("");
      setDays("");
      setNights("");
      setTransportMode("flight");
      setAccommodationType("hotel");
      setBasePrice("");
      setFinalPrice("");

      if (onCreated) onCreated(created);
    } catch (err) {
      setFormStatus({ loading: false, message: null, error: err.message });
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">New Trip</p>
          <h2>Create trip</h2>
        </div>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="field">
          <span>Trip Name</span>
          <input
            type="text"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            placeholder="Manali Adventure"
            required
          />
        </label>

        <label className="field">
          <span>Trip Type</span>
          <select
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            required
          >
            {tripTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            {tripStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <div className="field custom-grid">
          <span className="field-title">Destination</span>
          <label>
            <span>City</span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Manali"
            />
          </label>
          <label>
            <span>State</span>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Himachal Pradesh"
            />
          </label>
          <label>
            <span>Country</span>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="India"
            />
          </label>
        </div>

        <label className="field">
          <span>Days</span>
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Nights</span>
          <input
            type="number"
            min="0"
            value={nights}
            onChange={(e) => setNights(e.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Transport Mode</span>
          <select
            value={transportMode}
            onChange={(e) => setTransportMode(e.target.value)}
            required
          >
            {transportModes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Accommodation Type</span>
          <select
            value={accommodationType}
            onChange={(e) => setAccommodationType(e.target.value)}
            required
          >
            {accommodationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Base Price</span>
          <input
            type="number"
            min="0"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            placeholder="e.g. 10000"
            required
          />
        </label>

        <label className="field">
          <span>Final Price</span>
          <input
            type="number"
            min="0"
            value={finalPrice}
            onChange={(e) => setFinalPrice(e.target.value)}
            placeholder="e.g. 12000"
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit" disabled={formStatus.loading}>
            {formStatus.loading ? "Creating..." : "Create Trip"}
          </button>
          {formStatus.message && (
            <span className="success">{formStatus.message}</span>
          )}
          {formStatus.error && (
            <span className="error">{formStatus.error}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default TripForm;
