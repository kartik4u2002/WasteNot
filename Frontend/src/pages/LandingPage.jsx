import React from "react";
import { Link, NavLink } from "react-router-dom";
import heroImg from "../assets/Banner.png"; // ✅ import local image

export default function LandingPage() {
  const navLinkClass = ({ isActive }) =>
    `px-3 py-1 text-sm font-medium transition ${
      isActive
        ? "text-blue-600 border-b-2 border-blue-600"
        : "text-gray-600 hover:text-blue-600"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="flex items-center justify-between px-10 py-6 bg-white shadow-sm w-full fixed top-0 left-0 z-20">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-600">
          NGO<span className="text-gray-800">Connect</span>
        </h1>

        <nav className="flex items-center gap-6">
          <NavLink to="/" className={navLinkClass} end>
            About Us
          </NavLink>
          <NavLink to="/how" className={navLinkClass}>
            How it Works
          </NavLink>
          <NavLink to="/for-ngos" className={navLinkClass}>
            For NGOs
          </NavLink>
          <NavLink to="/for-donors" className={navLinkClass}>
            For Donors
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`
            }
          >
            Login
          </NavLink>

          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="relative w-full h-screen flex items-center justify-start"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 px-8 md:px-20 text-left max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
            Connect. Empower.
            <br />
            Change Lives.
          </h2>
          <p className="mt-4 text-gray-200 max-w-lg">
            Discover NGOs and make a real impact by donating where it matters
            most. Your contribution can empower change and build a better world.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              to="/discover"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Find an NGO
            </Link>
            <Link
              to="/donate"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="w-full bg-gray-50 py-16 px-8 md:px-16 -mt-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* How It Works */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">How It Works</h3>
            <div className="flex justify-around">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full border border-green-200">
                  🌍
                </div>
                <span className="mt-2 text-sm text-gray-600">Discover Causes</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full border border-green-200">
                  🔗
                </div>
                <span className="mt-2 text-sm text-gray-600">Connect Securely</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full border border-green-200">
                  ❤️
                </div>
                <span className="mt-2 text-sm text-gray-600">Make an Impact</span>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Success Stories</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  👩🏽
                </div>
                <div>
                  <p className="text-sm text-gray-700">“Our reach grew tenfold!”</p>
                  <p className="text-xs text-gray-500 mt-1">
                    - Green Earth Foundation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  👩🏻
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    "Found my cause. Donated monthly!"
                  </p>
                  <p className="text-xs text-gray-500 mt-1">- Sarah K</p>
                </div>
              </div>
            </div>
          </div>

          {/* Join Us */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Join Us</h3>
            <div className="flex flex-col gap-4">
              <Link
                to="/signup?role=ngo"
                className="block px-6 py-5 rounded-lg bg-blue-600 text-white text-center font-medium hover:bg-blue-700 transition"
              >
                For NGOs
                <div className="text-sm mt-1 opacity-90">Register Your Cause</div>
              </Link>

              <Link
                to="/signup?role=donor"
                className="block px-6 py-5 rounded-lg bg-green-600 text-white text-center font-medium hover:bg-green-700 transition"
              >
                For Donors
                <div className="text-sm mt-1 opacity-90">Explore Projects</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white border-t py-6 px-8 md:px-16 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3">
          <span>© 2025 NGO Connect</span>
          <NavLink to="/privacy" className="hover:underline">
            Privacy Policy
          </NavLink>
          <NavLink to="/terms" className="hover:underline">
            Terms of Service
          </NavLink>
        </div>
      </footer>
    </div>
  );
}
