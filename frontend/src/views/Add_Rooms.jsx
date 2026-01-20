import "./Add_Rooms.css";
import {React,useState} from 'react';
import {ReactSortable} from "react-sortablejs";
import { Link } from "react-router-dom";
import axios from "axios";
function Add_Rooms()
{
  let token=localStorage.getItem("admin");
    let [name,setName]=useState("");
    let [desc,setDesc]=useState("");
    let [price,setPrice]=useState("");
    let [ratings,setRatings]=useState("");
    let [area,setArea]=useState("");
    let [cap,setCap]=useState("");
    let [no_of_rooms,setNo_of_rooms]=useState("");
    let [images,setImages]=useState([]);
    let [errors,setErrors]=useState({});
    async function add(e)
    {
        e.preventDefault();
        let formData=new FormData();
          formData.append("name",name);
          formData.append("no_of_rooms",no_of_rooms);
          images.forEach(image =>{
            formData.append("images[]",image);
          });
         if(desc!="")
          formData.append("desc",desc);
          formData.append("price",price);
          if(ratings!="")
          formData.append("ratings",ratings);
          if(area!="")
            formData.append("area",area);
          if(cap!="")
            formData.append("capacity",cap);
            try{
              let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/add-room`,formData,{headers:{Authorization:`Bearer ${token}`}});
              setErrors({});
              alert(res.data.message);
            }
            catch(error)
            {
              if(error.response.status===422)
                setErrors(error.response.data.errors);
              else
              alert(error.response.data.message);
            }
    }
    function handleImage(e)
    {
       setImages(Array.from(e.target.files));
    }
    function clear()
    {
        setName("");
        setDesc("");
        setPrice("");
        setRatings("");
        setArea("");
        setCap("");
        setNo_of_rooms("");
        setImages([]);
    }
    return(
        <main id="add-room-body">
        <img src={`${process.env.REACT_APP_backend_URL}/storage/images/96e58bdb-91fc-41a3-9d72-cc63adb2ee38.jpg`} id="form-bg-image"/>
        <form id="rooms-form" onSubmit={add}>
        <div>
        {errors.name && <p style={{color:"red"}}>{errors.name[0]}</p>}
        <label>Room Name:</label>
        <input type="text" value={name} onChange={(e)=>(setName(e.target.value))}/>
        </div>
        <div>
        {errors.no_of_rooms && <p style={{color:"red"}}>{errors.no_of_rooms[0]}</p>}
        <label>Total Number of Rooms:</label>
       <input type="number" value={no_of_rooms} onChange={(e)=>(setNo_of_rooms(Number(e.target.value)))}/>
        </div>
        <div>
        <label>Description:</label>
       <textarea columns="10" rows="3"value={desc} onChange={(e)=>(setDesc(e.target.value))}></textarea>
        </div>
        <div>
        {errors.price && <p style={{color:"red"}}>{errors.price[0]}</p>}
        <label>Price:</label>
       <input type="number" value={price} onChange={(e)=>(setPrice(e.target.value))}/>
        </div>
        <div>
        <label>Ratings:</label>
       <input type="number" value={ratings} onChange={(e)=>(setRatings(e.target.value))}/>
        </div>
        <div>
        <label>Area:</label>
       <input type="number" value={area} onChange={(e)=>(setArea(e.target.value))}/>
        </div>
        <div>
        <label>Maximum Number Of Boarders:</label>
       <input type="number" value={cap} onChange={(e)=>(setCap(e.target.value))}/>
        </div>
        <div>
        {errors.images && <p style={{color:"red"}}>{errors.images[0]}</p>}
        <label>Select Images</label>
       <input  id="image"type="file" multiple accept="image/*"onChange={handleImage}/>
       {images.length>1 && <><br/><br/><label>Order the images by drag and drop</label></>}
       {images.length>1 ? <ReactSortable list={images} setList={(newList)=>setImages(newList)} animation={150} direction="horizontal"  id="drag-drop">
        {images.map((img) => (
          <img src={URL.createObjectURL(img)} id="preview"/>
        ))}
      </ReactSortable>
       :images.length==1?<img src={URL.createObjectURL(images[0])} id="preview"/>:null}
        </div>
        <div>
        <button id="add_rooms" type="submit">Add</button>
        <button id="add-room-clear" type="reset" onClick={clear}>Reset</button>
        <Link to="/admin-panel"><button id="add_rooms">Back</button></Link>
        </div>
         </form>
         </main>
    )
}
export default Add_Rooms;