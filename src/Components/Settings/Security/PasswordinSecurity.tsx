import { FC, useState, ChangeEvent, useLayoutEffect, FormEvent } from "react"
import axios from "axios"
import "../../../less//settings-style/security-styles/password.css"
import { useNavigate } from "react-router-dom"

const PasswordinSecurity: FC<{ goBack: () => void }> = ({ goBack }) => {
  const [newPassword, setNewPassword] = useState({
    curr_password: "",
    password: "",
    repeat_password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const tokenAuth = JSON.parse(localStorage.getItem("authToken")!)
  let navigate = useNavigate()

  useLayoutEffect(() => {
    const token_validate = JSON.parse(sessionStorage.getItem("qw") as string)
    const requestor = JSON.parse(localStorage.getItem("authToken")!)

    if (token_validate === null || requestor === null) {
      navigate("/")
      return
    }

    axios
      .get(
        `http://localhost:5000/dashboard/getUser/${requestor}/${requestor}/${token_validate}`
      )
      .then(() => {})
      .catch((err) => {
        if (
          err.response.status === 403 &&
          err.response.data.msg === "invalid user"
        ) {
          localStorage.removeItem("authToken")
          sessionStorage.removeItem("qw")

          navigate("/dashboard")
        }
      })
  }, [])

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setNewPassword({ ...newPassword, [name]: value })
  }

  const changePassword = (e: FormEvent) => {
    e.preventDefault()

    if (isLoading) return

    const objValues = Object.values(newPassword)

    for (let i of objValues) {
      if (i === "") alert("please fill blank fields")
      break
    }

    if (newPassword.password.length < 8) {
      alert("Your password is lower than 8 character MAKE IT BIGGER")
    } else {
      setIsLoading(true)

      const client_secret = JSON.parse(sessionStorage.getItem('qw')!)

      axios
        .put(
          `http://localhost:5000/settings/change-password/${newPassword.curr_password}/${newPassword.password}/${tokenAuth}/${client_secret}`
        )
        .then((result) => {
          console.log(result.data.msg);
          
          if (result.data.msg === "successfuly saved") {
            setIsLoading(true)
            sessionStorage.setItem('qw', JSON.stringify(result.data.new_token))
            console.log(result.data.new_token);
            
            alert("password changed successfuly")
            goBack()
          }else if(result.data.msg = 'invalid password'){
            alert("password doesn't match")
            setIsLoading(false)
          }
        })
        .catch(err => {
          if(err.response.status === 403 && err.response.data.msg === 'invalid user'){
              localStorage.removeItem('authToken')
              sessionStorage.removeItem('qw')

              navigate('/')
          }
      })
    }
  }

  return (
    <form className="password-change-form" onSubmit={changePassword}>
      <div className="go-back" onClick={goBack}>
        Go Back
      </div>
      <label>Current Password</label>
      <input
        type="password"
        autoComplete="off"
        placeholder="Current Passowrd"
        name="curr_password"
        value={newPassword.curr_password}
        onChange={inputHandler}
      />
      <label>New Password</label>
      <input
        type="password"
        placeholder="New Password"
        name="password"
        autoComplete="off"
        value={newPassword.password}
        onChange={inputHandler}
      />
      <label>Repeat New Password</label>
      <input
        type="password"
        placeholder="Repeat New Password"
        name="repeat_password"
        value={newPassword.repeat_password}
        onChange={inputHandler}
        autoComplete="off"
        style={
          newPassword.repeat_password !== "" &&
          newPassword.password !== newPassword.repeat_password
            ? { border: "3px solid #FF4141" }
            : newPassword.repeat_password === ""
            ? { border: "none" }
            : { border: "3px solid #7EFF42" }
        }
      />
      <button type="submit" className="change-btn">
        {isLoading ? <span className="loader"></span> : "Change"}
      </button>
    </form>
  )
}

export default PasswordinSecurity
