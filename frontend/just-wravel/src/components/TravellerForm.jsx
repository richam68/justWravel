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
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">New Traveller</p>
          <h2>Create traveller</h2>
        </div>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="field">
          <span>Full Name</span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Doe"
            required
          />
        </label>

        <label className="field">
          <span>Gender</span>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            {genderOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Date of Birth (optional)</span>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Meal Preference</span>
          <select
            value={mealPreference}
            onChange={(e) => setMealPreference(e.target.value)}
            required
          >
            {mealPreferences.map((pref) => (
              <option key={pref} value={pref}>
                {pref}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Seat Preference</span>
          <select
            value={seatPreference}
            onChange={(e) => setSeatPreference(e.target.value)}
            required
          >
            {seatPreferences.map((pref) => (
              <option key={pref} value={pref}>
                {pref}
              </option>
            ))}
          </select>
        </label>

        <div className="form-actions">
          <button type="submit" disabled={status.loading}>
            {status.loading ? "Creating..." : "Create Traveller"}
          </button>
          {status.message && <span className="success">{status.message}</span>}
          {status.error && <span className="error">{status.error}</span>}
        </div>
      </form>
    </div>
  );
};

export default TravellerForm;
