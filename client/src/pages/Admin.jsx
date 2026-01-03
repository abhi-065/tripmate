import { useEffect, useState } from "react";
import API from "../api";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const usersRes = await API.get("/admin/users");
    const tripsRes = await API.get("/trips");

    setUsers(usersRes.data);
    setTrips(tripsRes.data);
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Delete this user and all their trips?")) return;
    await API.delete(`/admin/user/${userId}`);
    setSelectedUser(null);
    fetchAll();
  };

  const deleteTrip = async (tripId) => {
    if (!window.confirm("Delete this trip?")) return;
    await API.delete(`/admin/trip/${tripId}`);
    fetchAll();
  };

  const userTrips = trips.filter(
    (trip) => trip.user?._id === selectedUser?._id
  );

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        🛠️ Admin Dashboard
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* USERS LIST */}
        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">👥 Users</h3>

          {users.map((user) => (
            <div
              key={user._id}
              className={`p-3 border rounded mb-2 cursor-pointer ${
                selectedUser?._id === user._id
                  ? "bg-blue-50 border-blue-400"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteUser(user._id);
                }}
                className="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete User
              </button>
            </div>
          ))}
        </div>

        {/* USER TRIPS */}
        <div className="md:col-span-2 bg-white p-5 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">
            ✈️ Trips
            {selectedUser && (
              <span className="text-sm text-gray-600 ml-2">
                ( {selectedUser.name} )
              </span>
            )}
          </h3>

          {!selectedUser && (
            <p className="text-gray-500">
              Select a user to view their trips
            </p>
          )}

          {selectedUser && userTrips.length === 0 && (
            <p className="text-gray-500">No trips found</p>
          )}

          {userTrips.map((trip) => (
            <div
              key={trip._id}
              className="border rounded p-4 mb-3 flex justify-between items-start"
            >
              <div>
                <p className="font-semibold">📍 {trip.destination}</p>
                <p className="text-sm">💰 ₹{trip.budget}</p>
                <p className="text-sm">📅 {trip.travelDate}</p>
                {trip.tips && (
                  <p className="text-xs text-gray-600 mt-2">
                    📝 {trip.tips}
                  </p>
                )}
              </div>

              <button
                onClick={() => deleteTrip(trip._id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
