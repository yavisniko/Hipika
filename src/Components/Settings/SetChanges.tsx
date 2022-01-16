import React, { useState, ChangeEvent, useEffect } from "react"
import { defaultState, UserProps } from "./interface"
import { tokenAuth } from "../Dashboard/Card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { isEqual } from "../../utils/isEqual"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import "../../less/settings-style/setChanges.css"
import axios from "axios"
import UserForm from "./UserForm"
import Loading from "./Loading"

const SetChanges = () => {
  const [updateUser, setUpdateUser] = useState<UserProps>(defaultState)
  const [displayImage, setDisplayImage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showSave, setShowSave] = useState(false)
  const [unChanged, setUnChanged] = useState<UserProps>(defaultState)
  const fileId: string = String(new Date().getTime())

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
    if(isLoading) return

    setIsLoading(true)

    axios
      .get(`http://localhost:5000/dashboard/getUser/${tokenAuth}/`)
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
      .catch((err) => console.log(err))
  }, [ ])

  useEffect(() => {
    if(isLoading) return

    const isequal = isEqual<UserProps>(unChanged, updateUser)

    if (isLoading || updateUser.email === "") return

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
