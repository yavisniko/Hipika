import axios from "axios";
import React, { useState } from "react";
import "../../less/Login-styles/login-styles.css";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    setLogin({ ...login, [name]: value });
  };

  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post('http://localhost:5000/login', login)
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }

  return (
    <div className="login-container">
      <form onSubmit={formHandler}>
        <p className="text">Log in</p>
        <input
          type="text"
          name="email"
          onChange={inputHandler}
          value={login.email}
          placeholder="Email" 
        />
        <div className="password-wrapper" style={{ width: "100%" }}>
          <input
            type={!showPassword ? "password" : "text"}
            name="password"
            onChange={inputHandler}
            value={login.password}
            placeholder="Password"
            autoComplete="off"
          />
          <input
            type="checkbox"
            onClick={() => setShowPassword(!showPassword)}
          />
          <label style={{ color: "#FFF" }}>Show password</label>
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
