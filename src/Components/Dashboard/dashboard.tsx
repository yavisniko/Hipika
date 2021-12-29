import { useState, useEffect } from "react";
import Card from "./Card";
import "../../less/dashboard-style/loader.css";
import "../../less/dashboard-style/dashbaord.css";
import axios from "axios";

const Dashboard = () => {
  const [blogs, setBlogs] = useState<any>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);

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
              blogId: e.blog._id,
            },
          };
        })
      );
      setIsloading(false);
    });
  };

  useEffect(() => {
    fetchBlogs();
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
              author={blog.blog.author}
              liked={blog.blog.liked}
              mainContent={blog.blog.mainContent}
              key={blog.blog.blogId}
              authorID={blog.userId}
            />
          );
        }):
        <h1 style={{color: "#FFF", width: "100%", textAlign: "center"}}>There is not any blogs uploaded yet, upload it and be first 🎉</h1>
      }

    </div>
  );
};

export default Dashboard;
