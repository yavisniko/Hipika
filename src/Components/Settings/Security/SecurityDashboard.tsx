import { FC } from 'react'
import PasswordInSecurity from './PasswordinSecurity'
import TokenInSecurity from './TokenInSecurity'
import { dashboardType } from './Security'

const SecurityDashboard: FC<{dashboard: dashboardType}> = ({dashboard}) => {
  return (
      dashboard === 'main'
      ? <div className='security-main'></div>
      : null
  )
}

export default SecurityDashboard
