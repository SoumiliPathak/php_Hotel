import "./Facilities.css";
import { FaWifi,FaPumpSoap,FaSwimmingPool,FaCar,FaSpa,FaChild,FaBed } from "react-icons/fa";
import {MdOutlineRoomService,MdOutlineLocalLaundryService,MdPets,MdWaves,MdFitnessCenter,MdOutlineLocalDining,MdOutlineSportsSoccer} from "react-icons/md";
import {TbAirConditioning, TbFountain} from "react-icons/tb";
import {GiLift} from "react-icons/gi";
import { FaWineGlass } from "react-icons/fa6";
function Facilities()
{
    let img_array=["8df2f4ae-97b3-474e-8367-bdad82c45692.jpg","6576c1ea-2dce-478b-8283-d67b147be4e6.jpg","f7a49476-b183-4376-9f7b-1ea13fb6c287.jpg","8a03081c-21f7-4ab0-954e-26c2a8f8d597.jpg","a05049a7-06bd-4c16-9f4a-a785e1cef7ea.jpg","1831d248-9fc1-4292-a0e0-53bd6f02fda6.jpg","3447e9cf-3ab8-4a0b-8305-0b135671cc1c.jpg","e8021cf3-dd9f-4bd0-8f80-9405d23f888b.jpg","0e60977a-11d6-4ae6-9f85-a1a40064891d.jpg","7757825f-a905-4a8d-8afa-f6e16077b481.jpg","4bccd2ec-c7cf-4dd9-8a1d-d7ddaed30e91.jpg","36b6937a-e60d-488f-b18b-2e4df6e6cdd1.jpg","eb596b77-10d3-4e49-81b4-fcd63bd5e16c.jpg","8EXZgltxWorpCcTT8b2l2UJLI7wghJDBTfVEVWoa.jpg","fphbk8gAKSblYV74Qz06Cia1WccNluAR44kmVv9E.jpg","1YQhs53qrDqaSsOHFx9PUIchVXHhYkPOYGayfRbB.jpg"];
    return(
  <main id="service-body">
   <h1 id="facilities-h1">Our Services</h1>
 <div id="facilities">
 <ul className="facilities-list">
<li><MdOutlineRoomService/> 24 hour room services</li>
<li><FaWifi/> WiFi Service</li>
<li><MdOutlineLocalLaundryService/> Laundry service</li>
<li><TbAirConditioning/> Airconditioner Facility</li> 
<li><FaBed/> Elegent Rooms</li>
<li><FaPumpSoap/> Big Washrooms with Toiletries</li>
<li><MdWaves/> Sea at the doorsteps</li>
<li><GiLift/> Elevator Facility</li>
<li><MdPets/> Pet care</li>
</ul>
<ul className="facilities-list">
<li><FaSwimmingPool/> Swimming Pool</li>
<li><FaCar/> Parking</li>
<li><MdFitnessCenter/> Gym</li>
<li><FaSpa/> Spa & Salon</li>
<li><FaChild/> Children Park</li>
<li><MdOutlineSportsSoccer/> Game Room</li>
<li><TbFountain/> Garden & Lawn </li>
<li><MdOutlineLocalDining/> Dining Option</li>
<li><FaWineGlass/> Bar</li>
</ul>
 </div>
 <div id="facilities-image">
 {img_array.map((image)=>{
    return <img src={`${process.env.REACT_APP_backend_URL}/storage/images/${image}`}className="services"/>
 })}
 </div>
 </main>
 )
}
export default Facilities;