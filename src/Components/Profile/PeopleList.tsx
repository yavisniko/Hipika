import { FC, useState, useEffect } from "react"
import { PeopleProps } from "../Blog/People"
import { tokenAuth } from "../Dashboard/Card"
import { useNavigate } from "react-router-dom"
import axios from "axios"

interface PropWithClose extends PeopleProps {
  close: () => void
}

const PeopleList: FC<PropWithClose> = ({
  userId,
  name,
  image,
  followers,
  close,
}) => {
  const [iFollow, setIFollow] = useState(false)
  const [awaitFollow, setAwaitFollow] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {
    followers.includes(tokenAuth) ? setIFollow(true) : setIFollow(false)
  }, [])

  const followUser = () => {
    if (awaitFollow) return

    setAwaitFollow(true)

    axios
      .post(`http://localhost:5000/dashboard/follow/${userId}/${tokenAuth}`)
      .then((response) => {
        if (response.status === 200) setIFollow(!iFollow)
        setAwaitFollow(false)
      })
  }

  return (
    <div className="user-box">
      <div
        className="user-info"
        onClick={() => {
          navigate(`/user/${userId}`)
          close()
        }}
      >
        <div className="img-wrapper">
          <img src={`/uploads/avatar/${image}`} alt="" />
        </div>
        <p style={{ marginLeft: "20px", color: "#FFF" }}>{name}</p>
      </div>
      <button 
      className={iFollow ? "follow-btn followed" : "follow-btn"}
      onClick={followUser}
      >
        {iFollow ? "FOLLOWED" : "FOLLOW"}
      </button>
    </div>
  )
}

export default PeopleList
