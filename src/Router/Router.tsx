import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from '../Components/Landing/Landing'
import SignMain from '../Components/Sign-up/SignMain'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />}></Route>
                <Route path="/sign-up" element={<SignMain />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
