import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog, faLock, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { CatalogType } from "./interface"
 
const Catalog:FC<{changeCatalog: (curr: CatalogType) => void}>= ({changeCatalog}) => {
  return (
    <div className='catalog'>
      <button className='catalog-btn' onClick={() => changeCatalog('user')}>
        <FontAwesomeIcon icon={faUserCog}/>
        Profile
      </button>
      <button className='catalog-btn' onClick={() => changeCatalog('privacy')}>
      <FontAwesomeIcon icon={faLock}/>
        Security
      </button>
      <button className='logout-btn catalog-btn'>
      <FontAwesomeIcon icon={faSignOutAlt}/>
        Log out
      </button>
    </div>
  )
}

export default Catalog
