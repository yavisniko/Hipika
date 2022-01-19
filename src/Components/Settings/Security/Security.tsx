import { useState } from 'react'
import SecurityDashboard from './SecurityDashboard'
import PasswordinSecurity from './PasswordinSecurity'
import '../../../less/settings-style/security-styles/security.css'


export type dashboardType = 'main' | 'password'

const Security = () => {
  const [dashboard, setDashboard] = useState<dashboardType>('main')

  return (
    <main className="main">
      {dashboard === 'main' ? <h1>Security</h1> : <h1>Password Change</h1>}
      {
          dashboard === 'main'
        ? <SecurityDashboard moveToPass={() => setDashboard('password')}/> :
          dashboard === 'password' 
        ? <PasswordinSecurity goBack={() => setDashboard('main')}/>
        : null
      }
    </main>
  )
}

export default Security    
