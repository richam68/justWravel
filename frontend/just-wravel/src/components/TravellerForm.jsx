import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTravellerId } from "../store/bookingSlice";
import { createTraveller } from "../api/travellerApi";

const genderOptions = ["Male", "Female", "Other"];
const mealPreferences = ["veg", "non-veg", "vegan", "jain", "kosher", "halal"];
const seatPreferences = ["window", "aisle", "middle", "any"];

const TravellerForm = ({ onCreated }) => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("Male");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [mealPreference, setMealPreference] = useState("veg");
  const [seatPreference, setSeatPreference] = useState("any");
  const [status, setStatus] = useState({
    loading: false,
    message: null,
    error: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: null, error: null });

    try {
      const payload = {
        fullName: fullName.trim(),
        gender,
        dateOfBirth: dateOfBirth || undefined,
        mealPreference,
        seatPreference,
      };

      const created = await createTraveller(payload);

      // Store traveller ID in Redux
      dispatch(addTravellerId(created._id));

      setStatus({
        loading: false,
        message: `Traveller created: ${created._id}`,
        error: null,
      });

      setFullName("");
      setGender("Male");
      setDateOfBirth("");
      setMealPreference("veg");
      setSeatPreference("any");

      if (onCreated) onCreated(created);
    } catch (err) {
      setStatus({ loading: false, message: null, error: err.message });
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[14px] p-3 sm:p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)] mt-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="uppercase tracking-wide text-xs text-slate-600 m-0">
            New Traveller
          </p>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900">
            Create traveller
          </h2>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-3">
        {/* Full Name */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Full Name</span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Doe"
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          />
        </label>

        {/* Gender */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Gender</span>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          >
            {genderOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>

        {/* DOB */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">
            Date of Birth{" "}
            <span className="font-normal text-slate-500">(optional)</span>
          </span>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="px-3 py-2.5 border border-slate-300 rounded-lg bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          />
        </label>

        {/* Meal */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Meal Preference</span>
          <select
            value={mealPreference}
            onChange={(e) => setMealPreference(e.target.value)}
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          >
            {mealPreferences.map((pref) => (
              <option key={pref} value={pref}>
                {pref}
              </option>
            ))}
          </select>
        </label>

        {/* Seat */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Seat Preference</span>
          <select
            value={seatPreference}
            onChange={(e) => setSeatPreference(e.target.value)}
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          >
            {seatPreferences.map((pref) => (
              <option key={pref} value={pref}>
                {pref}
              </option>
            ))}
          </select>
        </label>

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
            {status.loading ? "Creating..." : "Create Traveller"}
          </button>

          {status.message && (
            <span className="text-green-700 font-semibold text-sm sm:text-base">
              {status.message}
            </span>
          )}

          {status.error && (
            <span className="text-red-700 font-semibold text-sm sm:text-base">
              {status.error}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default TravellerForm;
