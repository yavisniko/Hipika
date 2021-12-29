import { FC, useState, useEffect } from "react";
import "../../less/dashboard-style/dashbaord.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'

interface CardPorps {
  title: string;
  img: string;
  author: string;
  mainContent: string;
  liked: string[];
  authorID: string
}

const Card: FC<CardPorps> = ({ title, img, author, liked, mainContent, authorID }) => {
  const [blogAuthor, setBlogAuthor] = useState({
    id: "",
    name: "",
    image: "",
  });

  useEffect(() => {
    if(authorID === "") return

    axios.get(`http://localhost:5000/user/${authorID}`)
    .then(response => setBlogAuthor(response.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="card">
      <img src={"/uploads/" + img} alt="" />
      <div className="hover-box"></div>
      <div className="main-content">
        <h2>{title}</h2>
        <div className="blog-author">
          <div className="img-wrapper">
            <img src={blogAuthor.image} alt="" />
          </div>
          <p>{blogAuthor.name}</p>
        </div>
        <p className="mainContent">
          {mainContent.length > 60
            ? `${mainContent.slice(0, 60).trim()}...`
            : mainContent}
        </p>
      </div>
      <div className="like-wrapper">
        <p style={{ color: "#FFF" }}>{liked.length}</p>
        <FontAwesomeIcon icon={faHeart} color={"#FFF"} />
      </div>
    </div>
  );
};

export default Card;
