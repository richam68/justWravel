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
    <div className="bg-white border border-slate-200 rounded-[14px] p-3 sm:p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)] mt-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="uppercase tracking-wide text-xs text-slate-600 m-0">
            New Trip
          </p>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900">
            Create trip
          </h2>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-3">
        {/* Trip Name */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Trip Name</span>
          <input
            type="text"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            placeholder="Manali Adventure"
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          />
        </label>

        {/* Trip Type */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Trip Type</span>
          <select
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          >
            {tripTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        {/* Status */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          >
            {tripStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        {/* Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 border border-dashed border-slate-300 rounded-xl">
          <span className="md:col-span-2 font-bold text-slate-900">
            Destination
          </span>

          {[
            {
              label: "City",
              value: city,
              setter: setCity,
              placeholder: "Manali",
            },
            {
              label: "State",
              value: state,
              setter: setState,
              placeholder: "Himachal Pradesh",
            },
            {
              label: "Country",
              value: country,
              setter: setCountry,
              placeholder: "India",
            },
          ].map(({ label, value, setter, placeholder }) => (
            <label key={label} className="flex flex-col gap-1.5">
              <span className="font-semibold text-slate-900">{label}</span>
              <input
                type="text"
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={placeholder}
                className="px-3 py-2.5 border border-slate-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
              />
            </label>
          ))}
        </div>

        {/* Days */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Days</span>
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          />
        </label>

        {/* Nights */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Nights</span>
          <input
            type="number"
            min="0"
            value={nights}
            onChange={(e) => setNights(e.target.value)}
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          />
        </label>

        {/* Transport */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Transport Mode</span>
          <select
            value={transportMode}
            onChange={(e) => setTransportMode(e.target.value)}
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          >
            {transportModes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </label>

        {/* Accommodation */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">
            Accommodation Type
          </span>
          <select
            value={accommodationType}
            onChange={(e) => setAccommodationType(e.target.value)}
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          >
            {accommodationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        {/* Pricing */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Base Price</span>
          <input
            type="number"
            min="0"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            placeholder="e.g. 10000"
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Final Price</span>
          <input
            type="number"
            min="0"
            value={finalPrice}
            onChange={(e) => setFinalPrice(e.target.value)}
            placeholder="e.g. 12000"
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          />
        </label>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
          <button
            type="submit"
            disabled={formStatus.loading}
            className="bg-blue-700 text-white font-bold px-4 py-2.5 rounded-lg
                   transition-all duration-150
                   hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)]
                   disabled:opacity-60 disabled:cursor-not-allowed
                   disabled:shadow-none disabled:transform-none
                   w-full sm:w-auto"
          >
            {formStatus.loading ? "Creating..." : "Create Trip"}
          </button>

          {formStatus.message && (
            <span className="text-green-700 font-semibold text-sm sm:text-base">
              {formStatus.message}
            </span>
          )}

          {formStatus.error && (
            <span className="text-red-700 font-semibold text-sm sm:text-base">
              {formStatus.error}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default TripForm;
