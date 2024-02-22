import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Movies from './pages/Movies'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Footer from './Components/Footer'
import Admin from './pages/Admin'
import Booking from './pages/Booking'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'


function App() {

  return (
    <>
<Routes>
  <Route path='/'element={<Home/>}></Route>
  <Route path='/login'element={<Auth/>}></Route>
  <Route path='/register'element={<Auth insideRegister/>}></Route>
  <Route path='/admin'element={<Admin/>}></Route>
    <Route path='/movies'element={<Movies/>}></Route>
    <Route path='/booking/:id'element={<Booking/>}></Route>
  <Route path='/admindashboard'element={<AdminDashboard/>}></Route>
  <Route path='/userdashboard'element={<UserDashboard/>}></Route>

  <Route path='/*'element={<Navigate to={'/'}/>}></Route>

 </Routes>  
 <Footer/>

 </>
  )
}

export default App
