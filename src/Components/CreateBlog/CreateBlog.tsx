import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../less/createBlog-styles/blog-styles.css";

const authToken: string = JSON.parse(localStorage.getItem("authToken")!);

interface BlogProps {
  image?: string;
  title: string;
  mainContent: string;
  userId: string;
  actualFile: File | null;
  file: string;
}

const defaultSchema: BlogProps = {
  image: "",
  title: "",
  mainContent: "",
  file: "",
  actualFile: null,
  userId: authToken,
};

const CreateBlog = () => {
  const [blogContent, setBlogContent] = useState<BlogProps>(defaultSchema);
  const [allowToUpload, setAllowToUpload] = useState(false);
  const navigate = useNavigate()

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    setBlogContent({ ...blogContent, [name]: value });
  };

  useEffect(() => {
    const blogValues = Object.values(blogContent).slice(1).slice(0, -2);

    for (let i = 0; i < blogValues.length; i++) {
      if (blogValues[i].trim() === "") {
        setAllowToUpload(false);
        break;
      } else setAllowToUpload(true);
    }
  }, [blogContent]);

  const imageUploadHandler = (e: ChangeEvent) => {
    const objectURL = URL.createObjectURL(
      (e.target as HTMLInputElement).files![0]
    );
    setBlogContent({
      ...blogContent,
      image: objectURL,
      file: (e.target as HTMLInputElement).files![0].name,
      actualFile: (e.target as HTMLInputElement).files![0],
    });
  };

  const uploadBlog = (e: FormEvent) => {
    e.preventDefault()

    if (!allowToUpload) return;
    else {
      const formatData = new FormData();
      formatData.append("file", blogContent.actualFile!);

      const id: string = String(new Date().getTime());

      axios
        .post(
          `http://localhost:5000/blog/upload/image/${id}/${authToken}`,
          formatData
        )
        .then((response) => console.log(response))
        .catch((err) => console.log(err));

      axios
        .post(`http://localhost:5000/blog/upload/user/${id}`, blogContent)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));       
      }
      navigate('/Dashboard')
  };
  return (
    <form className="createBlog-container" onSubmit={uploadBlog}>
      <div className="blog-edit">
        <h1 style={{ color: "#FFF" }}>Create your Post</h1>
        <div className="banner-img" style={{ color: "#FFF" }}>
          <input type="file" accept="image/*" onChange={imageUploadHandler} />
          {blogContent.image?.trim() === "" ? (
            <>
              <FontAwesomeIcon icon={faImages} size={"6x"} color="#fff" />
              Upload Image
            </>
          ) : (
            <img src={blogContent.image} alt="" />
          )}
        </div>
        <input
          type="text"
          value={blogContent.title}
          placeholder="Post Title"
          onChange={inputHandler}
          name="title"
        />
        <textarea
          value={blogContent.mainContent}
          name="mainContent"
          placeholder="Tell us something cool about this post"
          onChange={inputHandler}
        />
      </div>
      <button
        className={allowToUpload ? "upload allowed" : "upload"}
        type="submit"
      >
        Upload
      </button>
    </form>
  );
};

export default CreateBlog;
