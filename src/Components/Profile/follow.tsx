
import { FC, useEffect, useState, useRef } from "react"
import { containerProps } from "./interfaces"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { tokenAuth } from "../Dashboard/Card"
import { MappingProps } from "../Blog/LikedLists"
import PeopleList from "./PeopleList"
import axios from "axios"
import "../../less/profile-styles/follow.css"
import '../../less/Login-styles/loading.css'

const Follow: FC<containerProps> = ({ from, whatIs, whatToShow, close }) => {
  const [followUser, setFollowUser] = useState<MappingProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
    const fetchingURL: string[] = whatToShow.map(
      (id) => `http://localhost:5000/dashboard/getUser/${id}`
    )

    await axios.all(fetchingURL.map((user) => axios.get(user))).then((response) => {
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
          {
            !isLoading
              ? followUser.map((followedUser) => {
                  return (
                    <PeopleList
                      close={() => close!()}
                      name={followedUser.name}
                      image={followedUser.image}
                      followers={followedUser.followers}
                      id={followedUser.userId}
                      key={followedUser.userId}
                    />
                  )
                })
              : <span className="loader"></span>
            }
        </div>
      </div>
    </div>
  )
}

export default Follow
