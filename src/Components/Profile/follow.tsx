import { FC, useEffect, useState, useRef } from 'react'
import { containerProps } from './interfaces'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { MappingProps } from '../Blog/LikedLists'
import PeopleList from './PeopleList'
import axios from 'axios'
import '../../less/profile-styles/follow.css'

const Follow: FC<containerProps> = ({from, whatIs, whatToShow, close}) => {
  const [followUser, setFollowUser] = useState<MappingProps[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (e: any) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      close!()
  }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, true)

    return () => 
     document.removeEventListener('click', handleOutsideClick)
  })

  const fetchUser = async (): Promise<void> => {
    await axios.all(whatToShow.map(user => {
      const fetchedUser: any[] = []

      axios.get(`http://localhost:5000/dashboard/getUser/${user}`)
      .then(e => {
        fetchedUser.push(e.data)
      }).catch(err => {
        console.log("some error occured:", err)
      })

      console.log(fetchedUser)
    }))
  }
  
  useEffect(() => {fetchUser()}, [])
  
  
  return (
    <div className="follow-background">
      <div className="follow-container" ref={containerRef}>
        <button className="close-btn" onClick={() => close!()}>
          <FontAwesomeIcon icon={faTimes} color={"#FFF"}/>
        </button>
        <div className="title">
          {
            whatIs === 'followers'
            ? `people who follow ${from}`
            : `${from} follows to`
          }
        </div>
        <div className="follower-lists">
          <PeopleList />
          <PeopleList />
          <PeopleList />
          <PeopleList />
          <PeopleList />
          <PeopleList />
          <PeopleList />
          <PeopleList />
          <PeopleList />
          <PeopleList />
          <PeopleList />
          <PeopleList />
          <PeopleList />
          <PeopleList />
  
        </div>
      </div>
    </div>
  )
}

export default Follow
