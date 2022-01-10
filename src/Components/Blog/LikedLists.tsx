import { FC, useState, useEffect, useRef } from "react";
import People from "./People";
import { PeopleProps } from "./People";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../../less/blog-styles/likes-styles.css";
import "../../less/dashboard-style/loader.css";

export interface MappingProps extends PeopleProps {
  _id: string;
}

const LikedContainer: FC<{ toggleMenu: () => void; likes: { _id: string }[] }> =
  ({ toggleMenu, likes }) => {
    const [isLoading, setIsLoading] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [peopleWhoLiked, setPeopleWhoLiked] = useState<MappingProps[]>([]);

    useEffect(() => {
      setIsLoading(true);
      let fetchURLs: string[] = [];

      for (let i = 0; i < likes.length; i++) {
        fetchURLs.push(
          `http://localhost:5000/dashboard/getUser/${likes[i]._id}`
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
      });
    }, []);

    console.log()

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
                    key={person._id}
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
