
import Home from '../pages/Home/Home';
import Services from '../pages/Services';
import SignUp from '../pages/Signup';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Doctor from '../pages/Doctors/Doctor';
import DoctorDetail from "../pages/Doctors/DoctorDetail";
import {Routes,Route} from 'react-router-dom';
import Myaccount from '../Dashboard/user-account/Myaccount';
import Dashboard from '../Dashboard/doctor-account/Dashboard';
import ProtectedRoutes from './ProtectedRoutes';
import CheckOutSuccess from '../pages/CheckOutSuccess';
import MyBooking from '../Dashboard/user-account/MyBooking';
const Routers = () =>{
    return (
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/services" element={<Services />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/register" element={<SignUp />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/doctors" element={<Doctor />}/>
        <Route path="/doctors/:id" element={<DoctorDetail />}/>
        <Route path="/checkout-success" element={<CheckOutSuccess />}/>
        <Route path="/users/profile/me" element={<ProtectedRoutes allowedRoles={["patient"]}><Myaccount /></ProtectedRoutes>}/>
        <Route path="/doctors/profile/me" element={<ProtectedRoutes allowedRoles={["doctor"]}><Dashboard /></ProtectedRoutes>}/>
      </Routes>
    )
}
export default Routers;