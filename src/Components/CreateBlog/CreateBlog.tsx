import { useState, useEffect } from 'react'
import '../../less/createBlog-styles/blog-styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

interface BlogProps {
  image?: string;
  title: string;
  mainContent: string;
  file: any
}

const defaultSchema: BlogProps = {
  file: {},
  image: "",
  title: "",
  mainContent: "",
}


const CreateBlog = () => {
  const [blogContent, setBlogContent] = useState<BlogProps>(defaultSchema)
  const [allowToUpload, setAllowToUpload] = useState(false)
  
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const name: string = e.target.name
    const value: string = e.target.value
    
    setBlogContent({...blogContent, [name]: value})
  }
  
  useEffect(() => {
    const blogValues = Object.values(blogContent).slice(1)

    for(let i=0; i < blogValues.length; i++) {
      if(blogValues[i].trim() === ""){
        setAllowToUpload(false)
        break
      }else setAllowToUpload(true)
    }

  }, [blogContent])

  const imageUploadHandler = (e: any) => {
    const objectURL = URL.createObjectURL(e.target.files[0])
    setBlogContent({...blogContent, image: objectURL, file: e.target.files[0]})
  }

  const uploadBlog = async () => {
    const userAuth: string = JSON.parse(localStorage.getItem('authToken')!)
 
    if(!allowToUpload) return
    else{ 
      const formatData = new FormData()

      formatData.append('file', blogContent.file)
      await axios.post(`http://localhost:5000/blog/upload/${userAuth}`, formatData)
      .then(response => {
        console.log(response)
      }).catch(err => console.log(err))
  }
}
  return (
    <div className="createBlog-container">
      <div className="blog-edit">
      <h1 style={{color: "#FFF"}}>Create your Blog</h1>
        <div className="banner-img" style={{color: "#FFF"}}>
          <input type="file" accept="image/*" onChange={imageUploadHandler}/>
          {
            blogContent.image?.trim() === "" ? 
            <>
              <FontAwesomeIcon icon={faImages} size={"6x"} color="#fff"/>
              Upload Image
            </> : 
            <img src={blogContent.image} alt="" />
          }
        </div>
        <input type="text" value={blogContent.title} placeholder="Blog Title" onChange={inputHandler} name="title"/>
        <textarea value={blogContent.mainContent} name="mainContent" placeholder="MainContent" onChange={inputHandler}/>
      </div>
      <button className={allowToUpload ? "upload allowed" : "upload"} onClick={() => uploadBlog()}>Upload</button>
    </div>
  )
}

export default CreateBlog
