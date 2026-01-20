import "./Admin_Panel.css";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import {useState,useEffect}from "react";
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import {CgProfile} from "react-icons/cg";
import { admin_timer } from "./Login";
function Admin_Panel()
{
    let token=localStorage.getItem("admin");
    let [bookingsData,setBookingsData]=useState([]);
    let[userData,setUserData]=useState([]);
    let navigate=useNavigate();
    let {admin_logout}=useContext(AuthContext);
    useEffect(()=>{
      bookings();
      user();
    },[]);
    async function bookings()
    {
        try{
          let res=await axios.get(`${process.env.REACT_APP_backend_URL}/api/show-bookings`,{headers:{Authorization:`Bearer ${token}`}});
          setBookingsData(res.data.data);
         }
        catch(error)
        {
          alert(error.response.data.message);
        }
    }
    async function user()
    {
        try{
          let res=await axios.get(`${process.env.REACT_APP_backend_URL}/api/show-users`,{headers:{Authorization:`Bearer ${token}`}});
            setUserData(res.data.data);
         }
        catch(error)
        {
          alert(error.response.data.message);
        }
    }
    async function logout()
    {
      try{
        let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/admin-logout`,{},{headers:{Authorization:`Bearer ${token}`}});
        localStorage.removeItem("admin");
        clearTimeout(admin_timer);
        alert(res.data.message);
         navigate("/");  
       }
      catch(error)
      {
        alert(error.response.data.message);
      }
    }
    return(
      <main id="admin-body">
       <div id="sidebar">
        <Link to="/add-room" className="links">Add Rooms</Link>
        <Link to="/manage-rooms" className="links">Manage Rooms</Link>
        <p onClick={logout}>Log out</p>
       </div>
       <div>
        {bookingsData.length>0?
        (<><h1>Current Bookings</h1>
        <table>
        <tr><th>Booking Id</th><th>Boarder Name</th><th>Total Number Of Boarders</th><th>Check In Date</th><th>Check Out Date</th><th>Room Type</th><th>Room Image</th><th>Total amount</th><th>Booked by</th><th>Booked on</th></tr>
        {bookingsData.map((item)=>{
                  let dateObj=new Date(item.created_at);
                  let date=dateObj.toLocaleDateString();
          return <tr><td>{item.id}</td><td>{item.name}</td><td>{item.no_of_boarders}</td><td>{item.check_in_date}</td><td>{item.check_out_date}</td><td>{item.room.room_name}</td><td>{<img src={`${process.env.REACT_APP_backend_URL}/storage/${item.room.images[0].image}`} className="user-img-admin-panel"/>}</td><td>Rs/- {item.amount}</td><td>{item.user.name}</td><td>{date}</td></tr>
        })}
        </table></>):<h1>No Current Bookings</h1>}
        {userData.length>0?
        (<><h1>Users</h1>
        <table id="users-table">
        <tr><th>Image</th><th>Name</th><th>Age</th><th>Gender</th><th>Email</th><th>Phone No</th></tr>
        {userData.map((item)=>{
           let date=new Date();
           let birthdate=new Date(item.dob);
           let age=date.getFullYear()-birthdate.getFullYear(); 
           if(date.getMonth()<birthdate.getMonth()||(date.getMonth()==birthdate.getMonth() && date.getDate()<birthdate.getDate()))
               age--;
          return <tr><td>{item.image?<img src={`${process.env.REACT_APP_backend_URL}/storage/${item.image}`} className="user-img-admin-panel"/>:<CgProfile size={100}/>}</td><td className="users-columns">{item.name}</td><td className="users-columns">{age}</td><td className="users-columns">{item.sex!=null?(item.sex=='M'?"Male":(item.sex=='F'?"Female":"Other")):"---"}</td><td className="users-columns">{item.email}</td><td className="users-columns">{item.phone_no}</td></tr>
        })}
        </table></>):<h1>No Registered Users</h1>}
       </div>
      </main>
    )
}
export default Admin_Panel;