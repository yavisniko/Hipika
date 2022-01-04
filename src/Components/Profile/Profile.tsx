import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { tokenAuth } from '../Dashboard/Card';
import axios from "axios";
import "../../less/profile-styles/profile.css"

interface ProfileProps {
  name: string,
  surname: string,
  image: string,
  email: string,
  followers: {_id: string}[] | undefined,
}

const defaultState: ProfileProps = {
  name: "",
  surname: "",
  image: "",
  email: "",
  followers: [],
}

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileProps>(defaultState)
  const [isMine, setIsMine] = useState<boolean>(false)
  const {id} = useParams()

  useEffect(() => {
    if(id === tokenAuth) setIsMine(true)

    axios.get(`http://localhost:5000/dashboard/getUser/${id}`)
    .then(response => {
      setProfileInfo({
        name: `${response.data.name} ${response.data.surname}`,
        surname: response.data.surname,
        image: response.data.image,
        email: response.data.email,
        followers: response.data.followers
      })
    })

  }, [])

  return ( 
    <div className="profile-section">
        <div className="profile-avatar">
          <div className="avatar-frame">
              <img src={'/uploads/avatar/'+profileInfo.image} alt="avatar-img" />
          </div>
        </div>
        <div className="profile-info">
          <h1>{profileInfo.name}</h1>
          {isMine ? <p>{profileInfo.email}</p> : null}
          <h2></h2>
        </div>
    </div>
  )
}

export default Profile
