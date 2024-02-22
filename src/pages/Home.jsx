import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Link, useNavigate } from 'react-router-dom'
import MovieCard from '../Components/MovieCard'
import { getHomeMovieAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home() {
  const[allMovies,setAllMovies]=useState([])
  const [loginStatus,setLoginStatus]=useState(false)
  const navigate=useNavigate()
  const [loginStatuss,setLoginStatuss]=useState(false)







  const getHomeMovie=async()=>{
   try{
    const result=await getHomeMovieAPI()
    if (result.status === 200) {
      setAllMovies(result.data)
    }
  } catch (err) {
    console.log(err);
  }
  }
console.log(allMovies);

 
  
  
  useEffect(()=>{
    getHomeMovie()
  if(sessionStorage.getItem("token")){
    setLoginStatus(true)
  }else{
    setLoginStatus(false)
  }
  },[])
  
  
 
 
 
  const handleNavigate=()=>{
    if(loginStatus===true){
  navigate('/movies')
    }else{
      toast.error("Please Login to get full access to Movies!!!",{
        theme:"colored"
      })
    }
  }
  
  


  return (
    <>
    <div>
        <Header/>
        <div style={{height:"90vh",marginTop:"70px"}}className="w-100 d-flex justify-content-center align-items-center back
rounded">
<div className="container">
  <div className="row  align-items-center ">
    <div className="col-lg-6  ">
      <h1 style={{fontSize:"50px",color:"white"}} className='fw-bolder mb-2    j1'>
      <i class="fa-solid fa-clapperboard  " style={{color: "red"}}></i> ShowTime </h1>
      <h3  style={{color:"red"}}  className=' p-4 fs-5 ' >Movie Ticket Booking App</h3>
      <p className='text-light p-2  fs-4  ' style={{textAlign:"justify"}}>Experience the ultimate Movie at your fingertips with our Booking Movie App</p>
{loginStatus ?<Link className='btn btn-danger mt-2 ' to='/userdashboard'> Your Bookings <i class="fa-solid fa-right-long fa-beat-fade ms-2"></i></Link>:
 <Link className='btn btn-danger mt-2 ' to='/login'>Start to Book Your Show <i class="fa-solid fa-right-long fa-beat-fade ms-2"></i></Link>

}  </div>
  </div>
</div>
</div>
<div className='mt-3 '>
<h1 style={{color:"red"}} className='text-center fw-bolder  mb-5'>Latest Releases</h1>
<marquee>
  <div className="d-flex  ">
{ allMovies.length>0&&allMovies.map((movie,index)=>(
   <div key={index} className="movie me-5">
   <MovieCard movie={movie}/>
 </div>

))
}
 </div>
</marquee>
<div className="text-center">
<div className="text-center">
  <button onClick={handleNavigate} style={{color:"red"}}className='btn btn-link '>View all Movies</button>
</div>
</div>
</div>

    </div>
    <ToastContainer autoClose={3000}  />
    </>
    
  )
}

export default Home