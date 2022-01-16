import { useState } from 'react'
import SecurityDashboard from './SecurityDashboard'
import '../../../less/settings-style/security-styles/security.css'

export type dashboardType = 'main' | 'password' | 'token'

const Security = () => {
  const [dashboard, setDashboard] = useState<dashboardType>('main')

  return (
    <main>
      {dashboard === 'main' ? <h1>Security</h1> : null}
      {
        dashboard === 'main' && <SecurityDashboard dashboard={dashboard}/>
      }
    </main>
  )
}

export default Security
