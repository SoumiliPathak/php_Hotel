import { useState } from "react";
import axios from "axios";
import {Link,useLocation} from "react-router-dom";
function Edit_User()
{
 const location=useLocation();
 const{user_image,user_name,user_email,user_pno,user_dob,user_sex}=location.state;
 let token=localStorage.getItem("token");
  let [email,setEmail]=useState(user_email);
  let [pw,setpw]=useState("");
  let [name,setName]=useState(user_name);
  let [image,setImage]=useState(user_image);
  let [pno,setpno]=useState(user_pno);
  let [dob,setDob]=useState(user_dob);
  let [sex,setSex]=useState(user_sex);
  let [errors,setErrors]=useState({}); 
  async function edit(e)
  {
     e.preventDefault();
     let date=new Date();
     let birthdate=new Date(dob);
     let age=date.getFullYear()-birthdate.getFullYear();
     if(date.getMonth()<birthdate.getMonth()||(date.getMonth()==birthdate.getMonth() && date.getDate()<birthdate.getDate()))
         age--;
     let formData=new FormData();
   formData.append("password",pw);
   formData.append("name",name);
   if(image)
     formData.append("image",image);
   formData.append("date_of_birth",dob);
   formData.append("age",age);
 if(sex!=null)
     formData.append("sex",sex);
   try{
      let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/edit-user`,formData,{headers:{Authorization:`Bearer ${token}`}});
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
  function clear()
  {
    setpw("");
    setName("");
    setImage(null);
    setDob("");
    setSex("");
  }
 return(
      <main id="register-body">
       <img src={`${process.env.REACT_APP_backend_URL}/storage/images/96e58bdb-91fc-41a3-9d72-cc63adb2ee38.jpg`} id="register-form-bg-image"/>
      <form id="register-form" onSubmit={edit}>
      <div>
      <label>Email:</label>
      <input type="text" value={email}/>
      </div>
      <div>
      {errors.password&& <p style={{color:"red"}}>{errors.password[0]}</p>}
      <label>Password:</label>
      <input type="password" value={pw} onChange={(e)=>setpw(e.target.value)}/>
      </div>
      <div>
      {errors.name && <p style={{color:"red"}}>{errors.name[0]}</p>}
      <label>Name:</label>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div>
      <label>Phone No:</label>
      <input type="text" value={pno}/>
      </div>
      <div>
      <input type="radio" value="M" checked={sex=="M"} onClick={(e)=>setSex(e.target.value)}/>Male
      <input type="radio" value="F" checked={sex=="F"} onClick={(e)=>setSex(e.target.value)}/>Female
      <input type="radio" value="O" checked={sex=="O"} onClick={(e)=>setSex(e.target.value)}/>Other
      </div>
      <div>
      {errors.date_of_birth ? <p style={{color:"red"}}>{errors.date_of_birth[0]}</p>
       :errors.age ? <p style={{color:"red"}}>You must be 18 or older</p>:null}
      <label>Date Of Birth:</label>
      <input type="date" value={dob} onChange={(e)=>setDob(e.target.value)}/>
      </div>
      <div>
      <label>Select Image:</label>
      <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])}/>
      {image? (typeof image==="string"?(<img src={`${process.env.REACT_APP_backend_URL}/storage/${image}`} id="preview"/>):(<img src={URL.createObjectURL(image)} id="preview"/>)):null}
      </div>
      <div>
     <button className="register-page-btn"type="submit">Submit</button>
     <button className="register-page-btn" onClick={clear}>Reset</button>
     <Link to="/user-details"><button className="register-page-btn">Back</button></Link>
      </div>
      </form>
      </main>
    )
}
export default Edit_User;