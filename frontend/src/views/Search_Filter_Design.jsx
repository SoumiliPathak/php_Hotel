import { FaSearch } from "react-icons/fa";
import { useState } from 'react';
import "./Search_Filter_Design.css";
function Search_Filter_Design(props)
{
    const [val,setVal]=useState("");
    const [pricefilter,setPriceFilter]=useState("Select Price");
    const [cap,setCap]=useState("Occupancy");
    const [ratings,setRatings]=useState("Ratings");
     function setPrice(e)
    {
      setPriceFilter(e.target.value);
      let num=Number(e.target.value);
       switch(num)
       {
        case 1:
          props.setMinPrice(2000)
          props.setMaxPrice(3999);
          break;
        case 2:
           props.setMinPrice(4000)
           props.setMaxPrice(5999);
            break;
        case 3:
           props.setMinPrice(6000)
           props.setMaxPrice(7999);
              break;  
        case 4:
            props.setMinPrice(8000)
            props.setMaxPrice(10000);  
                break;
        }
    }
    function clear()
    {
      props.setVal(null);
      props.setMinPrice(null);
      props.setMaxPrice(null);
      props.setRatings(null);
      props.setCap(null);
      setVal("");
      setPriceFilter("Select Price");
      setCap("Occupancy");
      setRatings("Ratings");
    }
    
    
         return(
                 <div id="search_and_filter">
               <select id="price-filter" value={pricefilter} onChange={setPrice}>
               <option>Select Price</option>
               <option value="1">2000-4000</option>
               <option value="2">4000-6000</option>
               <option value="3">6000-8000</option>
               <option value="4">More than 8000</option>
               </select>
             <select id="ratings-filter" value={ratings} onChange={(e)=>(props.setRatings(e.target.value),setRatings(e.target.value))}>
              <option>Ratings</option>
                <option value="1"> 1</option>
                 <option value="2">2</option>
                 <option value="3">3</option>
                 <option value="4">4</option>
                 <option value="5">5</option>
               </select>
               <select id="capacity-filter" value={cap} onChange={(e)=>(props.setCap(e.target.value),setCap(e.target.value))}>
            <option>Occupancy</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
           <input type="text" id="search-bar" value={val} onChange={(e)=>(setVal(e.target.value))}/>
         {val?
          (<span id="search-icon"  onClick={()=>props.setVal(val)}>
           <FaSearch/>
        </span>):
       (<span id="search-icon">
        <FaSearch/>
     </span>)}
     <button id="clear-filters" onClick={clear}>Clear</button>
       </div>
    )
}
export default Search_Filter_Design;
