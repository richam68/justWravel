import { useState } from "react";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";
import TripForm from "./components/TripForm";
import TripList from "./components/TripList";
import TravellerForm from "./components/TravellerForm";
import TravellerList from "./components/TravellerList";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("customers");
  const [bookingRefresh, setBookingRefresh] = useState(0);
  const [customerRefresh, setCustomerRefresh] = useState(0);
  const [tripRefresh, setTripRefresh] = useState(0);
  const [travellerRefresh, setTravellerRefresh] = useState(0);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const tabs = [
    { id: "customers", label: "Customers" },
    { id: "trips", label: "Trips" },
    { id: "travellers", label: "Travellers" },
    { id: "bookings", label: "Bookings" },
  ];

  return (
    <div className="layout">
      <header
        className="bg-gradient-to-br from-slate-900 to-blue-700
                   text-slate-50 rounded-2xl
                   px-6 py-6 sm:px-8 sm:py-7
                   flex flex-col sm:flex-row
                   items-start sm:items-center
                   justify-between gap-4
                   shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
      >
        <div>
          <p
            className="uppercase tracking-wide text-xs font-semibold
                  text-slate-200"
          >
            JustWravel
          </p>

          <h1 className="mt-1 text-2xl sm:text-3xl font-bold">
            Management dashboard
          </h1>

          <p className="mt-2 text-slate-200 max-w-xl text-sm sm:text-base">
            Create and manage bookings, customers, trips, and travellers.
          </p>
        </div>
      </header>

      <nav className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main>
        {activeTab === "customers" && (
          <>
            <section>
              <CustomerForm
                onCreated={() => {
                  setCustomerRefresh((k) => k + 1);
                  handleTabChange("trips");
                }}
              />
            </section>
            <section>
              <CustomerList refreshSignal={customerRefresh} />
            </section>
          </>
        )}

        {activeTab === "trips" && (
          <>
            <section>
              <TripForm
                onCreated={() => {
                  setTripRefresh((k) => k + 1);
                  handleTabChange("travellers");
                }}
              />
            </section>
            <section>
              <TripList refreshSignal={tripRefresh} />
            </section>
          </>
        )}

        {activeTab === "travellers" && (
          <>
            <section>
              <TravellerForm
                onCreated={() => {
                  setTravellerRefresh((k) => k + 1);
                  handleTabChange("bookings");
                }}
              />
            </section>
            <section>
              <TravellerList refreshSignal={travellerRefresh} />
            </section>
          </>
        )}

        {activeTab === "bookings" && (
          <>
            <section>
              <BookingForm onCreated={() => setBookingRefresh((k) => k + 1)} />
            </section>
            <section>
              <BookingList refreshSignal={bookingRefresh} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
