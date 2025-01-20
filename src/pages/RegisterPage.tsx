import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(email, password);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
