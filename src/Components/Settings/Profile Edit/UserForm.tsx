import { FC, ChangeEvent, FormEvent } from 'react'
import { UserProps } from '../interface'
import axios from 'axios'

interface FormProps {
  showSave: boolean,
  updateUser: UserProps,
  inputHandler: (e: ChangeEvent<HTMLInputElement>) => void | null
  file: File | null,
  changeFalse: () => void,
  changeTrue: () => void,
  loading: boolean
}


const UserForm:FC<FormProps> = ({ showSave, updateUser, inputHandler, file, changeFalse, loading, changeTrue }) => {
  const submitChanges = async (e: FormEvent) => {
    e.preventDefault()
    if(!showSave || loading) return
    
    changeTrue()

    const token = JSON.parse(localStorage.getItem('authToken')!)
    
    
    if(file !== null){
      const fileData: FormData = new FormData()
      fileData.append('file', file)

      await axios.post(`http://localhost:5000/upload/avatar/${updateUser.path.split('-')[0]}`, fileData)
      .then((result) => console.log("success"))
      .catch(err => console.log(`Some error detected`, err))

      await axios.put(`http://localhost:5000/settings/user-changes/${token}`, updateUser)
      .then(result => { 
        if(result.data.success){
          changeFalse()
        }
      })
      .catch(err => console.log(err))
    }else{
      await axios.put(`http://localhost:5000/settings/user-changes/${token}`, updateUser)
      .then(result => { 
        if(result.data.success){
          changeFalse()
        }
      })
      .catch(err => console.log(err))
    }

  }


  return (
    <form onSubmit={submitChanges}>
          <div className="email-change-warn">
            User email after create can't be changed
          </div>
          <label>Email</label>
          <input type="text" value={updateUser.email} className='forbidden-email' readOnly/>
          <label>Name</label>
          <input type="text" value={updateUser.name} name="name" onChange={inputHandler} autoComplete='off'/>
          <label>Surname</label>
          <input type="text" value={updateUser.surname} name='surname' onChange={inputHandler} autoComplete='off'/>
          <div className={showSave ? "btn-wrapper show" : "btn-wrapper"}>
            <button type='submit' className='save-btn'>Save</button>
          </div>
    </form>
  )
}

export default UserForm
