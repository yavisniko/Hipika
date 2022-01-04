import {FC} from "react"
import { tokenAuth } from "../Dashboard/Card"
import { useNavigate } from "react-router-dom"
import '../../less/blog-styles/person.css'

export interface PeopleProps {
  userId: string,
  name: string,
  followers: string[],
  image: string,
}

const People: FC<PeopleProps> = ({userId, name, followers, image}) => {
  let navigate = useNavigate()

  return (
    <div className="person-box">
      <div className="main-info" onClick={() => navigate(`/user/${userId}`)}>
        <div className="avatar">
          <img src={`/uploads/avatar/`+image} alt="" />
        </div>
        <p>{name}</p>
      </div>
      {
        userId !== tokenAuth ? 
        <button className="follow">
          FOLLOW
        </button> : 
        null
      }
    </div>
  )
}

export default People