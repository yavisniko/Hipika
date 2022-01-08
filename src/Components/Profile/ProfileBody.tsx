import {FC} from 'react'
import { ProfileProps, containerProps } from "./interfaces"
import "../../less/profile-styles/loading.css"

interface ProfileBodyProps {
  profileInfo: ProfileProps,
  followUser: () => void,
  isMine: boolean,
  iFollow: boolean,
  setNegative: () => void,
  followLoad: boolean,
  setContainer: (prop: containerProps) => void
}

const ProfileBody: FC<ProfileBodyProps> = ({profileInfo, followUser, isMine, iFollow, setNegative, followLoad, setContainer}) => {
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
          <div className="follow-wrapper" style={{display: "flex",alignItems: 'center', justifyContent:'space-between', width: '300px' }}>
            
            <h2 onClick={() => setContainer({
              from: profileInfo.name,
              whatIs: 'followers',
              whatToShow: profileInfo.followers
            })}>Followers: {profileInfo.followers.length}</h2>
            <h2 style={{color: "#2986CC"}}onClick={() => setContainer({
              from: profileInfo.name,
              whatIs: 'followings',
              whatToShow: profileInfo.following
            })}>Following: {profileInfo.following.length}</h2>

          </div>
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
