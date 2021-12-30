import { FC, useState, useEffect } from "react";
import "../../less/dashboard-style/dashbaord.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const tokenAuth: string = JSON.parse(localStorage.getItem("authToken")!);
interface CardPorps {
  title: string;
  img: string;
  mainContent: string;
  liked: { _id: string }[];
  authorID: string;
  blogId: string;
  likeSystem: (authorID: string, blogId: string) => void;
  cancelLike: () => void
}

const Card: FC<CardPorps> = ({
  title,
  img,
  liked,
  mainContent,
  authorID,
  blogId,
  likeSystem,
  cancelLike
}) => {
  const [blogAuthor, setBlogAuthor] = useState<any>({
    id: "",
    name: "",
    image: "",
  });
  const [isLiked, setIstLiked] = useState(false);

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  useEffect(() => {
    for (let i = 0; i < liked.length; i++) {
      if (liked[i]._id === tokenAuth) setIstLiked(true);
    }

    if (authorID === "") return;

    axios
      .get(`http://localhost:5000/user/${authorID}`)
      .then((response) => setBlogAuthor(response.data))
      .catch((err) => {
        console.log(err);
      });
    return () => setBlogAuthor({});
  }, []);

  const likeBlog = () => {
    axios
      .put(`http://localhost:5000/blog/${blogId}/liked/${tokenAuth}`)
      .then((response) => response)
      .catch((err) => {
        console.log(err);

        return () => source.cancel("axios request cancelled");
      });
  };

  return (
    <div className="card">
      <img src={"/uploads/" + img} alt="" />
      <div className="hover-box"></div>
      <div className="main-content">
        <h2>{title}</h2>
        <div className="blog-author">
          <div className="img-wrapper">
            <img src={blogAuthor!.image} alt="" />
          </div>
          <p>{blogAuthor!.name}</p>
        </div>
        <p className="mainContent">
          {mainContent.length > 60
            ? `${mainContent.slice(0, 60).trim()}...`
            : mainContent}
        </p>
      </div>
      <div
        className="like-wrapper" 
        onClick={() => {
          cancelLike()
          likeBlog();
          likeSystem(tokenAuth, blogId);
        }}
      >
        <p style={{ color: "#FFF" }}>{liked.length}</p>
        <FontAwesomeIcon icon={faHeart} color={isLiked ? "#ff3737" : "#FFF"} />
      </div>
    </div>
  );
};

export default Card;
