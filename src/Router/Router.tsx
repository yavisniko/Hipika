import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from '../Components/Landing/Landing'
import SignMain from '../Components/Sign-up/SignMain'
import Login from '../Components/Log-in/Log-in'
import Navbar from "../Components/Navbar";
import CreateBlog from "../Components/CreateBlog/CreateBlog"
import Dashboard from "../Components/Dashboard/dashboard";

const Router = () => {
    const userAuth: string | null = localStorage.getItem('authToken')

    return (
        <BrowserRouter>
        {userAuth !== null ? <Navbar />: null}
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/sign-up" element={<SignMain />} />
                <Route path="/log-in" element={<Login />}/>
                <Route path="/create-blog" element={<CreateBlog />} />
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
