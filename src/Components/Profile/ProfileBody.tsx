import {FC} from 'react'
import {ProfileProps} from "./Profile"
import "../../less/profile-styles/loading.css"

interface ProfileBodyProps {
  profileInfo: ProfileProps,
  followUser: () => void,
  isMine: boolean,
  iFollow: boolean,
  setNegative: () => void,
  followLoad: boolean
}

const ProfileBody: FC<ProfileBodyProps> = ({profileInfo, followUser, isMine, iFollow, setNegative, followLoad}) => {
  return (
    <>
        <div className="profile-avatar">
          <div className="avatar-frame">
              <img src={'/uploads/avatar/'+profileInfo.image} alt="avatar-img" />
          </div>
        </div>
        <div className="profile-info">
          <h1>{profileInfo.name}</h1>
          {isMine ? <p>{profileInfo.email}</p> : null}
          <h2>Followers: {profileInfo.followers.length}</h2>
          <h2 style={{color: "#2986CC"}}>Following: {profileInfo.following.length}</h2>
        </div>
        {
        !isMine ? <button className={!iFollow ? "follow-btn" : "follow-btn followed"} onClick={() => {
          followUser();
          setNegative()
        }}>{
          followLoad ?
          <div className="pfp-loader-container">
            <span className="profile-loader" style={{width: "10px", height: "10px", border: "2px solid #FFF"}}></span>
          </div> : 
          !iFollow ? "Follow" : "Following"
        }</button> : null}
        </>
  )
}

export default ProfileBody
