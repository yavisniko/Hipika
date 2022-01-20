import { useState, useEffect, ChangeEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ChangeBlog from "./ChangeBlog"
import { isEqual } from "../../utils/isEqual"
import axios from "axios"
import "../../less/edit-styles/edit-error.css"
import "../../less/edit-styles/edit-blog.css"
import "../../less/dashboard-style/loader.css"

enum StatusCodes {
  OK = 200,
  BadRequest = 400,
  Unauthorized,
  PaymentRequired,
  Forbidden,
  NotFound,
}

const defaultState = {
  user_id: "",
  img: "",
  title: "",
  main_content: "",
  blog_id: "",
}

export type defaultStateV2 = typeof defaultState

const warn_img =
  "https://emojipedia-us.s3.amazonaws.com/source/skype/289/warning_26a0-fe0f.png"

const EditBlog = () => {
  const [editBlog, setEditBlog] = useState(defaultState)
  const [unChanged, setUnchanged] = useState(defaultState)
  const [isLoading, setIsLoading] = useState(false)
  const [saveChanges, setSaveChanges] = useState<boolean>(false)
  const [isError, setIsError] = useState(false)
  const [blobURL, setBlobURL] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const { id } = useParams()
  const user_id = JSON.parse(localStorage.getItem("authToken") as string)
  const navigate = useNavigate()

  const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name
    const value = e.target.value

    setEditBlog({ ...editBlog, [name]: value })
  }

  const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file_id: string = new Date().getTime().toString()

    setBlobURL(URL.createObjectURL(e.target.files![0]))
    setEditBlog({...editBlog, img: `${file_id}-${e.target.files![0].name}`})

    setFile(e.target.files![0])
  }

  useEffect(() => {
    if (unChanged.user_id === "" && isLoading) return

    const isequal = isEqual<typeof defaultState>(editBlog, unChanged)

    if (!isequal) {
      setSaveChanges(false)
    } else {
      setSaveChanges(true)
    }
  }, [editBlog])

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`http://localhost:5000/blog/edit/${id}/${user_id}`)
      .then((result) => {
        if (result.status === StatusCodes.OK) {
          setEditBlog({
            user_id: result.data.userID,
            img: result.data.blog.file,
            title: result.data.blog.title,
            main_content: result.data.blog.mainContent,
            blog_id: result.data.blog._id,
          })
          setUnchanged({
            user_id: result.data.userID,
            img: result.data.blog.file,
            title: result.data.blog.title,
            main_content: result.data.blog.mainContent,
            blog_id: result.data.blog._id,
          })
          setIsLoading(false)
        }
      })
      .catch((err) => {
        if (
          err.response.status === StatusCodes.Forbidden &&
          err.response.data.msg === "invalid editor"
        ) {
          setIsError(true)
        } else setIsError(false)
      })
  }, [])

  return isError ? (
    <div className="error-container">
      <div className="warn-wrapper">
        <img src={warn_img} alt="warn_img" />
      </div>
      <h1 style={{ color: "#FFF" }}>Hmmm... maybe something is not okay</h1>
      <button className="btn err-btn" onClick={() => navigate("/dashboard")}>
        Go back
      </button>
    </div>
  ) : isLoading ? (
    <div className="loader-container">
      <span className="loader"></span>
    </div>
  ) : (
    <ChangeBlog
      inputHandler={inputHandler}
      editBlogs={editBlog}
      showSave={saveChanges}
      blobURL={blobURL}
      fileHandler={fileHandler}
      file={file}
    />
  )
}

export default EditBlog
