import { useState } from "react";
import API from "../api";

export default function FindPartner() {
  const [form, setForm] = useState({
    destination: "",
    date: "",
    budget: ""
  });

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendRequest = async (tripId) => {
  try {
    await API.post(
      "/requests/send",
      { tripId },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    alert("Request sent!");
  } catch {
    alert("Failed to send request");
  }
};


  const findPartners = async () => {
    setLoading(true);
    try {
      const res = await API.get("/trips/match", {
  params: form,
  headers: {
    Authorization: localStorage.getItem("token")
  }
});

      setMatches(res.data);
    } catch (err) {
      alert("Failed to fetch partners");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Find Travel Partner ✈️
      </h2>

      {/* Search Section */}
      <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Destination"
            className="border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, destination: e.target.value })
            }
          />

          <input
            type="date"
            className="border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Budget"
            className="border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, budget: e.target.value })
            }
          />

          <button
            onClick={findPartners}
            className="bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto">
        {loading && (
          <p className="text-center text-gray-500">Searching...</p>
        )}

        {!loading && matches.length === 0 && (
          <p className="text-center text-gray-500">
            No matching trips found.
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {matches.map((trip) => (
            <div
              key={trip._id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-2">
                📍 {trip.destination}
              </h3>

              <p className="text-gray-600">
                💰 Budget: ₹{trip.budget}
              </p>

              <p className="text-gray-600">
                📅 Date: {trip.travelDate}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                🏨 {trip.hotel || "Not specified"}
              </p>

              <button
  onClick={() => sendRequest(trip._id)}
  className="bg-green-600 text-white px-3 py-1 mt-2 rounded"
>
  Request to Join
</button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
