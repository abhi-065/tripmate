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
      <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow">
  <h2 className="font-bold text-xl tracking-wide">
    🌍 TripMate
  </h2>

  <div className="flex gap-5 items-center text-sm">
    {user ? (
      <>
        <Link to="/explore" className="hover:underline">Explore</Link>
        <Link to="/add" className="hover:underline">Add Trip</Link>
        <Link to="/find" className="hover:underline">Find Partner</Link>
        <Link to="/my-trips" className="hover:underline">My Trips</Link>
        <Link to="/requests" className="hover:underline">Requests</Link>

        <Link to="/profile" className="bg-white text-blue-600 px-3 py-1 rounded font-semibold">
          👤 {user.name}
        </Link>

        {user.isAdmin && (
          <Link to="/admin" className="bg-red-500 px-3 py-1 rounded font-bold">
            Admin
          </Link>
        )}

        <button
          onClick={logout}
          className="bg-black bg-opacity-20 px-3 py-1 rounded hover:bg-opacity-30"
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
