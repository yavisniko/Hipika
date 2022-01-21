import { useEffect, useState, FC } from "react"
import Card from "../Dashboard/Card"
import axios from "axios"
import "../../less/profile-styles/user-blogs-styles.css"
import "../../less/dashboard-style/loader.css"

const UserBlogs: FC<{ id: string; name: string }> = ({ name, id }) => {
  const [userBlogs, setUserBlogs] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    //! unmounted component error, I tried everything
    let unmouted = true
    setIsLoading(true)

    axios
      .get(`http://localhost:5000/blog/blog-user/${id}`)
      .then((response) => {
        if (!unmouted) {
          setUserBlogs(
            response.data.map((blog: any) => {
              return {
                title: blog.blog.title,
                img: blog.blog.file,
                liked: blog.blog.likes,
                mainContent: blog.blog.mainContent,
                authorID: blog.userID,
                blogId: blog.blog._id,
              }
            })
          )
        }
        
      })
      .catch((err) => console.log(err))
      
    setIsLoading(false)
    
    return () => {
      unmouted = true
    }
  }, [id])

  return (
    <div className="user-blogs">
      <h1>{name}'s blogs</h1>
      <div className="dashboard-container">
        {
        userBlogs.length !== 0 && userBlogs.map((blog: any) => {
          return (
            <Card
              title={blog.title}
              img={blog.img}
              liked={blog.likes}
              mainContent={blog.mainContent}
              authorID={blog.userId}
              blogId={blog._id}
              key={blog._id}
              likeSystem={() => {}}
            />
          )
        })}
      </div>
    </div>
  )
}

export default UserBlogs
