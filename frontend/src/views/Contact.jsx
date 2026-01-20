import "./Contact_Us.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
function Contact()
{
    return(
      <main id="contact-body">
        <div>
        <h1>Address</h1> 
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61640.15997707702!2d73.94358906422616!3d15.075195129957036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbe4e94bee5c3b9%3A0x79ae952af03437f2!2sKola%2C%20Goa!5e0!3m2!1sen!2sin!4v1744542443682!5m2!1sen!2sin" width="600" height="200"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" id="contact-iframe"></iframe>
         <br/><FaLocationDot color="red"/> 3 Kola beach road,
         Kola,Goa-40021 
        </div> 
         <div>
          <h1>Contact</h1>
          < FaPhoneAlt color="green"/> 9876543210<br/>
        <FaWhatsapp color="green"/> 8765903214<br/>
        <BiLogoGmail color="red"/> Seashore@gmail.com
         </div>  
         <div>
        <h1>Follow us on</h1>
         <FaFacebook color="blue" size="30px"/>
         <FaInstagram color="magenta" size="30px"/>
         <FaYoutube color="red" size="30px"/>
         <FaTwitter size="30px" color="rgb(8, 132, 248)"/>
         <FaLinkedin size="30px" color="blue"/>
         <FaTelegram size="30px" color="rgb(8, 132, 248)"/>
         </div>
      </main>
    )
}
export default Contact;