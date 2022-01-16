import { useState, useEffect } from 'react'
import { tokenAuth } from '../Dashboard/Card'
import { CatalogType, defaultState, UserProps } from './interface'
import SetChanges from './SetChanges'
import Catalog from './Catalog'
import axios from "axios"
import '../../less/settings-style/settings.css'

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
        ? <SetChanges />
        : null
      }
    </div>
  )
}

export default UserSettings
