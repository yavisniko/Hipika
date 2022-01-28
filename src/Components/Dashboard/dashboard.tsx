import { useState, useEffect, FC, useRef, useCallback } from "react"
import Card from "./Card"
import axios from "axios"
import "../../less/dashboard-style/loader.css"
import "../../less/dashboard-style/dashbaord.css"

const Dashboard: FC<{ setOpen: () => void }> = ({ setOpen }) => {
  const [blogs, setBlogs] = useState<any>([])
  const [isLoading, setIsloading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [cancelFetch, setCancelFetch] = useState<boolean>(false)
  const loader = useRef<any>(null)
  const tokenAuth: string = JSON.parse(localStorage.getItem('authToken')!)

  const remoeOrAddLike = (blogId: string): void => {
    let currBlog: number = blogs.findIndex((e: any) => e.blog.blogId === blogId)
    let newBlogs = blogs
    const userExist: boolean = newBlogs[currBlog].blog.liked.some(
      (e: any) => e._id === tokenAuth
    )

    if (userExist) {
      newBlogs[currBlog].blog.liked.filter((e: any) => e._id !== tokenAuth)
      setBlogs(newBlogs)
    } else {
      newBlogs[currBlog].blog.liked.push({ _id: tokenAuth })
      setBlogs(newBlogs)
    }
  }


  const handleObserver = useCallback(
    (entries) => {
        const target = entries[0]
        if(target.isIntersecting){
          setPage((prev) => prev + 1) 
        }
    },
    [setPage]
  )

  useEffect(() => {
    document.title = "Hipika - Dashboard"
  }, [])

  useEffect(() => {
    if(cancelFetch) return

    const option = {
      root: null,
      rootMargin: "10px",
      threshold: 0,
  }

  const observer = new IntersectionObserver(handleObserver, option)
  if(loader.current) observer.observe(loader.current)

  }, [handleObserver])

  useEffect(() => {
    if(cancelFetch) return
    let unmouted = false

    setIsloading(true)

    let fetchedBlogs: any;

    axios
      .get(`http://localhost:5000/dashboard/blogs/page/${page}`)
      .then((result) => {
        if(result.data.msg === 'no more'){
          setCancelFetch(true)
        }
        
        if(!unmouted){
          fetchedBlogs = result.data.result.map((e: any) => {
            return {
              userId: e.userID,
              blog: {
                title: e.blog.title,
                mainContent: e.blog.mainContent,
                liked: e.blog.likes,
                img: e.blog.file,
                blogId: e._id,
              }
            }
          })
          setBlogs((prev: any) => [...fetchedBlogs, ...prev])
        }
      }) 
      .catch((err) => {
        console.log(err)
      })
      
    setIsloading(false)
    setOpen()

      return () => {
        unmouted = true
      }
  }, [page])

  return (
    <>
    <div className="dashboard-container">
      {blogs.length > 0
        ? blogs.reverse().map((blog: any) => {
            return (
              <Card
                title={blog.blog.title}
                img={blog.blog.img}
                liked={blog.blog.liked}
                mainContent={blog.blog.mainContent}
                key={blog.blog.blogId}
                authorID={blog.userId}
                blogId={blog.blog.blogId}
                likeSystem={remoeOrAddLike}
              />
            )
          })
        : blogs.length === 0 &&
          !isLoading && (
            <h1 style={{ color: "#FFF", width: "100%", textAlign: "center" }}>
              There is not any blogs uploaded yet, upload it and be first 🎉
            </h1>
          )}
        <div className="triger" ref={loader} style={{position: 'absolute', bottom: 0, height: '20px', width: '100%'}}/>
    </div>
    </>
  )
}

export default Dashboard
