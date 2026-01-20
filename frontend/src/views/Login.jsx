import './Login.css';
import React,{useState} from "react";
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
let timer;
let admin_timer;
function Login()
{
  let navigate=useNavigate();
  let {logout,admin_logout}=useContext(AuthContext);
    const [email,setEmail]=useState("");
    const [pw,setPw]=useState("");
    const [type,setType]=useState("");
    const [otp,setOtp]=useState(null);
    const [user_email,setUser_email]=useState("");
    const [user_otp,setUser_otp]=useState(null);
    const [condition,setCondition]=useState(false);
    const [errors,setErrors]=useState({});
    async function login(e)
    {
        e.preventDefault(); 
          try
          {
          let obj={email,password:pw};
          if(type=="User")
          {
            let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/login`,obj);
            setErrors({});
            alert(res.data.message);
            if(res.data.token)
             {
                 localStorage.setItem("token",res.data.token);
                 timer=setTimeout(logout,3600000);
                navigate("/user-details");  
             }
          }
          else if(type=="Admin")
          {
            let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/admin-login`,obj);
            setErrors({});
            alert(res.data.message);
            if(res.data.token)
              {
                localStorage.setItem("admin",res.data.token);
                admin_timer=setTimeout(admin_logout,3600000);
                navigate("/admin-panel");
              }
          }
          else
             setErrors({type:"Select register type"});
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
    setEmail("");
    setPw("");
    setType("");
   }
   async function forgot_pw()
   {
     try{
      let obj={email:user_email};
      let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/forgot-password`,obj);
      setErrors({});
      if(!res.data.message)
         setOtp(res.data.otp);
     else
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
   async function verify()
   {
    if(otp==user_otp)
      {
        try{
          let obj={email:user_email};
         let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/forgot-password-login`,obj);
         alert(res.data.message);
         if(res.data.token)
          {
            localStorage.setItem("token",res.data.token);
                 timer=setTimeout(logout,3600000);
                navigate("/user-details"); 
          }
        }
        catch(error)
       {
        alert(error.response.data.message);
       }
      } 
      else
      alert("Incorrect OTP");
   }
    return(
        <main id="login-body">
        <img src={`${process.env.REACT_APP_backend_URL}/storage/images/96e58bdb-91fc-41a3-9d72-cc63adb2ee38.jpg`} id="login-form-bg-image"/>
        {condition?(
          <div id="forgot-pw-div">
           {otp ?(<div>
        <label> Enter OTP:</label>
        <input type="number" value={user_otp} onChange={(e)=>setUser_otp(e.target.value)}/>
        </div>)
          :(<div>
        {errors.email && <p style={{color:"red"}}>{errors.email[0]}</p>}
        <label> Email:</label>
        <input type="text" value={user_email} onChange={(e)=>setUser_email(e.target.value)}/>
        </div>)}
        <div>
        {otp?
        <button className="forgot-pw" onClick={verify}>Submit</button>
        :<button className="forgot-pw" onClick={forgot_pw}>Get OTP</button>}
        </div>
          </div>
         )
         :(
        <form onSubmit={login}>
        <div>
        {errors.email && <p style={{color:"red"}}>{errors.email[0]}</p>}
        <label> Email:</label>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
        {errors.password &&<p style={{color:"red"}}>{errors.password[0]}</p>}
        <label> Password:</label>
       <input type="password" value={pw} onChange={(e)=>setPw(e.target.value)}/>
       <p id='text' onClick={()=>setCondition(true)}>Forgot Password?</p>
        </div>
        <div>
        {errors.type &&<p style={{color:"red"}}>{errors.type}</p>}
        <input type="radio" value="Admin" checked={type=="Admin"} onClick={(e)=>setType(e.target.value)}/>Admin 
        <input type="radio" value="User" checked={type=="User"} onClick={(e)=>setType(e.target.value)}/>User
        </div>
        <div>
        <button id="login" type="submit">Login</button>
        <button id="clear" type="reset"onClick={clear}>Reset</button>
        </div>
        <div>
        <p>New User?<Link to="/register" id='text'>Sign Up</Link></p>
        </div>
         </form>)}
         </main>
    )
}
export {Login,timer,admin_timer};