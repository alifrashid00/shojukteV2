import './App.css';
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Home from "./pages/home/Home.jsx";
import { Routes, Route } from "react-router-dom";
import {useAuthContext} from "./context/AuthContext.jsx";
import {Toaster} from "react-hot-toast";
import {Navigate} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Routine from "./pages/Routine/Routine.jsx";
import {Fa0} from "react-icons/fa6";
import FileSharing from "./pages/Filesharing/FileSharing.jsx";




function App() {
    const { authUser } = useAuthContext();
    return (
        <div className='p-4 h-screen flex items-center justify-center'>
            <Routes>
                <Route path='/' element={authUser ? <Dashboard/> : <Navigate to={"/login"} />} />
                <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
                <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup />} />
                <Route path='/filesharing' element={authUser ? <FileSharing/> : <Navigate to={"/login"} />} />
                <Route path='/message' element={authUser ? <Home/> : <Navigate to={"/login"} />} />
                <Route path='/routine' element={authUser ? <Routine/> : <Navigate to={"/login"} />} />

            </Routes>
            <Toaster/>
        </div>
    );
}

export default App;
