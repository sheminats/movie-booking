import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { getUserBookingsAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';


function UserDashboard() {

  const [userName, setUserName] = useState("")

  useEffect(() => {

    if (sessionStorage.getItem("username")) {
      setUserName(sessionStorage.getItem("username"))
    } else {
      setUserName("")
    }
  }, [])

  const [allBookings, setAllBookings] = useState([])


  const getUserBookings = async () => {
    try {
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          // "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`
        }
        console.log(token);
        const result = await getUserBookingsAPI(reqHeader)
        console.log(result);
        if (result.status === 200) {
          setAllBookings(result.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(allBookings);

  useEffect(() => {
    getUserBookings()
  }, [])









  return (
    <>
      <Header />
      <div style={{ marginTop: "100px" }} className='container '>
      <div>
  <Link to={'/'} className='btn  btn-danger ms-3'><i class="fa-solid fa-left-long fa-beat-fade ms-2"></i> Back</Link>
</div>

        <h1 className='mt-5'>Welcome <span style={{ color: "red" }}>{userName.split(" ")[0]}</span></h1>
        <h3 className='text-danger text-center'>Bookings</h3>



        <Table className='g1 striped bordered hover'variant='dark' style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead style={{ backgroundColor: '#333', color: '#fff' }}>
            <tr>
              <th  style={{color:"red"}}>Movie Name</th>
              <th style={{color:"red"}}>Booking Date</th>
              <th style={{color:"red"}}>Seat Number</th>
              <th style={{color:"red"}}>Show Time</th>
            </tr>
          </thead>
          {allBookings.length > 0 && allBookings.map((bookings, index) => (
            <tbody bookings={bookings}>
              <tr key={index}>
                <td className='fw-bolder text-danger ' >{bookings?.moviename}</td>
                <td >{bookings?.bookingDate}</td>
                <td >{bookings?.seatNumber}</td>
                <td >{bookings?.showTime}</td>
              </tr>

            </tbody>

          ))}
        </Table>
      </div>
    </>
  )
}

export default UserDashboard