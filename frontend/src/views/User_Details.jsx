import "./User_Details.css";
import axios from "axios";
import { useEffect,useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import {CgProfile} from "react-icons/cg";
import {MdDelete} from "react-icons/md";
import {MdEdit} from "react-icons/md";
import { timer } from "./Login";
function User_Details()
{
  let navigate=useNavigate();
  let token=localStorage.getItem("token");
  let {setImg}=useContext(AuthContext);
    const [data,setData]=useState({});
    const [age,setAge]=useState();
    const [bookings,setBookings]=useState([]);
    useEffect(()=>{
      user_details();
      past_bookings();
    },[]);
    async function user_details()
    {
      try{
        let res=await axios.get(`${process.env.REACT_APP_backend_URL}/api/show-user-details`,{headers:{Authorization:`Bearer ${token}`}});
          setData(res.data.data);
          setImg(res.data.data.image);
        let date=new Date();
        let birthdate=new Date(res.data.data.dob);
        let age=date.getFullYear()-birthdate.getFullYear(); 
        setAge(age);
        if(date.getMonth()<birthdate.getMonth()||(date.getMonth()==birthdate.getMonth() && date.getDate()<birthdate.getDate()))
            setAge(age-1);
         }
      catch(error)
      {
        alert(error.response.data.message);
      }
    }
    async function logout()
    {
       try{
         let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/logout`,{},{headers:{Authorization:`Bearer ${token}`}});
         localStorage.removeItem("token");
         setImg(null);
         clearTimeout(timer);
         alert(res.data.message);
         navigate("/");
       }
       catch(error)
       {
        alert(error.response.data.message);
       }
    }
    async function past_bookings()
    {
      try{
        let res=await axios.get(`${process.env.REACT_APP_backend_URL}/api/show-past-bookings`,{headers:{Authorization:`Bearer ${token}`}});
          setBookings(res.data.data);
      }
      catch(error)
      {
        alert(error.response.data.message);
      }
    }
    async function del()
    {
      try{
        let res=await axios.delete(`${process.env.REACT_APP_backend_URL}/api/delete-user`,{headers:{Authorization:`Bearer ${token}`}});
        alert(res.data.message);
        localStorage.removeItem("token");
         setImg(null); 
         navigate("/");
      }
      catch(error)
      {
        alert(error.response.data.message);
      }
    }
 return(
      <>
      <div id="user-body">
        <div id="user-details-body">
      {data.image?
      <img src={`${process.env.REACT_APP_backend_URL}/storage/${data.image}`} id="user-image"/>
      :<CgProfile size={200}/>
       }
      <div id="user-details-div">
      <h1>{data.name}</h1>
      <h3>Age: {age}</h3>
      {data.sex!=null?(<h3>Gender: 
         {data.sex=='M'?("Male"):(data.sex=='F'?("Female"):("Other"))}</h3>):null}
      <h3>Email: {data.email}</h3>
      <h3>Phone no: {data.phone_no}</h3>
      <button id="logout" onClick={logout}>Log Out</button>
      </div>
      </div>
    <button className="user-details-btns" onClick={del}><MdDelete/> Delete Account</button>
    <button className="user-details-btns" onClick={()=>navigate("/edit-user",{state:{user_image:data.image,user_name:data.name,user_dob:data.dob,user_sex:data.sex,user_email:data.email,user_pno:data.phone_no}})}><MdEdit/> Edit Details</button>
      </div>
      {bookings.length>0?<>
        <h1 id="booking-h1">Past Bookings</h1>
      {bookings.map((item)=>{
        let dateObj=new Date(item.created_at);
        let date=dateObj.toLocaleDateString();
        return <div className="booking-div">
        <img src={`${process.env.REACT_APP_backend_URL}/storage/${item.room.images[0].image}`} className="booking-image"/>
        <div>
        <h3 className="booking-h3">Boarder Name: {item.name}</h3>
        <h3 className="booking-h3"> Total Number Of Boarders: {item.no_of_boarders}</h3>
        <h3 className="booking-h3">Check In Date: {item.check_in_date}</h3>
        <h3 className="booking-h3">Check Out Date: {item.check_out_date}</h3>
        <h3 className="booking-h3">Room Type: {item.room.room_name}</h3>
        <h3 className="booking-h3">Total amount: Rs/- {item.amount}</h3>
        <h3 className="booking-h3"> Booked on {date}</h3>
        </div>
        </div>
      })}
      </>
      :<h1 id="booking-h1">No Past Bookings</h1>}
      </>
    )
}
export  default User_Details;