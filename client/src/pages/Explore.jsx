import { useEffect, useState } from "react";
import API from "../api";

export default function Explore() {
  const [trips, setTrips] = useState([]);
  const [openTip, setOpenTip] = useState(null);

  useEffect(() => {
    API.get("/trips").then(res => setTrips(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        🌍 Explore Trips
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {trips.map(trip => (
          <div
            key={trip._id}
            className={`bg-white p-5 rounded shadow transition-all ${
              openTip === trip._id ? "md:col-span-2" : ""
            }`}
          >
            <h3 className="text-xl font-bold">📍 {trip.destination}</h3>

            <p className="mt-2">💰 Budget: ₹{trip.budget}</p>
            <p>📅 Date: {trip.travelDate}</p>
            <p className="text-sm text-gray-500 mt-1">
              👤 {trip.user?.name || "Anonymous"}
            </p>

            <button
              onClick={() =>
                setOpenTip(openTip === trip._id ? null : trip._id)
              }
              className="mt-4 text-blue-600 underline"
            >
              {openTip === trip._id ? "Hide Tips" : "View Tips"}
            </button>

            {openTip === trip._id && (
              <div className="mt-4 bg-gray-50 p-4 rounded border text-sm whitespace-pre-wrap">
                {trip.tips || "No tips provided"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
