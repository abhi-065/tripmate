import { useEffect, useState } from "react";
import API from "../api";

export default function Requests() {
  const [incoming, setIncoming] = useState([]);
  const [sent, setSent] = useState([]);
  const [tab, setTab] = useState("incoming");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await API.get("/requests");
    
    // Backend should return ALL requests related to user
    const incomingReq = res.data.filter(
      (r) => r.toUser._id === user.id
    );

    const sentReq = res.data.filter(
      (r) => r.fromUser._id === user.id
    );

    setIncoming(incomingReq);
    setSent(sentReq);
  };

  const acceptRequest = async (id) => {
    await API.put(`/requests/${id}/accept`);
    fetchRequests();
  };

  const rejectRequest = async (id) => {
    await API.put(`/requests/${id}/reject`);
    fetchRequests();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        📩 Requests
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setTab("incoming")}
          className={`px-4 py-2 rounded ${
            tab === "incoming"
              ? "bg-blue-600 text-white"
              : "bg-white"
          }`}
        >
          Incoming
        </button>

        <button
          onClick={() => setTab("sent")}
          className={`px-4 py-2 rounded ${
            tab === "sent"
              ? "bg-blue-600 text-white"
              : "bg-white"
          }`}
        >
          Sent
        </button>
      </div>

      {/* INCOMING REQUESTS */}
      {tab === "incoming" && (
        <div className="max-w-3xl mx-auto">
          {incoming.length === 0 && (
            <p className="text-center text-gray-500">
              No incoming requests
            </p>
          )}

          {incoming.map((req) => (
            <div
              key={req._id}
              className="bg-white p-5 rounded shadow mb-4"
            >
              <p className="font-semibold">
                👤 {req.fromUser.name}
              </p>

              <p className="text-sm text-gray-600">
                Trip: {req.trip.destination}
              </p>

              <p className="text-sm mt-1">
                Status:{" "}
                <span className="font-semibold">
                  {req.status}
                </span>
              </p>

              {req.status === "pending" && (
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => acceptRequest(req._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => rejectRequest(req._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}

              {req.status === "accepted" && (
                <p className="mt-3 text-green-700 text-sm">
                  📧 Contact user at:{" "}
                  <span className="font-semibold">
                    {req.fromUser.email}
                  </span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SENT REQUESTS */}
      {tab === "sent" && (
        <div className="max-w-3xl mx-auto">
          {sent.length === 0 && (
            <p className="text-center text-gray-500">
              No sent requests
            </p>
          )}

          {sent.map((req) => (
            <div
              key={req._id}
              className="bg-white p-5 rounded shadow mb-4"
            >
              <p className="font-semibold">
                Trip: {req.trip.destination}
              </p>

              <p className="text-sm text-gray-600">
                Owner: {req.toUser.name}
              </p>

              <p className="text-sm mt-1">
                Status:{" "}
                <span className="font-semibold">
                  {req.status}
                </span>
              </p>

              {req.status === "accepted" && (
                <p className="mt-3 text-green-700 text-sm">
                  📧 Contact owner at:{" "}
                  <span className="font-semibold">
                    {req.toUser.email}
                  </span>
                </p>
              )}

              {req.status === "rejected" && (
                <p className="mt-3 text-red-600 text-sm">
                  ❌ Request rejected
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
