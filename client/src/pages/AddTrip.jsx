import { useState } from "react";
import API from "../api";

export default function AddTrip() {
  const [form, setForm] = useState({
    destination: "",
    budget: "",
    hotel: "",
    tips: "",
    travelDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));

  try {
    await API.post("/trips/add", form, {
  headers: {
    Authorization: localStorage.getItem("token")
  }
});


    alert("Trip added successfully!");
    setForm({
      destination: "",
      budget: "",
      hotel: "",
      tips: "",
      travelDate: "",
    });
  } catch {
    alert("Failed to add trip");
  }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Add Trip</h2>

        <input
          name="destination"
          placeholder="Destination"
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />

        <input
          name="budget"
          type="number"
          placeholder="Budget"
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />

        <input
          name="hotel"
          placeholder="Hotel"
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          type="date"
          name="travelDate"
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />

        <textarea
          name="tips"
          placeholder="Tips"
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <button className="bg-blue-600 text-white w-full py-2">
          Add Trip
        </button>
      </form>
    </div>
  );
}
