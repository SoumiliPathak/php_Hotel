import { createContext,useState }from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthContext=createContext();
 function AuthProvider({children})
{
  let [img,setImg]=useState(null);
  const navigate=useNavigate();
  async function logout()
  {
    let token=localStorage.getItem("token");
     try{
       let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/logout`,{},{headers:{Authorization:`Bearer ${token}`}});
       localStorage.removeItem("token");
       setImg(null);
       alert("Your token is expired and you are logged out");
       navigate("/");
     }
     catch(error)
     {
      alert(error.response.data.message);
     }
  }
  async function admin_logout()
    {
      let token=localStorage.getItem("admin");
      try{
        let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/admin-logout`,{},{headers:{Authorization:`Bearer ${token}`}});
        localStorage.removeItem("admin");
        alert("Your token is expired and you are logged out");
         navigate("/");  
       }
      catch(error)
      {
        alert(error.response.data.message);
      }
    }
  return(<AuthContext.Provider value={{img,setImg,logout,admin_logout}}>
      {children}
  </AuthContext.Provider>);
}
export {AuthContext,AuthProvider};