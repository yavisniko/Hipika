import { FC, ChangeEvent } from "react"
import { defaultStateV2 } from "./EditBlog"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

interface ChangeBlogProps {
  editBlogs: defaultStateV2
  inputHandler: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  showSave: boolean
  blobURL: string
  fileHandler: (e: ChangeEvent<HTMLInputElement>) => void
  file: File | null
}

const ChangeBlog: FC<ChangeBlogProps> = ({
  editBlogs,
  inputHandler,
  showSave,
  fileHandler,
  blobURL,
  file
}) => {
  let navigate = useNavigate()
  const { id } = useParams()
  const user_id = JSON.parse(localStorage.getItem("authToken") as string)


  const submitChanges = async () => {
    if(showSave) return

    const DataFile: FormData = new FormData()
    DataFile.append('file', file!)

    if(file !== null){
      alert('changes will be visible in a while')
      
      await axios
      .post(
        `http://localhost:5000/blog/upload/image/${editBlogs.img.split('-')[0]}/${user_id}`,
        DataFile
        )
        .then((response) => {
          if(response){
            navigate(`/blog/${id}`)
          }
        })
        .catch((err) => console.log(err));
        
        await axios
        .put(`http://localhost:5000/blog/edit/submitChanges/${id}/${user_id}`, editBlogs)
        .then(response => {
          console.log(response.data);
        })
        .catch(err => console.log(err))
      }else {
        await axios
        .put(`http://localhost:5000/blog/edit/submitChanges/${id}/${user_id}`, editBlogs)
        .then(response => {
          if(response){
            navigate(`/blog/${id}`)
          }
        })
      .catch(err => console.log(err))
    }

  }

  return (
    <>
      <div className="edit-blog-container">
        <div className="img-banner">
          <input type="file" accept="image/*" onChange={fileHandler} />
          <img src={blobURL === '' ? `/uploads/${editBlogs.img}` : blobURL} alt="" />
        </div>
        <div className="change-wrappers">
          <input
            type="text"
            value={editBlogs.title}
            className="title"
            spellCheck="false"
            name="title"
            onChange={inputHandler}
          />
          <textarea
            name="main_content"
            className="change-main_content"
            spellCheck="false"
            value={editBlogs.main_content}
            onChange={inputHandler}
          ></textarea>
          <div className="edit-btn-wrapper">
            <div>
              <button className="btn cancel" onClick={() => navigate(`/blog/${id}`)}>
                Cancel
              </button>
              <button className="btn delete">Delete</button>
            </div>
            <div>
              {!showSave ? <button className="btn save" onClick={() => submitChanges()}>Save Changes</button> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangeBlog
