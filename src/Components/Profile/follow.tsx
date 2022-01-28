import { FC, useEffect, useState, useRef } from "react"
import { containerProps } from "./interfaces"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { MappingProps } from "../Blog/LikedLists"
import PeopleList from "./PeopleList"
import axios from "axios"
import "../../less/profile-styles/follow.css"
import "../../less/Login-styles/loading.css"
import { useNavigate } from "react-router-dom"

const Follow: FC<containerProps> = ({ from, whatIs, whatToShow, close }) => {
  const [followUser, setFollowUser] = useState<MappingProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  let navigate = useNavigate()
  const tokenAuth: string = JSON.parse(localStorage.getItem('authToken')!)

  const handleOutsideClick = (e: any) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      close!()
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true)

    return () => document.removeEventListener("click", handleOutsideClick)
  })

  const fetchUser = async () => {
    const token_validate = JSON.parse(sessionStorage.getItem("qw") as string)
    const requestor = JSON.parse(localStorage.getItem("authToken")!)

    if (token_validate === null || requestor === null) {
      navigate("/")
      return
    }

    const fetchingURL: string[] = whatToShow.map(
      (id) =>
        `http://localhost:5000/dashboard/getUser/${id}/${requestor}/${token_validate}`
    )

    await axios
      .all(fetchingURL.map((user) => axios.get(user)))
      .then((response) => {
        const fetchedUser: MappingProps[] = []

        response.map((e) => {
          setIsLoading(true)
          fetchedUser.push({
            name: `${e.data.name} ${e.data.surname}`,
            userId: e.data.userId,
            image: e.data.image,
            followers: e.data.followers.map((e: { _id: string }) => e._id),
            _id: tokenAuth,
          })
          setFollowUser(fetchedUser)
          setIsLoading(false)
        })
      })
      .catch((err) => {
        if (
          err.response.status === 403 &&
          err.response.data.msg === "invalid user"
        ) {
          localStorage.removeItem("authToken")
          sessionStorage.removeItem("qw")

          navigate("/")
        }
      })
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className="follow-background">
      <div className="follow-container" ref={containerRef}>
        <button className="close-btn" onClick={() => close!()}>
          <FontAwesomeIcon icon={faTimes} color={"#FFF"} />
        </button>
        <div className="title">
          {whatIs === "followers"
            ? `people who follow ${from}`
            : `${from} follows to`}
        </div>
        <div className="follower-lists">
          {!isLoading ? (
            followUser.map((followedUser) => {
              return (
                <PeopleList
                  close={() => close!()}
                  name={followedUser.name}
                  image={followedUser.image}
                  followers={followedUser.followers}
                  userId={followedUser.userId}
                  key={followedUser.userId}
                />
              )
            })
          ) : (
            <span className="loader"></span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Follow
