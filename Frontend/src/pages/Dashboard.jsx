import React from "react";
import { useParams, Link } from "react-router-dom";

export default function Dashboard() {
  const { role } = useParams();

  if (role === "ngo") {
    return (
      <div className="flex min-h-screen">
        <aside className="w-64 bg-blue-900 text-white p-6 space-y-4">
          <h2 className="text-2xl font-semibold">NGO Dashboard</h2>
          <nav className="space-y-2">
            <Link to="#" className="block hover:bg-blue-700 rounded p-2">My Projects</Link>
            <Link to="#" className="block hover:bg-blue-700 rounded p-2">Donation History</Link>
            <Link to="#" className="block hover:bg-blue-700 rounded p-2">Donors</Link>
            <Link to="/" className="block hover:bg-blue-700 rounded p-2">Logout</Link>
          </nav>
        </aside>

        <main className="flex-1 bg-gray-100 p-8">
          <h1 className="text-3xl font-bold mb-6">Welcome, Green Earth Foundation!</h1>
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="font-semibold text-lg">Total Funds Raised</h3>
            <p className="text-blue-600 text-2xl font-bold">$150,000</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-green-900 text-white p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Donor Dashboard</h2>
        <nav className="space-y-2">
          <Link to="#" className="block hover:bg-green-700 rounded p-2">My Donations</Link>
          <Link to="#" className="block hover:bg-green-700 rounded p-2">Discover NGOs</Link>
          <Link to="/" className="block hover:bg-green-700 rounded p-2">Logout</Link>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome Back, Jane!</h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg">Total Donated</h3>
            <p className="text-green-600 text-2xl font-bold">$5,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg">NGOs Followed</h3>
            <p className="text-green-600 text-2xl font-bold">5</p>
          </div>
        </div>
      </main>
    </div>
  );
}
