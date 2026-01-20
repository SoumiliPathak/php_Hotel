import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import { FaWifi,FaPumpSoap,FaSwimmingPool,FaCar,FaSpa,FaChild,FaBed } from "react-icons/fa";
import {MdOutlineRoomService,MdOutlineLocalLaundryService,MdPets,MdWaves,MdFitnessCenter,MdOutlineLocalDining,MdOutlineSportsSoccer} from "react-icons/md";
import {TbAirConditioning, TbFountain} from "react-icons/tb";
import {GiLift} from "react-icons/gi";
import { FaWineGlass,FaLocationDot} from "react-icons/fa6";
import'./Home.css';
import { useEffect,useState} from 'react';
import axios from 'axios';
import Card from "./Card";
import {FaStar} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";
function Home()
{
    const [chk_in_date,setChk_in_date]=useState("");
    const [chk_out_date,setChk_out_date]=useState("");
    const [nob,setNob]=useState("");
    const [room,setRoom]=useState(null);
    const [review,setReview]=useState([]);
    const [errors,setErrors]=useState({});
    let arr=[];
    useEffect(()=>{
      show();
    },[]);
    async function search() 
    {
      let obj={check_in_date:chk_in_date,check_out_date:chk_out_date,no_of_boarders:nob};
      try{
        let res=await axios.post(`${process.env.REACT_APP_backend_URL}/api/search-room`,obj);
        setRoom(res.data.data);
        setErrors({});
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
        setRoom(null);
        setChk_in_date("");
        setChk_out_date("");
        setNob("");
    }
    async function show()
  {
    try{
      let res=await axios.get(`${process.env.REACT_APP_backend_URL}/api/show-reviews/home`);
        setReview(res.data.data);
       }
    catch(error)
    {
      alert(error.response.data.message);
    }
  }
    return(
        <main id="home-body">
        <Carousel showThumbs={false}  autoPlay infiniteLoop >
       <img src={`${process.env.REACT_APP_backend_URL}/storage/images/7c6749a1-e3c6-41e5-bc67-b502f4fa4978.jpg`}className="carousel-pic"/>   
        <img src={`${process.env.REACT_APP_backend_URL}/storage/images/96e58bdb-91fc-41a3-9d72-cc63adb2ee38.jpg`}className="carousel-pic"/>
        <img src={`${process.env.REACT_APP_backend_URL}/storage/images/ghs9uwBB5AFQ58FZNVNEDDo6STkErR4lDwIvKEXH.jpg`}className="carousel-pic"/>
        <img src={`${process.env.REACT_APP_backend_URL}/storage/images/8EXZgltxWorpCcTT8b2l2UJLI7wghJDBTfVEVWoa.jpg`}className="carousel-pic"/>
        <img src={`${process.env.REACT_APP_backend_URL}/storage/images/fphbk8gAKSblYV74Qz06Cia1WccNluAR44kmVv9E.jpg`}className="carousel-pic"/>
        <img src={`${process.env.REACT_APP_backend_URL}/storage/images/f825a7d2-43ee-4794-91ec-5ff126a3b798.jpg`}className="carousel-pic"/>
        <img src={`${process.env.REACT_APP_backend_URL}/storage/images/162ad3dc-f7f5-494e-913d-42da4c05bfc8.jpg`}className="carousel-pic"/>
        <img src={`${process.env.REACT_APP_backend_URL}/storage/images/bab66b45-4f0e-4f6f-ab1a-adabe4a072f7.jpg`}className="carousel-pic"/>
        <img src={`${process.env.REACT_APP_backend_URL}/storage/images/8df2f4ae-97b3-474e-8367-bdad82c45692.jpg`}className="carousel-pic"/>
        <img src={`${process.env.REACT_APP_backend_URL}/storage/images/f7a49476-b183-4376-9f7b-1ea13fb6c287.jpg`}className="carousel-pic"/>
        </Carousel>
        <div id="home-div">
        <h1 id="home-h1">Welcome To Hotel<br/>Seashore</h1>
        <h3 id="home-h3">Find your bliss beside the waves...</h3>
        </div>
        <div id="home-check-availability">
        <div id="home-check-availability-outer-div">
          <div id="home-check-availability-heading">Search room</div>
          <div id="home-check-availability-labels">
          <label>Check-in-Date</label>
          <label>Check-out-Date</label>
          </div>
          <div id="home-check-availability-errors">
          {errors.check_in_date && <p style={{color:"red"}}>{errors.check_in_date[0]}</p>}
          {errors.check_out_date && <p style={{color:"red"}}>{errors.check_out_date[0]}</p>}
          </div>
          <div id="home-check-availability-inner-div">
         <input type="date" value={chk_in_date} onChange={(e)=>setChk_in_date(e.target.value)}/>
           <input type="date"  value={chk_out_date} onChange={(e)=>setChk_out_date(e.target.value)}/>
          </div>
          <div>
          {errors.no_of_boarders && <p style={{color:"red"}}>{errors.no_of_boarders[0]}</p>}
          <label>Number of guests in one room:</label>
          <select id="nob" value={nob} onChange={(e)=>setNob(e.target.value)}>
            <option>Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
           </div>
          <button id="home-check" onClick={search}>Search</button>
          <button id="home-check" onClick={clear}>Clear</button>
         </div>
         </div>
         {room && <div id="rooms-body">{room.map((item)=>{
         return <Card id={item.id} name={item.room_name} img={item.images} desc={item.description} price={item.price} ratings={item.ratings} check_in_date={chk_in_date} check_out_date={chk_out_date} nob={nob}/>
        })}
        </div> }
        <div id="home-about-div">
        <h1>About Us</h1><p id="home-about-text">Offering quality accommodation services accompanied by world-class hospitality since 2018.
      Our hotel began as a small, family-inspired establishment built on passion,craftsmanship and heartfelt service.Over the years,it has grown
      into a celebrated destination.Today,we are among the top five hotels in Goa.<br/><br/>
      Come,spend your holidays where sky meets the sea.Inspired by the rythm of the waves and warmth of genuine hospitality, we offer a place where
     guests can slow down,breathe deeply and reconnect with nature.From sunlit rooms with ocean views to  marvel architectural structure of our 
     hotel, each of the detail has been designed to make your stay effortless and memorable.Whether you're here for a romantic escape, a family 
     holiday or a quiet solo retreat, you'll find a welcoming atmosphere,attentive service and the simple luxury of being steps away from the sea.
    </p>
        </div>
        <div>
        <h1 id="facilities-h1">Our Services</h1>
         <div id="home-facilities">
         <ul className="home-facilities-list">
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
        <ul className="home-facilities-list">
        <li><FaSwimmingPool/> Swimming Pool</li>
        <li><FaCar/> Garage</li>
        <li><MdFitnessCenter/> Gym</li>
        <li><FaSpa/> Spa & Salon</li>
        <li><FaChild/> Children Park</li>
        <li><MdOutlineSportsSoccer/> Game Room</li>
        <li><TbFountain/> Garden & Lawn </li>
        <li><MdOutlineLocalDining/> Dining Hall</li>
        <li><FaWineGlass/> Bar</li>
        </ul>
         </div>
         <h1 id="facilities-h1">Reviews</h1>
         <div id="home-reviews">
          {review.length>0?
        review.map((item)=>{
          if(item.ratings)
          { 
             arr=Array.from({length:item.ratings});
          }
             let reviews=item.review.substring(0,100)+"...";
            return <div className="home-review">
             {item.user.image?(<img src={`${process.env.REACT_APP_backend_URL}/storage/${item.user.image}`} className="home-review-img"/>) :<CgProfile size={100}/> }  
              <h2 className="review-h2">{item.user.name}</h2>
              {item.ratings && <div className="stars">{arr.map(()=>{
              return<FaStar size={20} color="yellow"/>
                })}</div>} 
               <p className="review-p">{reviews}</p>
               </div>
        }):<h1>No Reviews Yet</h1>}
         </div>
        </div>
        <h1 id="facilities-h1">Contact</h1>
        <div id="home-contact-div">
        <p><FaLocationDot color="red"/> 3 Kola beach road,Kola,Goa-40021</p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61640.15997707702!2d73.94358906422616!3d15.075195129957036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbe4e94bee5c3b9%3A0x79ae952af03437f2!2sKola%2C%20Goa!5e0!3m2!1sen!2sin!4v1744542443682!5m2!1sen!2sin" width="800" height="200"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" id="contact-iframe"></iframe>  
        </div>
     </main>
       
    )
}
export default Home;