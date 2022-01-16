import { FC, ChangeEvent } from 'react'
import { UserProps } from './interface'

interface FormProps {
  showSave: boolean,
  updateUser: UserProps,
  inputHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

const UserForm:FC<FormProps> = ({ showSave, updateUser, inputHandler }) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault()

      if(!showSave) return
    }}>
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
