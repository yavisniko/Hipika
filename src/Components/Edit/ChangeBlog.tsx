import { FC, ChangeEvent } from 'react';
import { defaultStateV2 } from './EditBlog'

interface ChangeBlogProps {
  editBlogs: defaultStateV2,
  inputHandler: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  showSave: boolean
}

const ChangeBlog:FC<ChangeBlogProps> = ({editBlogs, inputHandler, showSave}) => {
  return (
    <>
    <div className="edit-blog-container">
      <div className="img-banner">
        <input
          type="text"
          value={editBlogs.title}
          className="title"
          spellCheck="false"
          name="title"
          onChange={inputHandler}
        />
        <img src={`/uploads/${editBlogs.img}`} alt="" />
      </div>
      <textarea name="main_content" className="change-main_content" spellCheck="false" value={editBlogs.main_content} onChange={inputHandler}></textarea>
    </div>
    <div className='edit-btn-wrapper'>
      <div>
        <button className='btn cancel'>Cancel</button>
        <button className='btn delete'>Delete</button>
      </div>
      <div>
        {!showSave ? <button className='btn save'>Save Changes</button> : null}
      </div>
    </div>
    </>
  );
};

export default ChangeBlog;
