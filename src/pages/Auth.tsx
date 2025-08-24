import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";

const AuthPage: React.FC = () => {
  const [tab, setTab] = useState("login");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else {
      setMessage("Login successful!");
      setTimeout(() => navigate("/"), 1000);
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setMessage("Signup successful! Check your email for confirmation.");
    setLoading(false);
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) setError(error.message);
    else setMessage("Password reset email sent!");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-secondary-light">
      <div className="bg-white rounded-xl shadow-premium p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 font-semibold rounded-t-lg ${tab === "login" ? "bg-primary text-white" : "bg-muted"}`}
            onClick={() => { setTab("login"); setError(""); setMessage(""); }}
          >Login</button>
          <button
            className={`px-4 py-2 font-semibold rounded-t-lg ${tab === "signup" ? "bg-primary text-white" : "bg-muted"}`}
            onClick={() => { setTab("signup"); setError(""); setMessage(""); }}
          >Sign Up</button>
          <button
            className={`px-4 py-2 font-semibold rounded-t-lg ${tab === "forgot" ? "bg-primary text-white" : "bg-muted"}`}
            onClick={() => { setTab("forgot"); setError(""); setMessage(""); }}
          >Forgot Password</button>
        </div>
        {tab === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded" />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded" />
            <button type="submit" className="w-full bg-primary text-white py-2 rounded" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {message && <div className="text-green-500 text-sm">{message}</div>}
          </form>
        )}
        {tab === "signup" && (
          <form onSubmit={handleSignup} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded" />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded" />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full px-4 py-2 border rounded" />
            <button type="submit" className="w-full bg-primary text-white py-2 rounded" disabled={loading}>{loading ? "Signing up..." : "Sign Up"}</button>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {message && <div className="text-green-500 text-sm">{message}</div>}
          </form>
        )}
        {tab === "forgot" && (
          <form onSubmit={handleForgot} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded" />
            <button type="submit" className="w-full bg-primary text-white py-2 rounded" disabled={loading}>{loading ? "Sending..." : "Send Reset Link"}</button>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {message && <div className="text-green-500 text-sm">{message}</div>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;