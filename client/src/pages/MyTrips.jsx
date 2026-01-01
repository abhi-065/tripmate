import { useEffect, useState } from "react";
import API from "../api";

export default function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [editTrip, setEditTrip] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const res = await API.get("/trips/my", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setTrips(res.data);
  };

  const deleteTrip = async (id) => {
    if (!window.confirm("Delete this trip?")) return;
    await API.delete(`/trips/delete/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    fetchTrips();
  };

  const updateTrip = async () => {
    await API.put(
      `/trips/update/${editTrip._id}`,
      editTrip,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setEditTrip(null);
    fetchTrips();
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Trips ✈️
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div key={trip._id} className="bg-white p-5 rounded shadow">
            <h3 className="font-bold text-lg">{trip.destination}</h3>
            <p>💰 {trip.budget}</p>
            <p>🏨 {trip.hotel}</p>
            <p>📅 {trip.travelDate}</p>

            <p className="text-sm text-gray-600 mt-2">
              📝 {trip.tips || "No tips added"}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setEditTrip(trip)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTrip(trip._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-[400px]">
            <h3 className="text-xl font-bold mb-3">Edit Trip</h3>

            <input
              value={editTrip.destination}
              onChange={(e) =>
                setEditTrip({ ...editTrip, destination: e.target.value })
              }
              className="border p-2 w-full mb-2"
              placeholder="Destination"
            />

            <input
              value={editTrip.budget}
              onChange={(e) =>
                setEditTrip({ ...editTrip, budget: e.target.value })
              }
              className="border p-2 w-full mb-2"
              placeholder="Budget"
            />

            <input
              value={editTrip.hotel}
              onChange={(e) =>
                setEditTrip({ ...editTrip, hotel: e.target.value })
              }
              className="border p-2 w-full mb-2"
              placeholder="Hotel"
            />

            <input
              type="date"
              value={editTrip.travelDate}
              onChange={(e) =>
                setEditTrip({
                  ...editTrip,
                  travelDate: e.target.value,
                })
              }
              className="border p-2 w-full mb-2"
            />

            <textarea
              value={editTrip.tips}
              onChange={(e) =>
                setEditTrip({ ...editTrip, tips: e.target.value })
              }
              className="border p-2 w-full mb-3"
              placeholder="Travel tips"
              rows="4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditTrip(null)}
                className="px-3 py-1 border"
              >
                Cancel
              </button>
              <button
                onClick={updateTrip}
                className="bg-blue-600 text-white px-4 py-1"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
