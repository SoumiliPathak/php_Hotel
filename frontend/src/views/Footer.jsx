import './Footer.css';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
function Footer()
{
    return(
        <div id="footer">
        <div>
        <h4>Adress</h4>
        <FaLocationDot color="red"/> 3 Kola beach road,<br/>Kola,<br/>Goa-40021            
        </div>
        <div>
        <h4>Contact</h4>
        < FaPhoneAlt color="green"/> 9876543210<br/>
        <FaWhatsapp color="green"/> 8765903214<br/>
        <BiLogoGmail color="red"/> Seashore@gmail.com
        </div>
        <div>
        <h4>Developed by</h4>
         Soumili Pathak
         </div>
         <div>
        <h4>Follow Us on</h4>
        <div id="follow-us">
        <FaFacebook color="blue" size="30px"/><FaInstagram color="magenta" size="30px"/><FaYoutube color="red" size="30px"/>
        </div>
        </div>
        </div>
    )
}
export default Footer;