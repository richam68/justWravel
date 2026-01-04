import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCustomerId } from "../store/bookingSlice";
import { createCustomer } from "../api/customerApi";

const CustomerForm = ({ onCreated }) => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
      };

      const created = await createCustomer(payload);

      // Store customer ID in Redux
      dispatch(setCustomerId(created._id));

      setStatus({
        loading: false,
        message: `Customer created: ${created._id}`,
        error: null,
      });

      setFullName("");
      setEmail("");
      setPhoneNumber("");

      if (onCreated) onCreated(created);
    } catch (err) {
      setStatus({ loading: false, message: null, error: err.message });
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">New Customer</p>
          <h2>Create customer</h2>
        </div>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="field">
          <span>Full Name</span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </label>

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />
        </label>

        <label className="field">
          <span>Phone Number</span>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+91 9876543210"
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit" disabled={status.loading}>
            {status.loading ? "Creating..." : "Create Customer"}
          </button>
          {status.message && <span className="success">{status.message}</span>}
          {status.error && <span className="error">{status.error}</span>}
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
