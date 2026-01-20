import './Header.css';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext} from './AuthContext';
import {CgProfile} from "react-icons/cg";
function Header()
{
   let token=localStorage.getItem("token");
   let adminToken=localStorage.getItem("admin");
   let {img}=useContext(AuthContext);
   return(
        <div id="header">
        <img id="logo"src={`${process.env.REACT_APP_backend_URL}/storage/images/Hotel_Logo.ico`} alt="logo"/>
       <div id="navbar" >
        <Link to="/" className="links">Home</Link>
       <Link to="/rooms" className="links">Rooms</Link>
        <Link to="/bookings" className="links">Booking</Link>
        <Link to="/about-us" className="links">About Us</Link>
        <Link to="/facilities" className="links">Facilities</Link>
        <Link to="/review" className="links">Review</Link>
        <Link to="/contact-us" className="links">Contact Us</Link>
        </div>
        {token?
            (img?(<Link to="/user-details"><span id="profile-icon"><img src={`${process.env.REACT_APP_backend_URL}/storage/${img}`} id="profile-pic"/></span></Link>)
       :(<Link to="/user-details"><span id="profile-icon"><CgProfile size={40}/></span></Link>)):adminToken?null
        :<Link to="/login" className="links"><span id="login-btn">Login</span></Link>}
        </div>
       )
}
export default Header;