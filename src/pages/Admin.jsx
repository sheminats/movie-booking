import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import admin from '../assets/admin.png'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { loginAdminAPI } from '../services/allAPI';



function Admin() {


  const navigate=useNavigate()
  const [loginStatuss,setLoginStatuss]=useState(false)


  const [adminInputData,setAdminInputData]=useState({
    email:"",password:""
  })
  console.log(adminInputData);






const handleLogin=async (e)=>{
  e.preventDefault()
  // console.log(userInputData);
  const {email,password}=adminInputData
  if(!email||!password){
    toast.error("Please fill the form completely",{
      theme:"colored"
    })
  }else{
try{         
const result=await loginAdminAPI(adminInputData)
console.log(result);
if(result.status===200){
//store username,token,id in session storage
sessionStorage.setItem("email",result.data.existingAdmin.email)
sessionStorage.setItem("token",result.data.token)

//store total details of user
sessionStorage.setItem("adminDetails",JSON.stringify(result.data.existingAdmin))

setLoginStatuss(true)
//navigate to landing page

setTimeout(()=>{
  setAdminInputData({email:"",password:""})

  navigate("/admindashboard")

},2000)
}else{
toast.error(result.response.data,{
  theme:"colored"
})
}
}catch(err){
console.log(err);
}
  }
}












  return (
    <>
    <div style={{width:"100%",height:"100vh",marginBottom:"20px"}} className='d-flex justify-content-center align-items-center '>
    <div className="container w-75">
      <Link to='/'  style={{textDecoration:"none",color:"red"}}><i className='fa-solid fa-arrow-left'></i> Back to Home</Link>
      <div className="card shadow p-5 x1 mt-3" style={{backgroundColor:"black"}}>
        <div className="row align-items-center">

 <div className="col-lg-6">
            <img className='w-75' src={admin} alt="authentication" />
          </div>
 <div className="col-lg-6">
            <h1  className='fw-bolder text-white mt-3 j1 fs-3'>
            <i class="fa-solid fa-user-tie text-danger" ></i> Admin Panel
            </h1>
   <h3 style={{color:"red"}} className='fw-bolder fs-3 mt-4 '> Welcome... </h3>


 <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control className='mt-2' type="email" placeholder="Enter email"  
         value={adminInputData.email}  onChange={e=>setAdminInputData({...adminInputData,email:e.target.value})}
      />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPswd">
        <Form.Control className='mt-1' type="password" placeholder="Enter password"
         value={adminInputData.password}  onChange={e=>setAdminInputData({...adminInputData,password:e.target.value})}  
      />
      </Form.Group>

    </Form>

               

              <div>
              <button onClick={handleLogin}  className='btn btn-danger mb-2'>Login </button>
              </div>
      


          </div>
        </div>
      </div>
    </div>
    
    </div>
    <ToastContainer autoClose={3000}  />

    </>
  )
}

export default Admin