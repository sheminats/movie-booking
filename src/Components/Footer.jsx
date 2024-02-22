import React from 'react'
import { Row , Col, Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'




function Footer() {
  return (
    <div className='q1 w-100 'style={{marginTop:"100px"}}>
    <Container >
        <Container className='p-3 text-white text-center '>
    <Navbar.Brand className='r1 '> <Link to={'/'} className='text-white fw-bolder  ' style={{textDecoration:'none'}} href="#home"><i class="fa-solid fa-clapperboard fa-bounce " style={{color: "red"}}></i> ShowTime</Link></Navbar.Brand>
    <hr />

    </Container>
      <Row className='w-100 container'>
       <Col lg={3} md={3} >
       <Navbar className="bg-body-black ">
       <Container>
       </Container>
     </Navbar>
     <Col lg={6} md={3}>
    <p className='text-white'>Book movie tickets for your favourite movies from your home, office or while travelling. </p>
</Col>

       </Col>



       <Col  lg={3} md={3} style={{fontFamily:'Playfair Display'}}>
       <h4 className='text-black' >Link</h4>
       <a href="home" className='text-white' style={{textDecoration:'none'}} >Home</a><br />
       <a href="projects" className='text-white' style={{textDecoration:'none'}}>Projects</a><br />
       <a href="dashboard" className='text-white' style={{textDecoration:'none'}}>DashBoard</a><br />
       </Col>


       <Col lg={3} md={3}>
       <h4 className='text-black'>Guides</h4>
       <h6 className='text-white'>react</h6>
       <h6 className='text-white'>react bootstrap</h6>
       <h6 className='text-white'>routing</h6>
       </Col>


       <Col lg={3} md={3}>
       <h4 className='text-black'>Contact Us</h4>
       <input className='w-100 p-1' type="text" name="" id="" placeholder='enter email' /><br /><br />
       <button className='bg-danger text-white w-100 p-1 mb-1'>Send</button>
       <div >
         <i style={{ marginLeft: '3rem' }} class="fa-brands fa-instagram text-white"></i>
         <i  style={{ marginLeft: '3rem' }} class="fa-brands fa-facebook text-white"></i>
         <i style={{ marginLeft: '3rem' }}class="fa-brands fa-twitter text-white"></i>
         <i style={{ marginLeft: '3rem' }}class="fa-brands fa-github text-white"></i>
       </div>

       
       </Col>


      </Row>
    </Container>


   </div>

  )
}

export default Footer