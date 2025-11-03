import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth"; // ✅ import signup API

export default function Signup() {
  const [role, setRole] = useState("");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!role) {
      alert("Please select your role (NGO or Donor)");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload =
        role === "ngo"
          ? {
              name: orgName, // NGO org name
              email,
              password,
              role,
              ngoName: orgName,
            }
          : {
              name: orgName, // donor full name
              email,
              password,
              role,
            };

      const result = await signup(payload);

      // ✅ Store token and user data
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      navigate(`/login`);
    } catch (err) {
      setError(err.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Create Your Account</h1>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <select
          className="w-full border rounded-lg p-3 mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">I am a...</option>
          <option value="ngo">NGO</option>
          <option value="donor">Donor</option>
        </select>

        <input
          type="text"
          placeholder={role === "donor" ? "Full Name" : "Organization Name"}
          className="w-full border rounded-lg p-3 mb-4"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create Password"
          className="w-full border rounded-lg p-3 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border rounded-lg p-3 mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="mb-4 text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> I agree to the Terms and
            Conditions
          </label>
        </div>

        <button
          className={`w-full py-2 rounded-lg text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
          onClick={handleSignup}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
