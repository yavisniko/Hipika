import {useEffect, useState, FC, useRef} from 'react'
import '../less/Landing-styles/navbar.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faCog } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const emptyProfile: string = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

const AvatarMenu: FC<{
    setOpen: () => void,
}> = ({
    setOpen,
}) => {
    const menuRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const userAuth: string = JSON.parse(localStorage.getItem('authToken')!)
 
    const handleClickOutSide = (e: any) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setOpen()
        }
    }

    
    useEffect(() => {
        document.addEventListener('click', handleClickOutSide, true)

        return () => {
            document.removeEventListener('click', handleClickOutSide)
        }
    })
    
    return (
        <div className='avatar-menu' ref={menuRef} >
            <button onClick={() => {
                navigate(`/user/${userAuth}`)
                setOpen()
            }}>
                <FontAwesomeIcon icon={faUserCircle}/>
                Profile
            </button>
            <button onClick={() => {
                navigate('/settings')
                setOpen()
            }}>
                <FontAwesomeIcon icon={faCog}/>
                Setting
            </button>
        </div>
    )
}

const Navbar: FC<{
    setClose: () => void,
    setOpen: () => void,
}> = ({setClose, setOpen}) => {
    const [userProfile, setUserProfile] = useState<any>({
        name: "",
        surname: "",
        email: "",
        image: ""  
    })
    const {pathname} = useLocation()
    const [backHome, setBackHome] = useState<boolean>(false)
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    
    let navigate = useNavigate()
    const userAuth: string = JSON.parse(localStorage.getItem('authToken')!)
    
    useEffect(() => {
        if(pathname === '/sign-up' || pathname === '/' || pathname === '/log-in'){
            setClose()
        }else {
            setOpen()
        }
    }, [pathname])

    useEffect(() => {
        if(pathname === "/create-blog"){
            setBackHome(true)
        }else setBackHome(false)
    }, [pathname])

    const fetchUser = async () => {
        
        await axios.get(`http://localhost:5000/dashboard/getUser/${userAuth}`)
        .then(result => {
            setUserProfile(result.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        fetchUser()
    }, []) 
    
    return (
        <nav>
            <div>
            <button className="blog-btn" onClick={() => navigate('/Dashboard')}>Home</button>
            {
                !backHome ? 
                <button className="blog-btn" onClick={() => navigate('/create-blog')}>Create Blog</button>:
                null
            }
            </div>
            <div className="user-profile" onClick={() => setOpenMenu(true)}>
                <img src={userProfile.image !== "" ? `/uploads/avatar/${userProfile.image}` : emptyProfile} alt="" />
            </div>
                {
                    openMenu 
                    ? <AvatarMenu setOpen={() => setOpenMenu(false)}/>
                    : null
                }
        </nav> 
    )
}

export default Navbar       