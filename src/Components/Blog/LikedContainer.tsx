import { FC, useState, useEffect, useRef } from 'react'
import People from './People'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import '../../less/blog-styles/likes-styles.css'

const LikedContainer: FC<{toggleMenu: () => void, likes: {_id: string}[]}> = ({
  toggleMenu,
  likes
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [peopleWhoLiked, setPeopleWhoLiked] = useState([])


  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMenu()
    }
};

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  })

  return (
    <div className="blured-bg">
        <div className="liked-people" ref={menuRef}>
            <div className="text-area">
              People who liked
              <span className="close" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faTimes}/>
              </span>
            </div>
            <div className="people-section">
            <People />
            <People />
            <People />
            <People />
            <People />
            <People />
            <People />
            <People />
            <People />
            <People />
            <People />
            <People />
            </div>
        </div>
    </div>
  )
}

export default LikedContainer
