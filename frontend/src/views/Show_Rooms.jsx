import './Show_Rooms.css'
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Search_Filter_Design from './Search_Filter_Design';
import Card from "./Card";
function Show_Rooms()
{
    const[items,setItems]=useState([]);
    const [val,setVal]=useState(null);
    const [minprice,setMinPrice]=useState(null);
    const [maxprice,setMaxPrice]=useState(null);
    const [cap,setCap]=useState(null);
    const [ratings,setRatings]=useState(null);
    useEffect(()=>{
        show();
    },[val,minprice,maxprice,cap,ratings]);
    async function show()
    {
     try{
        let res=await fetch(`${process.env.REACT_APP_backend_URL}/api/show-rooms?keyword=${val}&minprice=${minprice}&maxprice=${maxprice}&ratings=${ratings}&capacity=${cap}`);
        let data=await res.json();
        setItems(data.data);
     }
     catch(error)
     {
      alert(error.response.data.message);
     }
    }
    return(
      <>
       <Search_Filter_Design setVal={setVal} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setCap={setCap} setRatings={setRatings}/>
      <main id="rooms-body">
       {
         (items.length>0)?items.map((item)=>{
         return <Card id={item.id} name={item.room_name} img={item.images} desc={item.description} price={item.price} ratings={item.ratings}/>
        })
        : <h1>Sorry!Not Available</h1>
      }
       </main>
       </>
    )
}
export default Show_Rooms;