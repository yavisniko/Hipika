import axios from "axios"
import { FC, useState, ChangeEvent, useLayoutEffect, FormEvent } from "react"
import { tokenAuth } from "../../Dashboard/Card"
import "../../../less//settings-style/security-styles/password.css"

const PasswordinSecurity: FC<{ goBack: () => void }> = ({ goBack }) => {
  const [newPassword, setNewPassword] = useState({
    curr_password: "",
    password: "",
    repeat_password: "",
  })
  const [currPassword, setCurrPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useLayoutEffect(() => {
    axios
      .get(`http://localhost:5000/dashboard/getUser/${tokenAuth}`)
      .then((resp) => {
        setCurrPassword(resp.data.password)
      })
  }, [])

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setNewPassword({ ...newPassword, [name]: value })
  }

  const changePassword = (e: FormEvent) => {
    e.preventDefault()

    if(isLoading) return

    const objValues = Object.values(newPassword)

    for(let i of objValues){
      if(i === '') alert('please fill blank fields')
      break
    }

    if(currPassword !== newPassword.curr_password){
      alert(`your inputed password doesn't equal the current one`)
    }else if(currPassword === newPassword.password){
      alert('new password and current can`t be same')
    }
    else if(newPassword.password !== newPassword.repeat_password){
      alert(`repeated password doesn't match what you inputed as new one`)
    }else if(newPassword.password.length < 8){
      alert('Your password is lower than 8 character MAKE IT BIGGER') 
    }else {
      setIsLoading(true)

      axios.put(`http://localhost:5000/settings/change-password/${newPassword.password}/${tokenAuth}`)
      .then(result => {
        if(result.data.msg === "successfuly saved"){
          setIsLoading(true)
          alert('password changed successfuly')
          goBack()
        }
      }).catch(err => {
        console.log(`some error has occured`, err);
        
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
          ? {border: "3px solid #FF4141"}
          : newPassword.repeat_password === ""
          ? {border: "none"}
          : {border: "3px solid #7EFF42"}
        }
      />
      <button type="submit" className="change-btn">{isLoading ? <span className="loader"></span>: "Change"}</button>
    </form>
  )
}

export default PasswordinSecurity
