import { useEffect, useState } from "react";
import { getCustomers } from "../api/customerApi";

const CustomerList = ({ refreshSignal }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCustomers();
      setCustomers(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [refreshSignal]);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Customers</p>
          <h2>Customer list</h2>
        </div>
      </div>

      {loading && <p>Loading customers...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !customers.length && <p>No customers found.</p>}

      {!loading && customers.length > 0 && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td>
                    <code className="id-badge">{customer._id}</code>
                  </td>
                  <td>{customer.fullName}</td>
                  <td>{customer.email || "-"}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>
                    {customer.createdAt
                      ? new Date(customer.createdAt).toLocaleDateString()
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

export default CustomerList;
