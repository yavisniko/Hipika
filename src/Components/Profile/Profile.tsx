import { useState, useEffect, Fragment } from "react"
import { useParams } from "react-router-dom"
import { tokenAuth } from "../Dashboard/Card"
import ProfileBody from "./ProfileBody"
import Follow from "./follow"
import axios from "axios"
import {
  defaultState,
  ProfileProps,
  containerProps,
  defaultTemplate,
  boolDefault
} from "./interfaces"
import "../../less/profile-styles/loading.css"
import '../../less/profile-styles/profile.css'

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileProps>(defaultState)
  const [propBooleans, setPropBooleans] = useState(boolDefault)

  const [isMine, setIsMine] = useState<boolean>(false)
  const [whatToShowInContainer, setWhatToShowInContainer] =
    useState<containerProps>(defaultTemplate)
  const { id } = useParams()
  
  useEffect(() => {
    tokenAuth === id ? setIsMine(true) : setIsMine(false)
    setPropBooleans({...propBooleans, load: true})

    axios.get(`http://localhost:5000/dashboard/getUser/${id}`).then((response) => {
      setPropBooleans({...propBooleans, load: false})
      setProfileInfo({
        name: `${response.data.name} ${response.data.surname}`,
        surname: response.data.surname,
        image: response.data.image,
        email: response.data.email,
        followers: response.data.followers.map((e: { _id: string }) => e._id),
        following: response.data.following.map((e: { _id: string }) => e._id),
      })
    })
  }, [id])

  useEffect(() => {
    profileInfo.followers.includes(tokenAuth)
    ? setPropBooleans({...propBooleans, iFollow: true})
    : setPropBooleans({...propBooleans, iFollow: false}) 
  }, [profileInfo])

  const followUser = () => {
    if (propBooleans.followLoad) return

    setPropBooleans({...propBooleans, followLoad: true})
    axios
      .post(`http://localhost:5000/dashboard/follow/${id}/${tokenAuth}`)
      .then((response) => {
        if (response.status === 200) {
          setPropBooleans({...propBooleans, iFollow: !propBooleans.iFollow})
        }
        setPropBooleans({...propBooleans, followLoad: false})
      })
      .catch((err) => console.log(err))
  }

  const setContainer = (prop: containerProps): void => {
    setWhatToShowInContainer(prop)
    setPropBooleans({...propBooleans, showContainer: true})
  }

  return (
    <>
      {
        propBooleans.showContainer 
         ? <Follow 
          from={whatToShowInContainer.from}
          whatIs={whatToShowInContainer.whatIs}
          whatToShow={whatToShowInContainer.whatToShow}
          close={() => setPropBooleans({...propBooleans, showContainer: false})}
        />
        : null
      }
    <div className="profile-section">
      { 
      propBooleans.load ? (
        <div className="pfp-loader-container">
          <span className="profile-loader"></span>
        </div>
      ) : (
        <ProfileBody
          setContainer={setContainer}
          isMine={isMine}
          profileInfo={profileInfo}
          iFollow={propBooleans.iFollow}
          followUser={followUser}
          setNegative={() =>  setPropBooleans({...propBooleans, iFollow: !propBooleans.iFollow})}
          followLoad={propBooleans.followLoad}
        />
      )
      }
    </div>
    </>
  )
}

export default Profile
