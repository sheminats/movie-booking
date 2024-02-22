import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Header from '../Components/Header';
import sign from '../assets/sign.png'
import register from '../assets/register.png'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import Spinner from 'react-bootstrap/Spinner';





function Auth({insideRegister}) {

  const navigate=useNavigate()
  const [loginStatus,setLoginStatus]=useState(false)


  const [userInputData,setUserInputData]=useState({
    username:"",email:"",password:""
  })
  console.log(userInputData);



  const handleRegister=async (e)=>{
    e.preventDefault()
    // console.log(userInputData);
    const {username,email,password}=userInputData
    if(!username||!email||!password){
      toast.error("Please fill the form completely",{
        theme:"colored"
      })
    }else{
      // toast.success("Proceed to register api")
try{         
const result=await registerAPI(userInputData)
console.log(result);
if(result.status===200){
  toast.success(`Welcome ${result.data.username}...Please Login to explore our site..!!`,{
    theme:"dark"
  })
  setUserInputData({username:"",email:"",password:""})
  //navigate to login
  setTimeout(()=>{
    navigate("/login")

  },2000)
}else{
  toast.error(result.response.data)
}
}catch(err){
console.log(err);
}
    }
  }


  const handleLogin=async (e)=>{
    e.preventDefault()
    // console.log(userInputData);
    const {email,password}=userInputData
    if(!email||!password){
      toast.error("Please fill the form completely",{
        theme:"colored"
      })
    }else{
try{         
const result=await loginAPI(userInputData)
console.log(result);
if(result.status===200){
  //store username,token in session storage
sessionStorage.setItem("username",result.data.existingUser.username)
sessionStorage.setItem("token",result.data.token)
//store total details of user
sessionStorage.setItem("userDetails",JSON.stringify(result.data.existingUser))
sessionStorage.setItem("movieDetails", JSON.stringify(result.data.existingMovie))


setLoginStatus(true)
  //navigate to landing page

  setTimeout(()=>{
    setUserInputData({email:"",password:""})

    navigate("/")

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
    <Header/>
    <div style={{width:"100%",height:"100vh",marginBottom:"20px"}} className='d-flex justify-content-center align-items-center '>
    <div className="container w-75">
      <Link to='/'  style={{textDecoration:"none",color:"red"}}><i className='fa-solid fa-arrow-left'></i> Back to Home</Link>
      <div className="card shadow p-5 x1 mt-3" style={{backgroundColor:"black"}}>
        <div className="row align-items-center">
{ insideRegister?  
 <div className="col-lg-6">
 <img className='w-75' src={register} alt="authentication" />
</div>:

 <div className="col-lg-6">
            <img className='w-75' src={sign} alt="authentication" />
          </div>
}         
 <div className="col-lg-6">
            <h1  className='fw-bolder text-white mt-3 j1 fs-3'>
              <i class="fa-solid fa-clapperboard fa-fade" style={{color: "red"}}></i> ShowTime
            </h1>
            <h5 className='fw-bolder fs-5 mt-4 text-light'>Sign {insideRegister?"Up":"In"} To Your Account</h5>
            <Form>
                  {
                insideRegister&&
                <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control className='mt-2' type="text" placeholder="Enter Name" value={userInputData.username} onChange={e=>setUserInputData({...userInputData,username:e.target.value})}/>
              </Form.Group>
        
              }
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control className='mt-2' type="email" placeholder="Enter email" value={userInputData.email}  onChange={e=>setUserInputData({...userInputData,email:e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPswd">
        <Form.Control className='mt-1' type="password" placeholder="Enter password"value={userInputData.password} onChange={e=>setUserInputData({...userInputData,password:e.target.value})} />
      </Form.Group>

    </Form>

               

{
      insideRegister?
      <div>
        <button onClick={handleRegister}  className='btn btn-danger mb-2'>Register</button>
        <p className='text-light'>Already have Account? Click here to <Link style={{color:"red"}}  to="/login">Login </Link></p>
        </div>:
              <div>
              <button  onClick={handleLogin}  className='btn btn-danger mb-2'>Login {loginStatus&& <Spinner animation="border" variant="light" />} </button>
              <p className='text-light'>New User? Click here to <Link style={{color:"red"}} to="/register">Register</Link></p>
              </div>
      

    }

          </div>
        </div>
      </div>
    </div>
    
    </div>
    <ToastContainer autoClose={3000}  />
    </>
  )
}

export default Auth