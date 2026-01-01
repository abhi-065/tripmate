import { useEffect, useState } from "react";
import API from "../api";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const usersRes = await API.get("/admin/users", {
      headers: { Authorization: token },
    });

    const tripsRes = await API.get("/trips");

    setUsers(usersRes.data);
    setTrips(tripsRes.data);
  };

  const deleteUser = async (id) => {
    await API.delete(`/admin/user/${id}`, {
      headers: { Authorization: token },
    });
    fetchData();
  };

  const deleteTrip = async (id) => {
    await API.delete(`/admin/trip/${id}`, {
      headers: { Authorization: token },
    });
    fetchData();
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-5">Admin Panel</h2>

      <h3 className="text-xl font-semibold mt-6">Users</h3>
      {users.map((u) => (
        <div key={u._id} className="border p-2 flex justify-between">
          <span>{u.name} ({u.email})</span>
          <button
            onClick={() => deleteUser(u._id)}
            className="bg-red-600 text-white px-3 py-1"
          >
            Delete
          </button>
        </div>
      ))}

      <h3 className="text-xl font-semibold mt-8">Trips</h3>
      {trips.map((t) => (
        <div key={t._id} className="border p-2 flex justify-between">
          <span>{t.destination}</span>
          <button
            onClick={() => deleteTrip(t._id)}
            className="bg-red-600 text-white px-3 py-1"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
