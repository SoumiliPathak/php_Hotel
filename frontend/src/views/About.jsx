import "./About_Us.css";
function About_Us()
{
    return(
        <main id="about-body">
       <iframe width="100%" height="315" src="https://www.youtube.com/embed/qemqQHaeCYo?si=gKPCQ4iHSrFBSMV8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
       <div id="about-outer-div">
       <div id="about-div"><h1>About Us</h1><p id="about-text">Offering quality accommodation services accompanied by world-class hospitality since 2018.
      Our hotel began as a small, family-inspired establishment built on passion,craftsmanship and heartfelt service.Over the years,it has grown
      into a celebrated destination.Today,we are among the top five hotels in Goa.<br/><br/>
      Come,spend your holidays where sky meets the sea.Inspired by the rythm of the waves and warmth of genuine hospitality, we offer a place where
     guests can slow down,breathe deeply and reconnect with nature.From sunlit rooms with ocean views to  marvel architectural structure of our 
     hotel, each of the detail has been designed to make your stay effortless and memorable.Whether you're here for a romantic escape, a family 
     holiday or a quiet solo retreat, you'll find a welcoming atmosphere,attentive service and the simple luxury of being steps away from the sea.
    </p></div>
    <div id="about-div2">
    <h1>Meet Our Chairman</h1>
    <img src={`${process.env.REACT_APP_backend_URL}/storage/images/a3e69fd9-70e0-4c88-a8dd-0a7e0e277e9a.jpg `} id="about-image2"/>
    <h3>Mr. Vinayak Sharma</h3>
    <p id="about-text">Mr. Vinayak Sharma serves as the Chairman of the organization, providing strategic oversight and executive leadership across all areas of the 
    hotel’s operations and long-term growth. With an extensive background in hospitality management and business development, he plays a key role
     in shaping the company’s vision, corporate policies, and expansion roadmap.His focus on sustainable growth, innovation, and organizational 
     efficiency has positioned the hotel as a consistently high-performing brand within the hospitality sector.</p>  
    </div>
    </div>
        <div id="about-us-div">
        <h2 id="about-h2">We won Travel+Leisure India's Best Awards 2023</h2>
        <img src={`${process.env.REACT_APP_backend_URL}/storage/images/bdcdc48a-4420-47c3-9a00-0c990a9fb3b9.jpg `} id="about-image"/>
        </div>
        </main>
    )
}
export default About_Us;