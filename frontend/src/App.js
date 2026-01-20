import './App.css';
import Header from './views/Header';
import Footer from './views/Footer';
import Home from './views/Home';
import About_Us from './views/About';
import Contact from './views/Contact';
import Add_Rooms from './views/Add_Rooms';
import Facilities from './views/Facilities';
import Show_Rooms from './views/Show_Rooms';
import Show_Details from './views/Show_Details';
import Register from './views/Register';
import {Login} from './views/Login';
import User_Details from './views/User_Details';
import Review from './views/Review';
import Booking_Form from './views/Booking_Form';
import Show_Bookings from './views/Show_Bookings';
import Edit_User from './views/Edit_User';
import Admin_Panel from './views/Admin_Panel';
import Manage_Rooms from './views/Manage_Rooms';
import Edit_Rooms from './views/Edit_Room';
import Payment_Status from './views/Payment_Status';
import {AuthProvider} from './views/AuthContext';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
     <Header/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about-us' element={<About_Us/>}/>
      <Route path='/contact-us' element={<Contact/>}/>
      <Route path='/facilities' element={<Facilities/>}/>
      <Route path='/add-room' element={<Add_Rooms/>}/>
      <Route path='/rooms' element={<Show_Rooms/>}/>
      <Route path='/room-details/:id' element={<Show_Details/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/user-details' element={<User_Details/>}/>
      <Route path='/review' element={<Review/>}/>
      <Route path='/book' element={<Booking_Form/>}/>
      <Route path='/bookings' element={<Show_Bookings/>}/>
      <Route path='/edit-user' element={<Edit_User/>}/>
      <Route path='/admin-panel' element={<Admin_Panel/>}/>
      <Route path='/manage-rooms' element={<Manage_Rooms/>}/>
      <Route path='/edit-room' element={<Edit_Rooms/>}/>
      <Route path='/payment-status' element={<Payment_Status/>}/>
      </Routes>
     <Footer/>
     </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
