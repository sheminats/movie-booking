import React from 'react'
import MyMovies from '../Components/MyMovies'
import Header from '../Components/Header'

function AdminDashboard() {
  return (
<>
<Header/>

<div style={{marginTop:"100px"}} className='container'>
<h1>Welcome <span style={{color:"red"}}>Admin</span></h1>:
<div className="row">
  <div className="col-lg-8">
    <MyMovies/>
  </div>
  <div className="col-lg-4">
  </div>
</div>
</div>

</> 



)
}

export default AdminDashboard