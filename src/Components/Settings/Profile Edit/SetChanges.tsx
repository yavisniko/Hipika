import React, { useState, ChangeEvent, useEffect } from "react"
import { defaultState, UserProps } from "../interface"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { isEqual } from "../../../utils/isEqual"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import UserForm from "./UserForm"
import Loading from "../Loading"
import "../../../less/settings-style/setChanges.css"
import { useNavigate } from "react-router-dom"
import { request } from "https"

const SetChanges = () => {
  const [updateUser, setUpdateUser] = useState<UserProps>(defaultState)
  const [displayImage, setDisplayImage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showSave, setShowSave] = useState(false)
  const [unChanged, setUnChanged] = useState<UserProps>(defaultState)
  const fileId: string = String(new Date().getTime())
  const tokenAuth = JSON.parse(localStorage.getItem("authToken")!)
  let navigate = useNavigate()


  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setUpdateUser({ ...updateUser, [name]: value })
  }

  const fileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const fileSize: number = parseFloat(
      (e.target.files![0].size / 1024 / 1024).toFixed(3)
    )

    if (fileSize > 5) {
      alert("Your file is higher than 5MB")
    } else {
      const imageToURL: string = URL.createObjectURL(e.target.files![0])
      setFile(e.target.files![0])
      setDisplayImage(imageToURL)

      setUpdateUser({ ...updateUser, path: `${fileId}-${e.target.files![0].name}` })
    }
  }
  
  useEffect(() => {

    setIsLoading(true)
    const token_validate = JSON.parse(sessionStorage.getItem('qw') as string )
    const requestor = JSON.parse(localStorage.getItem('authToken')!)

        if(token_validate === null || requestor === null){
            navigate('/')
            return
        }
    
    axios
    .get(`http://localhost:5000/dashboard/getUser/${tokenAuth}/${requestor}/${token_validate}`)
    .then((result) => {
      const { name, image, surname, password, email } = result.data
      
      setDisplayImage(image)
      
      setUpdateUser({
        name: name,
        surname: surname,
        email: email,
        path: image,
        password: password,
      })
      
      setUnChanged({
        name: name,
        surname: surname,
        email: email,
        path: image,
        password: password,
      })
      
      setIsLoading(false)
    })
    .catch(err => {
      if(err.response.status === 403 && err.response.data.msg === 'invalid user'){
          localStorage.removeItem('authToken')
          sessionStorage.removeItem('qw')

          navigate('/')
      }
  })
  }, [ ])
  
  useEffect(() => {
    if(isLoading || updateUser.email === '') return
    
    const isequal = isEqual<UserProps>(unChanged, updateUser)
    
    if (!isequal) {
      setShowSave(true)
    } else setShowSave(false)
  }, [updateUser])

  return (
    <div className="set-changes-container">
      <div className="changes-root">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <h1>Profile Settings</h1>
            <div className="changes-wrapper">
              <div className="img-changer">
                <div className="img-circle">
                  <input type="file" accept="image/*" onChange={fileUpload} />
                  {displayImage.trim() === "" ? (
                    <>
                      <FontAwesomeIcon icon={faCamera} color="#FFF" size={"5x"} />
                      <h3>Upload Photo</h3>
                    </>
                  ) : (
                    <img
                      src={
                        displayImage.substring(0, 4) !== "blob"
                          ? `/uploads/avatar/${displayImage}`
                          : displayImage
                      }
                      alt=""
                    />
                  )}
                </div>
              </div>
              <UserForm
                showSave={showSave}
                updateUser={updateUser}
                inputHandler={inputHandler}
                file={file}
                loading={isLoading}
                changeTrue={() => setIsLoading(true)}
                changeFalse={() => setIsLoading(false)}
                
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SetChanges
