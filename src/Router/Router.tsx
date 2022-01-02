import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from '../Components/Landing/Landing'
import SignMain from '../Components/Sign-up/SignMain'
import Login from '../Components/Log-in/Log-in'
import Navbar from "../Components/Navbar";
import CreateBlog from "../Components/CreateBlog/CreateBlog"
import Dashboard from "../Components/Dashboard/dashboard";
import Blog from "../Components/Blog/Blog";
import Profile from '../Components/Profile/Profile'

const Router = () => {
    const userAuth: string | null = localStorage.getItem('authToken')
    const [showNavbar, setShowNavbar] = useState(false)

    useEffect(() => {
        if(userAuth !== null){
            setShowNavbar(true)
        }
    }, [])

    return (
        <BrowserRouter>
        {showNavbar ? <Navbar />: null}
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/sign-up" element={<SignMain showNavbar={() => setShowNavbar(true)}/>} />
                <Route path="/log-in" element={<Login showNavbar={() => setShowNavbar(true)}/>}/>
                <Route path="/create-blog" element={<CreateBlog />} />
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/blog/:id" element={<Blog />}/>
                <Route path="/user/:id"element={<Profile />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
