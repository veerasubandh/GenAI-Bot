import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.phone || !form.password) {
      return setError("All fields are required.");
    }

    setError("");
    setSuccess("Account created successfully! Redirecting...");

    // Mock success → redirect after 1s
    setTimeout(() => {
      navigate("/chat");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-primary">Create Your FinAI Account</h2>
        <p className="text-center text-gray-500 mt-2">Manage your card with smart AI assistance</p>

        <form className="mt-6 space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-gray-600 mb-1 text-sm">Full Name</label>
            <input
              name="fullName"
              type="text"
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 text-sm">Email address</label>
            <input
              name="email"
              type="email"
              placeholder="john@email.com"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 text-sm">Phone Number</label>
            <input
              name="phone"
              type="tel"
              placeholder="+91-9876543210"
              value={form.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 text-sm">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <Link to="/chat" className="text-primary font-semibold hover:underline">
            Start Chat
          </Link>
        </p>
      </div>
    </div>
  );
}
