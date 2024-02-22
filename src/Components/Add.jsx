import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import upload from '../assets/upload.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addMovieAPI } from '../services/allAPI';
import { addResponseContext } from '../Context/ContextShare';




function Add() {
  const{addResponse,setAddResponse}=useContext(addResponseContext)

const [movieData, setMovieData] = useState({
  title: "",
  description: "",
  starrer:"",
  genre:"",
  releaseDate: "",
  language: "",
  movieImage: null 
});

const [imageFileStatus, setImageFileStatus] = useState(false);
const [preview, setPreview] = useState(""); // URL
    console.log(movieData);
    const [show, setShow] = useState(false);

const handleClose = () => {
  setShow(false);
  setMovieData({
    title: "",
    description: "",
    starrer:"",
    genre:"",
    releaseDate: "",
    language: "",
    movieImage: "" // Reset to null
  });
  setPreview(upload); // Reset preview URL
};

const handleShow = () => setShow(true);

useEffect(() => {
  
  if (movieData.movieImage && (movieData.movieImage.type === "image/png" || movieData.movieImage.type === "image/jpg" || movieData.movieImage.type === "image/jpeg")) {
    setImageFileStatus(true);
    setPreview(URL.createObjectURL(movieData.movieImage));
  } else {
    setPreview("");
    setMovieData({...movieData,movieImage:""})

    setImageFileStatus(false);
  }
}, [movieData.movieImage]);

const handleMovieUpload = async () => {
  const { title, description,starrer,genre, releaseDate, language, movieImage } = movieData;
  if (!title || !description  ||!starrer|| !genre||!releaseDate || !language || !movieImage) {
    toast.error("Please fill the form completely");
  } else {
    const reqBody = new FormData();
    reqBody.append("title", title);
    reqBody.append("description", description);
    reqBody.append("starrer", starrer); 
    reqBody.append("genre", genre); 
 reqBody.append("releaseDate", releaseDate);
    reqBody.append("language", language);
    reqBody.append("movieImage", movieImage);

    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type":"multipart/form-data",
 "Authorization": `Bearer ${token}`
      };
      try {
        const result = await addMovieAPI(reqBody, reqHeader);
        if (result.status === 200) {
          setAddResponse(result.data)

          handleClose();
        } else {
          toast.warning(result.response.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
};
   
        
        
      
    

  return (
   <>
       <button onClick={handleShow} style={{textDecoration:"none"}} className="btn btn-link text-light d-flex align-items-center fw-bolder ms-auto"><i style={{height:"34px"}} className="fa-solid fa-plus fa-2x  text-danger"></i>Add Movie</button>
    <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton style={{backgroundColor:"black"}}>
          <Modal.Title className='fw-bolder' style={{color:"red"}}>Movie Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4">
<label className='w-100 d-flex align-items-center flex-column'>
  <input type="file"style={{display:"none"}} 
   onChange={e=>setMovieData({...movieData,movieImage:e.target.files[0]})}/>
  <img height={'200px'} width={'200px'} className='' src={preview?preview:upload} alt="project upload pic" />
</label>
{!imageFileStatus&&<div className="text-danger ">
  *Upload only the following file types (jpg,jpeg,png) only*
</div>
}           </div>
            <div className="col-lg-8">
              <div className="mb-4">
                <input type="text" className="g1 rounded p-2 w-100"placeholder='Movie Title' value={movieData.title} 
                onChange={e=>setMovieData({...movieData,title:e.target.value})}
                />
              </div>
              <div className="mb-4">
                <input type="text" className="g1 rounded p-2 w-100"placeholder='Description '
                value={movieData.description} 
                onChange={e=>setMovieData({...movieData,description:e.target.value})}
                                />
 </div>
 <div className="mb-4">
                <input type="text" className="g1 rounded p-2 w-100"placeholder='Starrer '
                value={movieData.starrer} 
                onChange={e=>setMovieData({...movieData,starrer:e.target.value})}
                                />
 </div>
 <div className="mb-4">
                <input type="text" className="g1 rounded p-2 w-100"placeholder='Genre '
                value={movieData.genre} 
                onChange={e=>setMovieData({...movieData,genre:e.target.value})}
                                />
 </div>


  <div className="mb-4">
                <input type="date" className="g1 rounded p-2 w-100"placeholder='Release Date' 
                value={movieData.releaseDate} 
                onChange={e=>setMovieData({...movieData,releaseDate:e.target.value})}
                                 />

              </div>
              <div className="mb-3">
                <input type="text" className="g1 rounded p-2 w-100"placeholder='Language' 
                           value={movieData.language} 
                           onChange={e=>setMovieData({...movieData,language:e.target.value})}    
                               />

              </div>




            </div>
          </div>
        </Modal.Body>
        <Modal.Footer >
          <Button  variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleMovieUpload} variant="danger">save</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer autoClose={3000}  />

   
   </>
  )
}

export default Add