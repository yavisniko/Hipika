import { useState, useEffect, memo } from "react";
import { tokenAuth } from "./Card";
import Card from "./Card";
import axios from "axios";
import "../../less/dashboard-style/loader.css";
import "../../less/dashboard-style/dashbaord.css";


const Dashboard = () => {
  const [blogs, setBlogs] = useState<any>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  const fetchBlogs = async () => {
    setIsloading(true);

    await axios.get("http://localhost:5000/dashboard/blogs").then((result) => {
      setBlogs(
        result.data.map((e: any) => {
          return {
            userId: e.userID,
            blog: {
              title: e.blog.title,
              mainContent: e.blog.mainContent,
              liked: e.blog.likes,
              img: e.blog.file,
              blogId: e._id,
            },
          };
        })
      );
    }).catch(err => {
      console.log(err)})
      
      setIsloading(false);
      return () => source.cancel("axios request cancelled");
       
  };

  const remoeOrAddLike = (blogId: string): void => {
      let currBlog: number = blogs.findIndex((e: any) => e.blog.blogId === blogId)
      let newBlogs = blogs
      const userExist: boolean = newBlogs[currBlog].blog.liked.some((e: any) => e._id === tokenAuth)
      

      if(userExist){
        newBlogs[currBlog].blog.liked.filter((e: any) => e._id !== tokenAuth)
        setBlogs(newBlogs)
      }else {
        newBlogs[currBlog].blog.liked.push({_id: tokenAuth})
        setBlogs(newBlogs)
      }
    }


   useEffect(() => {
    fetchBlogs();
    return () => source.cancel("axios request cancelled");
  }, []);

  return (
    <div className="dashboard-container">
      {isLoading ? (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      ) :
      blogs.length>0 ? 
        blogs.reverse().map((blog: any) => {
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
          );
        }):
        <h1 style={{color: "#FFF", width: "100%", textAlign: "center"}}>There is not any blogs uploaded yet, upload it and be first 🎉</h1>
      }

    </div>
  );
};

export default Dashboard;
