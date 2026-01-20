import {FaStar} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './Card.css';
function Card(props)
{
   const navigate=useNavigate();
   if(props.desc)
    {var desc=props.desc.substring(0,70)+"...";}
   if(props.ratings)
    {var arr=Array.from({length:props.ratings});}
    
    return(
        <div id="room-card">
        <img src={`${process.env.REACT_APP_backend_URL}/storage/${props.img[0].image}`} id="room-image"/>
        <h3 id="card-h3-1">{props.name}</h3>
        <h3 id="card-h3-2">Rs/- {props.price}</h3>
        {props.ratings&& arr.map(()=>{
            return <FaStar color="yellow"/>
       })}
       {desc&& <p id="card-p">{desc}</p>}
        {props.check_in_date?<button id="view-room" onClick={()=>navigate(`/room-details/${props.id}`,{state:{check_in_date:props.check_in_date,check_out_date:props.check_out_date,nob:props.nob}})}>View</button>
        :<button id="view-room" onClick={()=>navigate(`/room-details/${props.id}`)}>View</button>}
        </div>
    )
}
export default Card;