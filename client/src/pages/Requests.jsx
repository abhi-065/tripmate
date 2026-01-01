import { useEffect, useState } from "react";
import API from "../api";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await API.get("/requests/my", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setRequests(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(
      `/requests/${id}`,
      { status },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    fetchRequests();
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Trip Requests</h2>

      {requests.map((req) => (
  <div key={req._id} className="bg-white p-4 mb-4 rounded shadow">
    <p><b>Trip:</b> {req.trip.destination}</p>
    <p><b>From:</b> {req.fromUser.name}</p>
    <p><b>Status:</b> {req.status}</p>

    {/* SHOW EMAIL ONLY AFTER ACCEPT */}
    {req.status === "accepted" && (
      <div className="mt-2 p-2 bg-green-100 rounded">
        <p className="text-green-700 font-semibold">
          Contact Email:
        </p>
        <p className="text-blue-600">
          {req.fromUser.email}
        </p>
      </div>
    )}

    {/* ACTION BUTTONS */}
    {req.status === "pending" && (
      <div className="flex gap-3 mt-3">
        <button
          onClick={() => updateStatus(req._id, "accepted")}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Accept
        </button>

        <button
          onClick={() => updateStatus(req._id, "rejected")}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Reject
        </button>
      </div>
    )}
  </div>
))}

    </div>
  );
}
