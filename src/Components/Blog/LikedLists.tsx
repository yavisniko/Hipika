import { FC, useState, useEffect, useRef } from "react";
import People from "./People";
import { PeopleProps } from "./People";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../../less/blog-styles/likes-styles.css";
import "../../less/dashboard-style/loader.css";
import { useNavigate } from "react-router-dom";

export interface MappingProps extends PeopleProps {
  _id: string;
}

const LikedContainer: FC<{ toggleMenu: () => void; likes: { _id: string }[] }> =
  ({ toggleMenu, likes }) => {
    const [isLoading, setIsLoading] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [peopleWhoLiked, setPeopleWhoLiked] = useState<MappingProps[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
      setIsLoading(true);
      let fetchURLs: string[] = [];
      const token_validate = JSON.parse(sessionStorage.getItem('qw') as string )
      const requestor = JSON.parse(localStorage.getItem('authToken')!)
      
        if(token_validate === null || requestor === null){
            navigate('/')
            return
        }

      for (let i = 0; i < likes.length; i++) {
        fetchURLs.push(
          `http://localhost:5000/dashboard/getUser/${likes[i]._id}/${requestor}/${token_validate}`
        );
      }

      axios.all(fetchURLs.map((url) => axios.get(url))).then((response) => {
        let likedPeople: MappingProps[] = []

        response.map((e) => {
          likedPeople.push({
            userId: e.data.userId,
            name: `${e.data.name} ${e.data.surname}`,
            image: e.data.image,
            followers: [],
            _id: e.data.key,
          })
        });
        setPeopleWhoLiked(likedPeople);
        setIsLoading(false);
      }).catch(err => {
        if(err.response.status === 403 && err.response.data.msg === 'invalid user'){
            localStorage.removeItem('authToken')
            sessionStorage.removeItem('qw')

            navigate('/')
        }
    })
    }, []);

    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMenu();
      }
    };


    useEffect(() => {
      document.addEventListener("click", handleClickOutside, true);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    });


    return (
      <div className="blured-bg">
        <div className="liked-people" ref={menuRef}>
          <div className="text-area">
            People who liked
            <span className="close" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
          <div className="people-section">
            {isLoading ? (
              <span className="like-loader bigger"></span>
            ) : (
              peopleWhoLiked.map((person) => {
                return (
                  <People
                    userId={person.userId}
                    name={person.name}
                    image={person.image}
                    followers={person.followers}
                    key={person.userId}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  };

export default LikedContainer;
