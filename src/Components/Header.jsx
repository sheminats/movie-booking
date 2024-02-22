import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import {Badge} from 'react-bootstrap'



function Header() {
  const [loginStatus,setLoginStatus]=useState(false)
  const [loginStatuss,setLoginStatuss]=useState(false)


  const navigate=useNavigate()

  const handleLogout=()=>{
    sessionStorage.clear()
    setLoginStatus(false)
navigate('/home')
  }

  useEffect(()=>{
  
  if(sessionStorage.getItem("token")){
    setLoginStatus(true)

  }else{
    setLoginStatus(false)

  }
  },[])

//   const handleAdminLogout=()=>{
//     sessionStorage.clear()
//     setLoginStatuss(false)
// navigate('/')
//   }


  return (
    <div className='q1'>
                 <Navbar style={{zIndex:1}} expand="lg" className="q1 w-100 position-fixed top-0">
      <Container>
            <Navbar.Brand className='r1'> <Link  className='text-white fw-bolder ' style={{textDecoration:'none'}} href="/home"><i class="fa-solid fa-clapperboard fa-bounce " style={{color: "red"}}></i> ShowTime</Link></Navbar.Brand>
    
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
{  loginStatus?  <Nav className="ms-auto">
{/* <Nav.Link> <Link to={'/userdashboard'} style={{textDecoration:"none",color:"white",}}><i className='fa-solid fa-user-tie text-danger'></i> User <Badge className='bg-black text-white '></Badge></Link></Nav.Link> */}

            <Nav.Link   ><Link  onClick={handleLogout}  to={'/home'}    style={{textDecoration:"none",color:"white"}}> <i class="fa-regular fa-face-laugh-wink text-danger"></i>Logout <Badge className='bg-black text-white '></Badge></Link></Nav.Link>

          </Nav>:
                           <Nav className="ms-auto">

                    <Nav.Link><input  style={{width:"300px",marginRight:"200px",}}placeholder='Search Movies..' type='text'className='rounded ms-4 container'></input></Nav.Link>
                               
                    <Nav.Link ><Link to={'/movies'} style={{textDecoration:"none",color:"white"}}> <i className='fa-solid fa-video text-danger'></i> Movies <Badge className='bg-black text-white '></Badge></Link></Nav.Link>
                                <Nav.Link> <Link to={'/admin'} style={{textDecoration:"none",color:"white",}}><i className='fa-solid fa-user-tie text-danger'></i> Admin <Badge className='bg-black text-white '></Badge></Link></Nav.Link>
                                <Nav.Link ><Link to={'/login'} style={{textDecoration:"none",color:"white"}}> <i class="fa-regular fa-face-laugh-wink text-danger"></i> User <Badge className='bg-black text-white '></Badge></Link></Nav.Link>
                              </Nav>

}                    
     </Navbar.Collapse>
      </Container>
    </Navbar>

    </div>
  )
}

export default Header