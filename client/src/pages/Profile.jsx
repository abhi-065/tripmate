import { useEffect, useState } from "react";
import API from "../api";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [myTrips, setMyTrips] = useState([]);

  useEffect(() => {
    fetchMyTrips();
  }, []);

  const fetchMyTrips = async () => {
    try {
      const res = await API.get("/trips/my", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      setMyTrips(res.data);
    } catch (err) {
      console.error("Failed to fetch trips");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        My Profile 👤
      </h2>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">User Info</h3>

          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p>
            <b>Role:</b>{" "}
            {user.isAdmin ? (
              <span className="text-green-600 font-semibold">
                Admin
              </span>
            ) : (
              "User"
            )}
          </p>

          <p className="mt-3">
            <b>Total Trips Posted:</b> {myTrips.length}
          </p>
        </div>

        {/* Trips Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">My Trips</h3>

          {myTrips.length === 0 ? (
            <p className="text-gray-500">
              You haven’t added any trips yet.
            </p>
          ) : (
            myTrips.map((trip) => (
              <div
                key={trip._id}
                className="border-b py-2"
              >
                <p className="font-semibold">
                  📍 {trip.destination}
                </p>
                <p className="text-sm text-gray-500">
                  💰 ₹{trip.budget} | 📅 {trip.travelDate}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
