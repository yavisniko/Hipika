import { FC, useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

interface PeopleProp {
  name: string;
  image: string;
  id: string;
  followers: string[],
  close: () => void
}

const PeopleList:FC<PeopleProp> = ({name, image, id, followers, close}) => {
  const [iFollow, setIFollow] = useState<boolean>(false)
  const authToken = JSON.parse(localStorage.getItem('authToken')!)
  const navigate = useNavigate()

  useEffect(() => {
    if(followers.includes(authToken)){
      setIFollow(true)
    }
  }, [])

  console.log(id, authToken);
  

  return (
    <div className="user-box">
      <div className="user-info" onClick={() => {
        close()
        navigate(`/user/${id}`)
      }}>
        <div className="img-wrapper">
          <img src={`/uploads/avatar/${image}`} alt="avatar" />
        </div>
        <p style={{marginLeft:"20px", color: "#FFF"}}>{name}</p>
      </div>
      {
        authToken === id
        ? null
        :  <button 
        className={iFollow ? "follow-btn followed" : "follow-btn"}
        >
          {iFollow ? "FOLLOWED" : "FOLLOW"}
        </button>
      }
    </div>
  )
}

export default PeopleList
