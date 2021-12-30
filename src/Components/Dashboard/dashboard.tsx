import { useState, useEffect, memo } from "react";
import { tokenAuth } from "./Card";
import Card from "./Card";
import axios from "axios";
import "../../less/dashboard-style/loader.css";
import "../../less/dashboard-style/dashbaord.css";

interface memoProps {
  timer: number
}

const Dashboard = () => {
  const [blogs, setBlogs] = useState<any>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [countDown, setCountDown] = useState(0)
  
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  console.log(countDown)

  useEffect(() => {
    const timer = window.setInterval(() => {
      if(countDown > 0) setCountDown(countDown - 1) 
    }, 1000)

    return () => window.clearInterval(timer)
  })


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

  const remoeOrAddLike = (authorID: string, blogId: string): void => {
      for(let i =0; i < blogs.length;i++){
        // if(blogs[i].userId === blogId){
        //   if(blogs[i].blog.liked.includes(authorID)){
        //     blogs[i].blog.liked = blogs[i].blog.liked.filter((e: any) => e.blogId === authorID) 
        //   }else {
        //     blogs[i].blog.liked.push(authorID);
        //   }         
        // }
      if(blogs[i].blog.blogId === authorID) {
        if(blogs[i].blog.liked.includes(tokenAuth)){
          console.log(blogs[i])
        }
      }
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
              cancelLike={() => setCountDown(2)} 
            />
          );
        }):
        <h1 style={{color: "#FFF", width: "100%", textAlign: "center"}}>There is not any blogs uploaded yet, upload it and be first 🎉</h1>
      }

    </div>
  );
};

export default Dashboard;
