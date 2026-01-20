import "./Manage_Rooms.css";
import axios from "axios";
import {useState,useEffect}from "react";
import { useNavigate } from "react-router-dom";
function Manage_Rooms()
{
  let token=localStorage.getItem("admin");
  let navigate=useNavigate();
    let [data,setData]=useState([]);
    useEffect(()=>{
        show();
      },[]);
    async function show()
    {
        try
        {
        let res=await axios.get(`${process.env.REACT_APP_backend_URL}/api/show-rooms`);
          setData(res.data.data);
       }
      catch(error)
      {
        alert(error.response.data.message);
      }
    }
async function del(id)
{
    try
    {
    let res=await axios.delete(`${process.env.REACT_APP_backend_URL}/api/delete-room/${id}`,{headers:{Authorization:`Bearer ${token}`}});
    alert(res.data.message);
   }
  catch(error)
  {
    alert(error.response.data.message);
  }
}
    return(
     <main id="manage-rooms">
       <table id="item-table">
     <tr><th>Image</th><th>Name</th><th>Number Of Rooms</th><th>Price Per Night</th><th>Ratings</th><th>Area</th><th>Maximum Number Of Boarders</th></tr>
     {data.map((item)=>{
        return <tr><td><img src={`${process.env.REACT_APP_backend_URL}/storage/${item.images[0].image}`} className="item-img-admin-panel"/></td><td>{item.room_name}</td><td>{item.num_of_rooms}</td><td> Rs/- {item.price}</td><td>{item.ratings?item.ratings:"---"}</td><td>{item.area?`${item.area} sq.m.`:"---"}</td><td>{item.max_capacity?item.max_capacity:"---"}</td><td><button className="admin-panel-delete"onClick={()=>del(item.id)}>Delete</button></td><td><button className="admin-panel-edit" onClick={()=>navigate("/edit-room",{state:{id:item.id,item_name:item.room_name,item_image:item.images,item_desc:item.description,item_price:item.price,item_ratings:item.ratings,item_area:item.area,item_cap:item.max_capacity,item_no_of_rooms:item.num_of_rooms}})}>Edit</button></td></tr>
     })}
     </table>
     <button  id="back"onClick={()=>navigate("/admin-panel")}>Back</button>
     </main>
    )
}
export default Manage_Rooms;