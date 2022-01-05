import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { tokenAuth } from "../Dashboard/Card";
import ProfileBody from "./ProfileBody";
import axios from "axios";
import "../../less/profile-styles/profile.css";
import "../../less/profile-styles/loading.css";

export interface ProfileProps {
  name: string;
  surname: string;
  image: string;
  email: string;
  followers: string[];
}

const defaultState: ProfileProps = {
  name: "",
  surname: "",
  image: "",
  email: "",
  followers: [],
};

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileProps>(defaultState);
  const [isLoading, setIsloading] = useState(false);
  const [isMine, setIsMine] = useState<boolean>(false);
  const [followLoad, setFollowLoad] = useState(false);
  const [iFollow, setIFollow] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id === tokenAuth) setIsMine(true);
    setIsloading(true);

    axios
      .get(`http://localhost:5000/dashboard/getUser/${id}`)
      .then((response) => {
        setIsloading(false);
        setProfileInfo({
          name: `${response.data.name} ${response.data.surname}`,
          surname: response.data.surname,
          image: response.data.image,
          email: response.data.email,
          followers: response.data.followers.map((e: { _id: string }) => e._id),
        });
      });
  }, [id]);

  useEffect(() => {
    profileInfo.followers.includes(tokenAuth)
      ? setIFollow(true)
      : setIFollow(false);
  }, [profileInfo]);

  const followUser = () => {
    if (followLoad) return;

    setFollowLoad(true);
    axios
      .post(`http://localhost:5000/dashboard/follow/${id}/${tokenAuth}`)
      .then((response) => {
        if (response) {
          setIFollow(!iFollow);
          setFollowLoad(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profile-section">
      {isLoading ? (
        <div className="pfp-loader-container">
          <span className="profile-loader"></span>
        </div>
      ) : (
        <ProfileBody
          isMine={isMine}
          profileInfo={profileInfo}
          iFollow={iFollow}
          followUser={followUser}
          setNegative={() => setIFollow(!iFollow)}
          followLoad={followLoad}
        />
      )}
    </div>
  );
};

export default Profile;
