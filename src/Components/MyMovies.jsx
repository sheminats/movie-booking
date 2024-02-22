import React, { useContext, useEffect, useState } from 'react'
import Add from '../Components/Add'
import { deleteMovieAPI, getAdminMovieAPI } from '../services/allAPI'
import { addResponseContext } from '../Context/ContextShare';

function MyMovies() {
  const{addResponse,setAddResponse}=useContext(addResponseContext)

  const[adminMovies,setAdminMovies]=useState([])


  const getAdminMovies=async()=>{
    try { 
      const token= sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
  
        const result=await getAdminMovieAPI(reqHeader)
       
          if(result.status===200){
            setAdminMovies(result.data);
            // setAddResponse(result.data)

          }
        }
      }  catch(err){
          console.log(err);
        }
        };
        
        
  console.log(adminMovies);





  useEffect(()=>{
    getAdminMovies()
  },[addResponse])
  

  const handleDeleteMovie=async(id)=>{
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      
        try{
          const result=await deleteMovieAPI(id,reqHeader)
          if(result.status==200){
            getAdminMovies()
          }else{
            console.log(result);
          }
        }catch(err){
          console.log(err);
        }
      
    }
  }
  










  return (
    <div style={{backgroundColor:"black"}} className='f1 rounded p-2 mt-4 '>
      <div className="d-flex justify-content-between">
        <h2 style={{color:"red"}}className=' fw-bolder fs-3'>My Movies</h2>
        <Add/>
      </div>
      <div className="mt-4">
        {adminMovies.length>0?adminMovies.map((movie,index)=>(
        <div key={index} className="f1 rounded d-flex justify-content-between align-items-center mb-3 p-2">
        <h5 className='text-white'>{movie?.title}</h5>
        <div className="icons d-flex align-items-center">
          <button onClick={()=>handleDeleteMovie(movie._id)} className="btn btn-link ms-2 "><i style={{height:"34px",color:"red"}} className="fa-solid fa-trash fa-2x"></i></button>
        </div>
        </div>

        )):        <div className='fw-bolder text-danger fs-4'>
        Nothing to display!!!!
              </div>
}
        </div>
    </div>
  )
}

export default MyMovies