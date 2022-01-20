import { useState } from 'react'
import { CatalogType } from '../interface'
import SetChanges from './SetChanges'
import Catalog from '../Catalog'
import '../../../less/settings-style/settings.css'
import Security from '../Security/Security'

const UserSettings = () => {
  const [selectedCatalog, setSelectedCatalog] = useState<CatalogType>('user')

  const chooseCatalog = (catalog: CatalogType): void => {
    setSelectedCatalog(catalog)  
  }

  return (
    <div className='root-settings'>
      <Catalog changeCatalog={chooseCatalog}/>
      {
        selectedCatalog === 'user'
        ? <SetChanges /> :
        selectedCatalog === 'privacy'
        ? <Security />
        : null
      }
    </div>
  )
}

export default UserSettings
