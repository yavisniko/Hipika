import axios from 'axios'
import { FC } from 'react'
import '../../../less/Login-styles/loading.css'
import { token as newToken} from "../../../utils/token"

const SecurityDashboard:FC<{moveToPass: () => void}> = ({
  moveToPass
}) => {
  const token: string = JSON.parse(localStorage.getItem('authToken')!)

  return (
      <>
      <div className="security-main">
        <p>If you want to change you password here you go</p>
        <button className="password-btn" onClick={moveToPass}>Change Password</button>
      </div>
      <div className='token-wrapper'>
        <div className="blurer">
          Hover over to show your token
        </div>
        {token}
      </div>
      </>
  )
}

export default SecurityDashboard
