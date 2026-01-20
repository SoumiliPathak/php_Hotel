import './Show_Details.css';
import { useParams,useNavigate,useLocation } from 'react-router-dom';
import { useEffect,useState} from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {FaStar} from "react-icons/fa";
function Show_Details()
{
    const{id}=useParams();
    const navigate=useNavigate();
    const location=useLocation();
    const [data,setData]=useState({});
    const [chk_in_date,setChk_in_date]=useState("");
    const [chk_out_date,setChk_out_date]=useState("");
    const [flag,setFlag]=useState(null);
    const [errors,setErrors]=useState({});
    useEffect(()=>{
       show();
    },[]);
    async function show()
    {
      try{
       let res=await axios.get(`${process.env.REACT_APP_backend_URL}/api/show-room-details/${id}`);
        setData(res.data.data);
        }
      catch(error)
      {
        alert(error.response.data.message);
      }
    } 
    async function check_availability() 
    {
      let obj={check_in_date:chk_in_date,check_out_date:chk_out_date};
      try{
        let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/check-availability/${id}`,obj);
        setErrors({});
        setFlag(res.data.flag);
         }
       catch(error)
       {
        if(error.response.status===422)
          setErrors(error.response.data.errors);
       else
       alert(error.response.data.message);
       }
    } 
    function book() 
    {
      let token=localStorage.getItem("token");
      if(!token)
        navigate("/login");
      else
      {
        if(location.state)
        {
          let startdate=new Date(location.state.check_in_date);
          let enddate=new Date(location.state.check_out_date);
          let no_of_days=Math.round((enddate-startdate)/(1000*60*60*24));
          let amount=no_of_days*data.price;
          navigate("/book",{state:{id,room_name:data.room_name,amount,chk_in_date:location.state.check_in_date,chk_out_date:location.state.check_out_date,no_of_boarders:location.state.nob}});
        }
      else
      {
      let startdate=new Date(chk_in_date);
      let enddate=new Date(chk_out_date);
      let no_of_days=Math.round((enddate-startdate)/(1000*60*60*24));
      let amount=no_of_days*data.price;
      navigate("/book",{state:{id,room_name:data.room_name,amount,chk_in_date,chk_out_date,no_of_boarders:""}});
      }
      }
    }
    if(data.ratings)
    {var arr=Array.from({length:data.ratings});}
    return(
        <div id="show-details-body">
        <button  id="back"onClick={()=>navigate("/rooms")}>Back</button>
       {data.images && 
       <div id="carousel-div">
        <Carousel showThumbs={false}>
        {data.images.map((image)=>{
            return <img src={`${process.env.REACT_APP_backend_URL}/storage/${image.image}`} id="single-room-image"/>
        })}
        </Carousel>
        </div>}
        <div id="single-room-details">
         <h1>{data.room_name}</h1>
         {data.description &&<p>{data.description}</p>}
         {data.ratings &&<div>{arr.map(()=>{
            return <FaStar color="yellow"/>
       })}</div>}
         <h3>Price per night: Rs/- {data.price}</h3>
         {data.area && <h3>Area: {data.area} sq.m.</h3>}
         {data.max_capacity && <h3>Maximum number of boarders:{data.max_capacity }</h3>}
         {location.state?<button id="book" onClick={book}>Book</button>
         :<><div id="check-availability-outer-div">
          <div id="check-availability-heading">Check Availability</div>
          <div id="check-availability-labels">
          <label>Check-in-Date</label>
          <label>Check-out-Date</label>
          </div>
          <div id="check-availability-errors">
          {errors.check_in_date && <p style={{color:"red"}}>{errors.check_in_date[0]}</p>}
          {errors.check_out_date && <p style={{color:"red"}}>{errors.check_out_date[0]}</p>}
          </div>
          <div id="check-availability-inner-div">
         <input type="date" value={chk_in_date} onChange={(e)=>setChk_in_date(e.target.value)}/>
           <input type="date"  value={chk_out_date} onChange={(e)=>setChk_out_date(e.target.value)}/>
          </div>
          <button id="check" onClick={check_availability}>Check</button>
         </div>
         <br/>
         {flag!=null?(flag==true?<button id="book" onClick={book}>Book</button>:<h3>This room is not available for selected dates.Please select other dates.</h3>):null}
         </>}
        </div>
        </div>
    )
}
export default Show_Details;