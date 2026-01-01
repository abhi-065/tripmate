import { useEffect, useState } from "react";
import API from "../api";

export default function Explore() {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [openTipId, setOpenTipId] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const res = await API.get("/trips");
    setTrips(res.data);
  };

  // 🔍 FILTER LOGIC
  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.destination.toLowerCase().includes(search.toLowerCase()) ||
      trip.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      trip.tips?.toLowerCase().includes(search.toLowerCase());

    const matchesDate =
      !dateFilter || trip.travelDate === dateFilter;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        Explore Trips 🌍
      </h2>

      {/* FILTER BAR */}
      <div className="max-w-4xl mx-auto mb-6 grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Search destination, user or tips..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border rounded shadow"
        />

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-3 border rounded shadow"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredTrips.map((trip) => (
          <div
            key={trip._id}
            className="bg-white p-5 rounded shadow hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-bold mb-1">
              📍 {trip.destination}
            </h3>

            <p>💰 ₹{trip.budget}</p>
            <p>📅 {trip.travelDate}</p>

            <p className="text-sm text-gray-500 mt-2">
              👤 {trip.user?.name || "Anonymous"}
            </p>

            <button
              onClick={() =>
                setOpenTipId(
                  openTipId === trip._id ? null : trip._id
                )
              }
              className="mt-3 text-blue-600 font-semibold"
            >
              {openTipId === trip._id ? "Hide Tips ▲" : "View Tips ▼"}
            </button>

            {openTipId === trip._id && (
              <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
                <p className="font-semibold text-blue-800">
                  Travel Tips:
                </p>
                <p className="mt-1 whitespace-pre-line">
                  {trip.tips || "No tips provided"}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTrips.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No trips found for selected date.
        </p>
      )}
    </div>
  );
}
