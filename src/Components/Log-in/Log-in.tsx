import axios from "axios";
import React, { useState, useEffect, FC } from "react";
import {useNavigate} from "react-router-dom"
import "../../less/Login-styles/login-styles.css";
import "../../less/Login-styles/loading.css"

const Loader = () => {
  return <span className="loader"></span>
}

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [correct, setCorrect] = useState(false)
  const [exist, setExist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
    setExist(false)
    setCorrect(false)
  }, [login])

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    setLogin({ ...login, [name]: value });
  };

  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)

    await axios.post('http://localhost:5000/login', login)
    .then(response => {
      console.log(response)
      setIsLoading(false)
      if(response.data.msg === 'user not found'){
        setCorrect(false) 
        setExist(true)
      }
      if(response.data.msg === 'password is incorrect'){
        setCorrect(true) 
        setExist(false) 
      } else {
        localStorage.setItem('authToken', JSON.stringify(response.data.user_info._id))
        navigate('/dashboard')
      }
    })
    .catch(err => console.log(err))
  }


  return (
    <div className="login-container">
        <p className="text">Log in</p>
      <form onSubmit={formHandler}>
      {
        correct ? 
        <div className="alertbox">
          Password is incorrect
        </div>
        : exist ? 
        <div className="alertbox">
          User doesn't exist on {login.email}
        </div> : null
      }
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
        <button type="submit">
          {
            isLoading ? <Loader />: "Sign in"
          }
        </button>
      </form>
    </div>
  );
};

export default Login;
