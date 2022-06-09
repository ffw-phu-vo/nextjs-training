import React, { useState } from "react";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    axios.post("http://localhost:5000/login-cookie-http-only", { username, password }, {withCredentials: true})
    .then(res => {
      console.log(res.data)
      axios.get("http://localhost:5000/protected-cookie", {withCredentials: true}).then(res => {
        console.log(res.data)
      })
    });
  };
  return (
    <div>
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />{" "}
      <br />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
