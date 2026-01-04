import { useEffect, useState } from "react";
import { getTrips } from "../api/tripApi";

const TripList = ({ refreshSignal }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrips = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTrips();
      setTrips(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [refreshSignal]);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Trips</p>
          <h2>Trip list</h2>
        </div>
      </div>

      {loading && <p>Loading trips...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !trips.length && <p>No trips found.</p>}

      {!loading && trips.length > 0 && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Trip Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Destination</th>
                <th>Duration</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip._id}>
                  <td>
                    <code className="id-badge">{trip._id}</code>
                  </td>
                  <td>{trip.tripName}</td>
                  <td>{trip.tripType}</td>
                  <td>
                    <span className={`tag tag-${trip.status || "draft"}`}>
                      {trip.status || "draft"}
                    </span>
                  </td>
                  <td>
                    {trip.destination?.city || "-"}
                    {trip.destination?.state
                      ? `, ${trip.destination.state}`
                      : ""}
                  </td>
                  <td>
                    {trip.duration?.days || 0}D/{trip.duration?.nights || 0}N
                  </td>
                  <td>
                    ₹{trip.pricing?.finalPrice || trip.pricing?.basePrice || 0}
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

export default TripList;
