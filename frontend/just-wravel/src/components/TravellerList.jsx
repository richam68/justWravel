import { useEffect, useState } from "react";
import { getTravellers } from "../api/travellerApi";

const TravellerList = ({ refreshSignal }) => {
  const [travellers, setTravellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTravellers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTravellers();
      setTravellers(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravellers();
  }, [refreshSignal]);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Travellers</p>
          <h2>Traveller list</h2>
        </div>
      </div>

      {loading && <p>Loading travellers...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !travellers.length && <p>No travellers found.</p>}

      {!loading && travellers.length > 0 && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Meal</th>
                <th>Seat</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {travellers.map((traveller) => (
                <tr key={traveller._id}>
                  <td>
                    <code className="id-badge">{traveller._id}</code>
                  </td>
                  <td>{traveller.fullName}</td>
                  <td>{traveller.gender || "-"}</td>
                  <td>
                    {traveller.dateOfBirth
                      ? new Date(traveller.dateOfBirth).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{traveller.mealPreference || "-"}</td>
                  <td>{traveller.seatPreference || "-"}</td>
                  <td>
                    {traveller.createdAt
                      ? new Date(traveller.createdAt).toLocaleDateString()
                      : "-"}
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

export default TravellerList;
