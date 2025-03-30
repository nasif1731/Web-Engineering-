import React, { useState } from "react";
import { Button, Input, ErrorMessage } from "../../components/common";
import axios from "axios";
import { useAuth } from "../../context"; // ✅ adjust path if needed
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth(); // ✅ must be inside the component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      login(data.user, data.token);

      if (data.user.role === "student") navigate("/student/dashboard");
      else if (data.user.role === "tutor") navigate("/tutor/dashboard");
      else if (data.user.role === "admin") navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <ErrorMessage message={error} />}
        <Button type="submit">Login</Button>
        <p className="text-sm mt-2">
          Don't have an account?{" "}
          <a href="/register" className="text-brown-700 underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
