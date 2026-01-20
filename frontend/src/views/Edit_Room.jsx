import axios from "axios";
import {useState} from "react";
import {ReactSortable} from "react-sortablejs";
import { useLocation,Link} from "react-router-dom";
function Edit_Rooms()
{
  let token=localStorage.getItem("admin");
    const location=useLocation();
    const {id,item_name,item_image,item_desc,item_price,item_ratings,item_area,item_cap,item_no_of_rooms}=location.state;
    let [name,setName]=useState(item_name);
    let [desc,setDesc]=useState(item_desc);
    let [price,setPrice]=useState(item_price);
    let [area,setArea]=useState(item_area);
    let [cap,setCap]=useState(item_cap);
    let [no_of_rooms,setNo_of_rooms]=useState(item_no_of_rooms);
    let [ratings,setRatings]=useState(item_ratings);
    let [images,setImages]=useState([]);
    let [errors,setErrors]=useState({});
    let [previmages,setPrevimages]=useState(item_image);
    async function edit(e)
    {
        e.preventDefault();
        let formData=new FormData();
          formData.append("name",name);
          formData.append("no_of_rooms",no_of_rooms);
          if(images.length>0)
          {
            images.forEach(image =>{
            formData.append("images[]",image);
            });
          }
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
              let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/edit-room/${id}`,formData,{headers:{Authorization:`Bearer ${token}`}});
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
    return(
        <main id="add-room-body">
        <img src={`${process.env.REACT_APP_backend_URL}/storage/images/96e58bdb-91fc-41a3-9d72-cc63adb2ee38.jpg`} id="form-bg-image"/>
        <form id="rooms-form" onSubmit={edit}>
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
        <label>Select Images</label>
       <input type="file" multiple accept="image/*"onChange={handleImage}/>
       {images.length>1 && <><br/><br/><label>Order the images by drag and drop</label></>}
        {images.length>1 ? <ReactSortable list={images} setList={(newList)=>setImages(newList)} animation={150} direction="horizontal"  id="drag-drop">
               {images.map((img) => (
                 <img src={URL.createObjectURL(img)} id="preview"/>
               ))}
             </ReactSortable>
              :images.length==1?<img src={URL.createObjectURL(images[0])} id="preview"/>
              :previmages.map((img)=>(
                <img src={`${process.env.REACT_APP_backend_URL}/storage/${img.image}`} id="preview"/>
              ))}
        </div>
        <div>
        <button id="add_rooms" type="submit">Submit</button>
        <Link to="/manage-rooms"><button id="add_rooms">Back</button></Link>
        </div>
         </form>
         </main>
    )
}
export default Edit_Rooms;
