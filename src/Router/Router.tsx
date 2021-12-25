import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from '../Components/Landing/Landing'
import SignMain from '../Components/Sign-up/SignMain'
import Login from '../Components/Log-in/Log-in'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/sign-up" element={<SignMain />} />
                <Route path="/log-in" element={<Login />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
