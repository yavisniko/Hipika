import {useEffect, useState} from 'react'
import '../less/Landing-styles/navbar.css'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const emptyProfile: string = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

const Navbar = () => {
    const [userProfile, setUserProfile] = useState<any>({
     name: "",
     surname: "",
     email: "",
     image: ""  
    })
    const [backHome, setBackHome] = useState<boolean>(false)

    let navigate = useNavigate()
    const {pathname} = useLocation()

    useEffect(() => {
        if(pathname === "/create-blog"){
            setBackHome(true)
        }else setBackHome(false)
    }, [pathname])

    const fetchUser = async () => {
        const userAuth: string = JSON.parse(localStorage.getItem('authToken')!) as string
        
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
            {
                backHome ? 
                <button className="blog-btn" onClick={() => navigate('/Dashboard')}>Dashboard</button>:
                <button className="blog-btn" onClick={() => navigate('/create-blog')}>Create Blog</button>
            }
            <div className="user-profile">
                <img src={userProfile.image !== "" ? userProfile.image : emptyProfile} alt="" />
            </div>
        </nav>
    )
}

export default Navbar       