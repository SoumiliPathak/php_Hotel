import {useNavigate}from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {FaStar} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";
import {MdDelete} from "react-icons/md";
import {MdEdit} from "react-icons/md";
function Review_Card(props)
{
    let navigate=useNavigate();
    let token=localStorage.getItem("token");
    let [review,setReview]=useState(props.review);
    let [ratings,setRatings]=useState(props.ratings);
    let [flag,setFlag]=useState(false);
async function del(id)
{
  if(!token)
    navigate('/login');
  else
    {
    try
    {
    let res=await axios.delete(`${process.env.REACT_APP_backend_URL}/api/delete-review/${id}`,{headers:{Authorization:`Bearer ${token}`}});
     alert(res.data.message);
   }
  catch(error)
  {
    alert(error.response.data.message);
  }
  }
}
async function edit(id)
{
  if(!token)
    navigate("/login");
  else
  {
    try{
     let obj={review,ratings};
     let res=await axios.put(`${process.env.REACT_APP_backend_URL}/api/edit-review/${id}`,obj,{headers:{Authorization:`Bearer ${token}`}});
     alert(res.data.message);
     setFlag(false);
    }
    catch(error)
  {
    alert(error.response.data.message);
    setFlag(false);
  }
  }
}
    if(props.ratings)
    {
      var arr=Array.from({length:props.ratings});
    }
  return(
    <div className="reviews-div"> 
                 {flag?(<><h2 className="review-h2">{props.name}</h2>
                    <textarea rows="5" cols="10" id="review" value={review} onChange={(e)=>setReview(e.target.value)}></textarea>
                    <button className="ratings-review" onClick={()=>edit(props.id)}>Submit</button>
                    <div>
                      <FaStar onClick={()=>setRatings(1)}/>
                     <FaStar onClick={()=>setRatings(2)}/>
                    <FaStar onClick={()=>setRatings(3)}/>
                     <FaStar onClick={()=>setRatings(4)}/>
                    <FaStar onClick={()=>setRatings(5)}/>
                  </div>
                    </>)
                 :(<> 
                 <div id="review-div2">
                 {props.image?(<img src={`${process.env.REACT_APP_backend_URL}/storage/${props.image}`} className="review-img"/>)
                 :<CgProfile size={100}/>}
                 {props.ratings && <div className="stars">{arr.map(()=>{
                  return<FaStar size={20} color="yellow"/>
                  })}</div>}
                  <div><MdDelete size={20} onClick={()=>del(props.id)}/></div>
                  <div><MdEdit size={20}onClick={()=>setFlag(true)}/></div>
                  </div>
                 <div className="reviews"><h2 className="review-h2">{props.name}</h2>
                 <p className="review-p">{props.review}</p></div>
               </>)}
                </div>
  )
}
export default Review_Card;