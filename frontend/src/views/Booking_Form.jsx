import "./Booking_Form.css";
import { useState,useEffect } from "react";
import axios from "axios";
import {Link,useLocation} from "react-router-dom";
function Booking_Form()
{
  let location=useLocation();
  let  {id,room_name,amount,chk_in_date,chk_out_date,no_of_boarders}=location.state;
  let [email,setEmail]=useState();
  let [name,setName]=useState();
  let [pno,setpno]=useState();
  let [dob,setDob]=useState();
  let [sex,setSex]=useState();
  let [nob,setNob]=useState(no_of_boarders);
  let [errors,setErrors]=useState({});
  let token=localStorage.getItem("token");
  useEffect(()=>{
    user_details();
  },[]);
  async function user_details()
  {
    try{
      let res=await axios.get(`${process.env.REACT_APP_backend_URL}/api/show-user-details`,{headers:{Authorization:`Bearer ${token}`}});
        setEmail(res.data.data.email);
        setName(res.data.data.name);
        setpno(res.data.data.phone_no);
        setDob(res.data.data.dob);
        setSex(res.data.data.sex);
       }
    catch(error)
    {
      alert(error.response.data.message);
    }
  }
  async function book(e)
  {
     e.preventDefault();
        let date=new Date();
        let birthdate=new Date(dob);
        let age=date.getFullYear()-birthdate.getFullYear();
        if(date.getMonth()<birthdate.getMonth()||(date.getMonth()==birthdate.getMonth() && date.getDate()<birthdate.getDate()))
            age--;
    let obj={name,phone_no:pno,email,date_of_birth:dob,age,sex,chk_in_date,chk_out_date,number_of_boarders:nob,room_id:id,amount};
      try{
        let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/save-temp-bookings`,obj,{headers:{Authorization:`Bearer ${token}`}});
        setErrors({});
        if(res.data.temp_booking_id)
          pay(res.data.temp_booking_id);
      }
      catch(error)
      {
         if(error.response.status===422)
            setErrors(error.response.data.errors);
        else
        alert(error.response.data.message);
      }
    }
    async function pay(id)
    {
      let obj={name,phone_no:pno,email,amount};
      try{
        let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/pay/${id}`,obj,{headers:{Authorization:`Bearer ${token}`}});
        if(res.data.url)     
         window.location.href=res.data.url;
       else
          alert("Payment Failed");
      }
      catch(error)
          {
            alert(error.response.data.message);
          }
    }
    return(
      <main id="booking-body">
    <img src={`${process.env.REACT_APP_backend_URL}/storage/images/96e58bdb-91fc-41a3-9d72-cc63adb2ee38.jpg`} id="booking-form-bg-image"/>
      <form id="booking-form" onSubmit={book}>
      <div>
      {errors.name && <p style={{color:"red"}}>{errors.name[0]}</p>}
      <label>Name:</label>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div>
      {errors.phone_no && <p style={{color:"red"}}>{errors.phone_no[0]}</p>}
      <label>Phone No:</label>
      <input type="text" value={pno} onChange={(e)=>setpno(e.target.value)}/>
      </div>
      <div>
      {errors.email && <p style={{color:"red"}}>{errors.email[0]}</p>}
      <label>Email:</label>
      <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div>
      {errors.date_of_birth ? <p style={{color:"red"}}>{errors.date_of_birth[0]}</p>
       :errors.age ? <p style={{color:"red"}}>You must be 18 or older</p>:null}
      <label>Date Of Birth:</label>
      <input type="date" value={dob} onChange={(e)=>setDob(e.target.value)}/>
      </div>
      <div>
      <input type="radio" value="M" checked={sex=="M"} onClick={(e)=>setSex(e.target.value)}/>Male
      <input type="radio" value="F" checked={sex=="F"} onClick={(e)=>setSex(e.target.value)}/>Female
      <input type="radio" value="O" checked={sex=="O"} onClick={(e)=>setSex(e.target.value)}/>Other
      </div>
      <div>
      <label>Check In Date:</label> 
      <input type="date" value={chk_in_date}/>
      </div>
      <div>
      <label>Check Out Date:</label> 
      <input type="date" value={chk_out_date}/>
      </div>
      <div>
      {errors.number_of_boarders && <p style={{color:"red"}}>{errors.number_of_boarders[0]}</p>}
      <label>Number of Boarders:</label>
      {no_of_boarders!=""?<input type="number" value={nob}/>
      :<input type="number" value={nob} onChange={(e)=>setNob(e.target.value)}/>}
      </div>
      <div>
      <label>Room Type:</label>
      <input type="text" value={room_name}/>
      </div>
      <div>
      <label>Total Amount:</label>
      <input type="number" value={amount}/>
      </div>
      <div>
     <button className="booking-page-btn"type="submit">Submit</button>
    <Link to={`/room-details/${id}`}> <button className="booking-page-btn">Back</button></Link>
      </div>
      </form>
      </main>
    )
}
export default Booking_Form;