import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Row ,Col} from 'react-bootstrap'
import MovieCard from '../Components/MovieCard'
import { getAllMovieAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'



function Movies() {
  const [allMovies, setAllMovies] = useState([])


  const getAllMovies = async () => {
    try {
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }

        const result = await getAllMovieAPI( reqHeader)

        if (result.status === 200) {
          // sessionStorage.setItem("id", result.data.id)

          sessionStorage.setItem("movieDetails",JSON.stringify(result.data.existingMovie))

          setAllMovies(result.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };


  // console.log(allMovies);

  useEffect(() => {
    getAllMovies()
  }, [])



  return (
    <>
    <Header/>
<div style={{marginTop:"150px"}} className=' mt-5 '>
<h1 style={{width:"30%",textAlign:"center",color:"red",marginTop:"70px"}} className='container  p-2   fw-bolder '>All Movies</h1>

</div>
<div>
  <Link to={'/'} className='btn  btn-danger ms-3'><i class="fa-solid fa-left-long fa-beat-fade ms-2"></i> Back</Link>
</div>

<Row className='mt-5 ms-4'>
  {allMovies.length>0?allMovies.map((movie,index)=>(
        <Col key={index} sm={6} md={4} lg={4}>
        <MovieCard  movie={movie}/>

      </Col>

  )): <div className='fw-bolder text-danger fs-4'>
  Nothing to display!!!!
</div>

}
      </Row>

    </>
  )
}

export default Movies