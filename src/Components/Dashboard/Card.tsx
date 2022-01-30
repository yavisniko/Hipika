import { FC, useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../../less/dashboard-style/dashbaord.css"
import "../../less/dashboard-style/loader.css"

export interface CardProps {
  refs: any,
  title: string
  img: string
  mainContent: string
  liked: { _id: string }[]
  authorID: string
  blogId: string
  likeSystem: (blogId: string) => void,
}

const Card: FC<CardProps> = ({
  title,
  img,
  liked,
  mainContent,
  authorID,
  blogId,
  likeSystem,
  refs
}) => {
  const [blogAuthor, setBlogAuthor] = useState<any>({
    id: "",
    name: "",
    image: "",
  })
  const [loadLike, setLoadLike] = useState<boolean>(false)
  const [isLiked, setIstLiked] = useState(false)
  const tokenAuth: string = JSON.parse(localStorage.getItem("authToken")!)
  let navigate = useNavigate()

  useEffect(() => {
    for (let i = 0; i < liked.length; i++) {
      if (liked[i]._id === tokenAuth) setIstLiked(true)
    }

    if (authorID === "") return

    axios
      .get(`http://localhost:5000/user/${authorID}`)
      .then((response) => setBlogAuthor(response.data))
      .catch((err) => {
        console.log(err)
      })
    return () => setBlogAuthor({})
  }, [])

  const likeBlog = () => {
    if (loadLike) return

    setLoadLike(true)

    axios
      .put(`http://localhost:5000/blog/${blogId}/liked/${tokenAuth}`)
      .then((response) => {
        if (response.data.success) setLoadLike(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="card" ref={refs}>
      <img src={"/uploads/" + img} alt="" />
      <div className="hover-box" onClick={() => navigate(`/blog/${blogId}`)}></div>
      <div className="main-content">
        <h2>{title.length > 15 ? `${title.slice(0, 15).trim()}...` : title}</h2>
        <div className="blog-author" onClick={() => navigate(`/user/${authorID}`)}>
          <div className="img-wrapper">
            <img src={"/uploads/avatar/" + blogAuthor!.image} alt="" />
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
          likeBlog()
          likeSystem(blogId)
        }}
      >
        {!loadLike ? (
          <>
            <p style={{ color: "#FFF" }}>{liked.length}</p>
            <FontAwesomeIcon icon={faHeart} color={isLiked ? "#ff3737" : "#FFF"} />
          </>
        ) : (
          <span className="like-loader"></span>
        )}
      </div>
    </div>
  )
}

export default Card
