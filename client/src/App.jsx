import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddTrip from "./pages/AddTrip";
import Explore from "./pages/Explore";
import FindPartner from "./pages/FindPartner";
import MyTrips from "./pages/MyTrips";
import AdminDashboard from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Requests from "./pages/Requests";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
  <h2 className="font-bold text-lg">TripMate</h2>

  <div className="flex gap-4 items-center">
    {user ? (
      <>
        <Link to="/add">Add Trip</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/requests">
  Requests
</Link>

        <Link to="/find">Find Partner</Link>
        <Link to="/my-trips">My Trips</Link>

        <Link to="/profile" className="text-yellow-300">
          👤 {user.name}
        </Link>

        {user?.isAdmin && (
  <Link to="/admin" className="text-red-600 font-bold">
    Admin
  </Link>
)}


        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>
    )}
  </div>
</nav>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/forgot" element={<ForgotPassword />} />

        <Route path="/requests" element={<Requests />} />

        <Route path="/add" element={<ProtectedRoute><AddTrip /></ProtectedRoute>} />
        <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
        <Route path="/find" element={<ProtectedRoute><FindPartner /></ProtectedRoute>} />
        <Route path="/my-trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />

        <Route path="/reset" element={<ResetPassword />} />

        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>


        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              {user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
