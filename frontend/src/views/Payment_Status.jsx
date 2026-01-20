import {useLocation,useNavigate} from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
function Payment_Status()
{
    let token=localStorage.getItem("token");
    let {search}=useLocation();
    let params=new URLSearchParams(search);
    let transaction_id=params.get("transaction_id");
    let booking_id=params.get("booking_id");
    let navigate=useNavigate();
    useEffect(()=>{
        if(transaction_id && booking_id)
         check();
     },[transaction_id,booking_id]);
    async function check()
    {
        try{
            let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/book/${transaction_id}/${booking_id}`,{},{headers:{Authorization:`Bearer ${token}`}});
            alert(res.data.message);
            if(res.data.success) 
               navigate("/bookings");
             else
               navigate("/rooms");
        }
        catch(error)
        {
            alert(error.response.data.message);
        }
    }
    return(
     <h1>Booking...</h1>
      )
}
export default Payment_Status;
