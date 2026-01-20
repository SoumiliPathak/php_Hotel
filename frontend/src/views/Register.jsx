import "./Register.css";
import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
function Register()
{
  let [email,setEmail]=useState("");
  let [pw,setpw]=useState("");
  let [name,setName]=useState("");
  let [image,setImage]=useState(null);
  let [pno,setpno]=useState("");
  let [dob,setDob]=useState("");
  let [sex,setSex]=useState("");
  let [type,setType]=useState("");
  let [errors,setErrors]=useState({});
  async function register(e)
  {
     e.preventDefault();
      if(type=="User")
      {
        let date=new Date();
        let birthdate=new Date(dob);
        let age=date.getFullYear()-birthdate.getFullYear();
        if(date.getMonth()<birthdate.getMonth()||(date.getMonth()==birthdate.getMonth() && date.getDate()<birthdate.getDate()))
            age--;
        let formData=new FormData();
      formData.append("email",email);
      formData.append("password",pw);
      formData.append("name",name);
      if(image)
        formData.append("image",image);
      formData.append("phone_no",pno);
      formData.append("date_of_birth",dob);
      formData.append("age",age);
    if(sex!="")
        formData.append("sex",sex);
      try{
        let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/register`,formData);
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
    else if(type=="Admin")
    {
      let obj={email,password:pw};
      try{
        let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/register-admin`,obj);
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
    else
      setErrors({type:"Select register type"});
  }
  function clear()
  {
    setEmail("");
    setpw("");
    setName("");
    setImage(null);
    setpno("");
    setDob("");
    setSex("");
    setType("");
  }
    return(
      <main id="register-body">
    <img src={`${process.env.REACT_APP_backend_URL}/storage/images/96e58bdb-91fc-41a3-9d72-cc63adb2ee38.jpg`} id="register-form-bg-image"/>
      <form id="register-form" onSubmit={register}>
      <div>
      {errors.email && <p style={{color:"red"}}>{errors.email[0]}</p>}
      <label>Email:</label>
      <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div>
      {errors.password&& <p style={{color:"red"}}>{errors.password[0]}</p>}
      <label>Password:</label>
      <input type="password" value={pw} onChange={(e)=>setpw(e.target.value)}/>
      </div>
      <div>
        {errors.type &&<p style={{color:"red"}}>{errors.type}</p>}
        <input type="radio" value="Admin" checked={type=="Admin"} onClick={(e)=>setType(e.target.value)}/>Admin 
        <input type="radio" value="User" checked={type=="User"} onClick={(e)=>setType(e.target.value)}/>User
      </div>
      {(type=="User"||type=="")
       &&<><div>
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
      {image && <img src={URL.createObjectURL(image)} id="preview"/>}
      </div>
      </>}
      <div>
     <button className="register-page-btn"type="submit">Submit</button>
     <button className="register-page-btn" onClick={clear}>Reset</button>
      </div>
      <div><p>Already have an account?<Link to="/login" id="text">Sign in</Link></p></div>
      </form>
      </main>
    )
}
export default Register;