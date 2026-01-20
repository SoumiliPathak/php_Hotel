import "./Show_Bookings.css";
import { useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
function Show_Bookings()
{
    let token=localStorage.getItem("token");
    const navigate=useNavigate();
    let [data,setData]=useState([]);
    useEffect(()=>{
        if(!token)
            navigate("/login");
        else
          fetch();
    },[]);
    async function fetch()
    {
        try
       {
        let res=await axios.get(`${process.env.REACT_APP_backend_URL}/api/show-current-bookings`,{headers:{Authorization:`Bearer ${token}`}});
       setData(res.data.data);
        }
    catch(error)
    {
      alert(error.response.data.message);
    }
    }
    async function cancel(id)
    { 
        try{
          let res=await axios.delete(`${process.env.REACT_APP_backend_URL}/api/cancel-booking/${id}`,{headers:{Authorization:`Bearer ${token}`}});
          alert(res.data.message);
          }
        catch(error)
        {
          alert(error.response.data.message);
        }
    }
     return(
         <>
       {data.length>0 
         ?(<div id="booking-body">{data.map((item)=>{
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
         <button id="cancel-booking" onClick={()=>cancel(item.id)}>Cancel Booking</button>
            </div>
            </div>
        })}</div>)
         :<h1>No Current Bookings</h1>}
        </>
    )
}
export default Show_Bookings;