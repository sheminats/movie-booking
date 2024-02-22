import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import {  Button, Form, FormLabel } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { movieContext } from '../Context/MovieShare';
import SERVER_URL from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bookMovieAPI } from '../services/allAPI';


function Booking() {
  const{movies}=useContext(movieContext)

  if (!movies) return null;
  const [movie, setMovie] = useState('');

  const { id} = useParams(); 
// console.log(id);
  
  
const [inputs,setInputs]=useState({
  moviename:"",bookingDate:"",seatNumber:"",showTime:""})


  const handleBooking= async () => {
    const {moviename, bookingDate,seatNumber,showTime } = inputs;
    if (!moviename||!bookingDate || !seatNumber ||!showTime) {
      toast.error("Please fill completely");
    } else {
      const reqBody = inputs
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
   "Authorization": `Bearer ${token}`
        };
        try {
          const result = await bookMovieAPI(id,reqBody, reqHeader);
          console.log(result);
          if (result.status === 200) {
            sessionStorage.getItem("movieDetails")

  
            toast.success("Movie booked successfully");
          } else {
            toast.warning("Failed to book movie. Please try again later.")
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
  };
     console.log(inputs);
  
  
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 return (
<>
<Header/>

<div  style={{marginTop:"100px",backgroundColor:"black"}}>
  <h1  style={{textAlign:"center",marginTop:"70px"}} className='p-2 fs-4 container fw-bolder text-white'>Book Tickets of Movie: <span className='fs-3' style={{color:"red"}}>{movies?.title}</span></h1>

  </div>


<div className="w-100 d-flex justify-content-center align-items-center
rounded">
<div className="container">
  <div className="row  align-items-center ">
    <div className="col-lg-6  ">
    <img width={'80%'}height={'300px'} className='img-fluid' src={`${SERVER_URL}/uploadss/${movies?.movieImage}`} alt="" />
    <div style={{width:'80%'}} className='mt-3 p-2 '>
<h5 className='pt-2'><span className='fw-bolder'>Description: </span>{movies?.description}</h5>
<h5 className='mt-1'><span className='fw-bolder'>Starrer:</span> {movies?.starrer}
Danish Sait,....  </h5>
<h5 className='mt-1'><span className='fw-bolder'>Genre:</span> {movies?.genre} </h5>

<h5 className='mt-1'><span className='fw-bolder'> Release Date:</span> {movies?.releaseDate}
 </h5>
 </div>



  </div>
    <div className="col-lg-1"></div>
    <div style={{backgroundColor:"black"}} className="col-lg-4 g1 ">

<div style={{width:"100%"}} className='pt-3 '>
<Form  action="">
  <div style={{flexDirection:"column"}} className='p-5 y1  d-flex '>
  <FormLabel className='fw-bolder ms-5 text-white'>Movie Name</FormLabel>
<input className='ms-5 g1'  type="text" placeholder='Movie Name' 
value={inputs.moviename} 
onChange={e=>setInputs({...inputs,moviename:e.target.value})}
/>

<FormLabel className='fw-bolder ms-5 mt-2 text-white'>Booking Date</FormLabel>
<input className='ms-5 g1'  type="date" placeholder='dd/mm/yy' 
value={inputs.bookingDate} 
onChange={e=>setInputs({...inputs,bookingDate:e.target.value})}
/>
<FormLabel className='fw-bolder ms-5 mt-2 text-white'>Select seat</FormLabel>
<input className='ms-5  g1'  type="number" placeholder='seat number' 
value={inputs.seatNumber} 
onChange={e=>setInputs({...inputs,seatNumber:e.target.value})}


/>
<FormLabel className='fw-bolder ms-5 mt-2 text-white'>Select Show Time</FormLabel>
<div className=' ms-5 mt-1 border'>
<Form.Select aria-label="Select Show Time"        value={inputs.showTime} 
onChange={e=>setInputs({...inputs,showTime:e.target.value})}
 >
                  <option value="11.00 Am">11 Am</option>
                  <option value="3.00 Pm">  3 Pm</option>
                  <option value="6.00 Pm "> 6 Pm</option>
                  <option value="9.00 Pm "> 9 Pm</option>

                </Form.Select>
  
</div>
<div className='ms-5 mt-3 text-center'>
<Button onClick={handleBooking}  variant="danger">Book Now</Button>{' '}
</div>
  </div>
  
</Form>
<div>
</div>


</div>
<div>
<Link  to={'/userdashboard'} className='btn btn-danger container mb-2'  variant="danger">Click to view your Bookings <i class="fa-solid fa-right-long fa-beat-fade ms-2"></i></Link>{' '}

</div>

    
    </div>
<div>
  <Link to={'/movies'} className='btn  btn-danger'><i class="fa-solid fa-left-long fa-beat-fade ms-2"></i> Back</Link>
</div>

  </div>
</div>
</div>






<ToastContainer autoClose={3000}  />


</>  
)
}

export default Booking