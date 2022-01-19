import axios from 'axios'
import { FC } from 'react'
import '../../../less/Login-styles/loading.css'
import { token as newToken} from "../../../utils/token"

const SecurityDashboard:FC<{moveToPass: () => void}> = ({
  moveToPass
}) => {
  const token: string = JSON.parse(localStorage.getItem('authToken')!)

  const generateNewToken = () => {
    const new_token: string = newToken()

    axios.put(`http://localhost:5000/settings/change-token/${token}/${new_token}`)
    .then(result => {
      if(result.data.msg === 'token changed successfully'){
        localStorage.setItem('authToken', JSON.stringify(new_token))
      }
    })
    .catch(err => console.log('err occured', err))
  }

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
      <div className="security-main">
        <p>If your token got leaked, there is 100% chance to get hacked! change it immediantely</p>
        <button className="password-btn" onClick={() => generateNewToken()}>Regenrate Token</button>
      </div>
      </>
  )
}

export default SecurityDashboard
