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
    <div className="bg-white border border-slate-200 rounded-[14px] p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)] mt-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="uppercase tracking-wide text-xs text-slate-600 m-0">
            New Customer
          </p>
          <h2 className="text-lg font-semibold text-slate-900">
            Create customer
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
            placeholder="John Doe"
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          />
        </label>

        {/* Email */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          />
        </label>

        {/* Phone */}
        <label className="flex flex-col gap-1.5">
          <span className="font-semibold text-slate-900">Phone Number</span>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+91 9876543210"
            required
            className="px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1"
          />
        </label>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap mt-1">
          <button
            type="submit"
            disabled={status.loading}
            className="bg-blue-700 text-white font-bold px-4 py-2.5 rounded-lg
                   transition-all duration-150
                   hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)]
                   disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
          >
            {status.loading ? "Creating..." : "Create Customer"}
          </button>

          {status.message && (
            <span className="text-green-700 font-semibold">
              {status.message}
            </span>
          )}

          {status.error && (
            <span className="text-red-700 font-semibold">{status.error}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
