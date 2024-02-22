import React, { useContext } from 'react'
import { Modal,Card, Col, Row} from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SERVER_URL from '../services/serverUrl';
import { movieContext } from '../Context/MovieShare';


function MovieCard({movie}) {
  const [show, setShow] = useState(false);
  const{setMovies}=useContext(movieContext)

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setMovies(movie);
  }
const id=movie._id
  return (
    <>

<Card className="shadow mb-5 btn"style={{ width: '18rem' }} onClick={handleShow}>
      <Card.Img height={'200px'} variant="top" src={`${SERVER_URL}/uploadss/${movie?.movieImage}`} />
      <Card.Body>
        <Card.Title className='card'>{movie?.title}</Card.Title>
        <Link to={`/booking/${movie?.id}`} className='fw-bolder ' style={{textDecoration:"none",color:"red"}}>Book</Link>

      </Card.Body>
    </Card>
    
    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='fw-bolder'>Movie Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <img className='img-fluid' src={`${SERVER_URL}/uploadss/${movie?.movieImage}`} alt="movie image" />
            </Col >
            <Col  sm={12} md={6}>
<h2 className='fw-bolder 'style={{color:"red"}}>{movie?.title}</h2>
<p>Description: <span className='fw-bolder'>{movie?.description}
</span></p>

<p>Starrer: <span className='fw-bolder'>{movie?.starrer}
</span></p>
<p>Genre: <span className='fw-bolder'>{movie?.genre}
</span></p>


<p>Release Date: <span className='fw-bolder'>{movie?.releaseDate}
</span></p>
<p>Language : <span className='fw-bolder text-danger'>{movie?.language}</span></p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default MovieCard