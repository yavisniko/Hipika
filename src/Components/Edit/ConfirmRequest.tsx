import { FC, useRef, useEffect } from 'react';
import '../../less/edit-styles/confirm-styles.css'

interface ConfirmProps {
  blog_name: string,
  closeAlert: () => void,
  deleteBlog: () => void
}



const ConfirmRequest: FC<ConfirmProps> = ({blog_name, closeAlert, deleteBlog}) => {
  const boxRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: any) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
        closeAlert()
    }
};

useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    };
}, []);


  return (
  <div className='confirm-container'>
    <div className="confirm-box" ref={boxRef}>
      <div className="alert">
        <p>Are you sure you want to delete <span id="blog-name">{blog_name}</span>, If you click <span id="delete">delete</span> you can't back it</p>
      </div>
      <div className="buttons-wrapper">
        <button onClick={closeAlert}>Cancel</button>
        <button onClick={deleteBlog}>Delete</button>
      </div>
    </div>
  </div>
  )
};

export default ConfirmRequest;
