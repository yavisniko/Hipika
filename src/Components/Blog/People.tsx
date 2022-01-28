import {FC, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import '../../less/blog-styles/person.css'
import axios from "axios"

export interface PeopleProps {
  userId: string,
  name: string,
  followers: string[],
  image: string,
}

const People: FC<PeopleProps> = ({userId, name, image}) => {
  let navigate = useNavigate()
  const [following, setFollowing] = useState(false)
  const [followLoad, setFollowLoad] = useState(false)
  const tokenAuth: string = JSON.parse(localStorage.getItem('authToken')!)

  useEffect(() => {
    const token_validate = JSON.parse(sessionStorage.getItem('qw') as string )
    const requestor = JSON.parse(localStorage.getItem('authToken')!)
    
        if(token_validate === null || requestor === null){
            navigate('/')
            return
        }

    if(userId === tokenAuth) return

    axios.get(`http://localhost:5000/dashboard/getUser/${userId}/${requestor}/${token_validate}`)
    .then(response => {
      const followers = response.data.followers.map((e: {_id: string}) => e._id)
      if(followers.includes(tokenAuth)) setFollowing(true)
    })
    .catch(err => {
      if(err.response.status === 403 && err.response.data.msg === 'invalid user'){
          localStorage.removeItem('authToken')
          sessionStorage.removeItem('qw')

          navigate('/')
      }
  })
  }, [])

  return (
    <div className="person-box">
      <div className="main-info" onClick={() => navigate(`/user/${userId}`)}>
        <div className="avatar">
          <img src={`/uploads/avatar/${image}`} alt="" />
        </div>
        <p>{name}</p>
      </div>
      {
        userId !== tokenAuth ? 
        <button className={following ? "follow active" : "follow"} onClick={() => {
          if(followLoad) return

          setFollowLoad(true)
          axios.post(`http://localhost:5000/dashboard/follow/${userId}/${tokenAuth}`)
          .then(response => {
            if(response.status === 200) setFollowing(!following)
            setFollowLoad(false)
          })
        }}>
          {
            followLoad ? 
            <div className="pfp-loader-container">
              <span className="profile-loader" style={{width: "5px", height: "5px", border: "2px solid #FFF"}}></span>  
            </div>
            : following ? "Following" : "Follow"
          }
        </button> : 
        null
      }
    </div>
  )
}

export default People