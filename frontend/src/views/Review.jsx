import "./Review.css";
import { useState,useEffect } from "react";
import {FaStar} from "react-icons/fa";
import axios from "axios";
import Review_Card from "./Review_Card";
function Review()
{
  let token=localStorage.getItem("token");
  let [review,setReview]=useState("");
  let [showRate,setShowRate]=useState(false);
  let [ratings,setRatings]=useState();
  let [data,setData]=useState([]);
  useEffect(()=>{
    show();
  },[]);
  async function show()
  {
    try{
      let res=await axios.get(`${process.env.REACT_APP_backend_URL}/api/show-reviews`,{headers:{Authorization:`Bearer ${token}`}});
        setData(res.data.data);
       }
    catch(error)
    {
      alert(error.response.data.message);
    }
  }
  async function add()
  {
    let obj={review,ratings};
    try{
      let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/add-review`,obj,{headers:{Authorization:`Bearer ${token}`}});
      alert(res.data.message);
    }
    catch(error)
    {
      alert(error.response.data.message);
    }
  }
    return(
     <main id="review-body">
        {data.length>0?
        data.map((item)=>{
            return <Review_Card id={item.id} ratings={item.ratings} review={item.review} name={item.user.name} image={item.user.image}/>
        }):<h1>No Reviews Yet</h1>}
    {token ?(<><div id="heading-div"><h3 id="review-h3">Add a review</h3></div>
     <div className="review-div">
    <button className="ratings-review" onClick={()=>setShowRate(true)}>rate</button>
    {showRate
     ?<div>
        <FaStar onClick={()=>(setRatings(1),setShowRate(false))}/>
        <FaStar onClick={()=>(setRatings(2),setShowRate(false))}/>
        <FaStar onClick={()=>(setRatings(3),setShowRate(false))}/>
        <FaStar onClick={()=>(setRatings(4),setShowRate(false))}/>
        <FaStar onClick={()=>(setRatings(5),setShowRate(false))}/>
      </div>:null}
    <textarea rows="5" cols="10" id="review" value={review} onChange={(e)=>setReview(e.target.value)}></textarea>
    <button className="ratings-review" onClick={add}>Submit</button>
     </div>
     </>):null}
     </main>
    )
}
export default Review;