import { FC } from "react"
import { ProfileProps, containerProps } from "./interfaces"
import "../../less/profile-styles/loading.css"
import EarclyAccess from "./assets/access.png"
import Developer from "./assets/devloper.png"
import Tester from "./assets/tester.png"
import Verified from "./assets/verified.png"

interface ProfileBodyProps {
  profileInfo: ProfileProps
  followUser: () => void
  isMine: boolean
  iFollow: boolean
  setNegative: () => void
  followLoad: boolean
  setContainer: (prop: containerProps) => void
}

const ProfileBody: FC<ProfileBodyProps> = ({
  profileInfo,
  followUser,
  isMine,
  iFollow,
  setNegative,
  followLoad,
  setContainer,
}) => {
  return (
    <>
      <div className="profile-avatar">
        <div className="avatar-frame">
          <img src={"/uploads/avatar/" + profileInfo.image} alt="avatar-img" />
        </div>
      </div>
      <div className="profile-info">
        <h1>{profileInfo.name}</h1>
        <div className="badges">
          {profileInfo.developer && (
            <div className="badge">
              <div className="box arrow-bottom">
                <span id="Developer">Developer</span> badge means, this person made this platform
              </div>
              <img src={Developer} alt="developer-badge" />
            </div>
          )}
          {profileInfo.tester && (
            <div className="badge">
              <div className="box arrow-bottom">
                <span id="Tester">Beta Tester</span> badge means, this person was helping developer to catch some bugs,
              </div>
              <img src={Tester} alt="tester-badge" />
            </div>
          )}
          {profileInfo.early_access && (
            <div className="badge">
              <div className="box arrow-bottom">
                <span id="Early_Access">Early Access</span> badge means, this person could use this website before publishing platform
              </div>
              <img src={EarclyAccess} alt="earcly access badge" />
            </div>
          )}
          {profileInfo.verified && (
            <div className="badge">
              <div className="box arrow-bottom">
                <span id="Verified">Verified</span> badge means, This person is public figure or someone special idk
              </div>
              <img src={Verified} alt="verified-badge" />
            </div>
          )}
        </div>
        {isMine ? <p>{profileInfo.email}</p> : null}
        <div
          className="follow-wrapper"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "300px",
          }}
        >
          <h2
            onClick={() =>
              setContainer({
                from: profileInfo.name,
                whatIs: "followers",
                whatToShow: profileInfo.followers,
              })
            }
          >
            Followers: {profileInfo.followers.length}
          </h2>
          <h2
            style={{ color: "#2986CC" }}
            onClick={() =>
              setContainer({
                from: profileInfo.name,
                whatIs: "followings",
                whatToShow: profileInfo.following,
              })
            }
          >
            Following: {profileInfo.following.length}
          </h2>
        </div>
      </div>

      {!isMine ? (
        <button
          className={!iFollow ? "follow-btn" : "follow-btn followed"}
          onClick={() => {
            followUser()
            setNegative()
          }}
        >
          {followLoad ? (
            <div className="pfp-loader-container">
              <span
                className="profile-loader"
                style={{ width: "10px", height: "10px", border: "2px solid #FFF" }}
              ></span>
            </div>
          ) : !iFollow ? (
            "Follow"
          ) : (
            "Following"
          )}
        </button>
      ) : null}
    </>
  )
}

export default ProfileBody
