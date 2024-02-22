import { commmonAPI } from "./commmonAPI"
import SERVER_URL from "./serverUrl"




//register API
export const registerAPI=async(user)=>{
 return await  commmonAPI("POST",`${SERVER_URL}/register`,user,"")
}


//login API
export const loginAPI=async(user)=>{
    return await  commmonAPI("POST",`${SERVER_URL}/login`,user,"")
   }
//admin login api
  export const loginAdminAPI=async(admin)=>{
    return await  commmonAPI("POST",`${SERVER_URL}/signup`,admin,"")
    }

//addMovieAPI

export const addMovieAPI=async(reqBody,reqHeader)=>{
  return await  commmonAPI("POST",`${SERVER_URL}/add-movie`,reqBody,reqHeader)
 }


 //get home movie

export const getHomeMovieAPI=async()=>{
  return await  commmonAPI("GET",`${SERVER_URL}/home-movie`,"","")
 }

  //get all movie

export const getAllMovieAPI=async(reqHeader)=>{
  return await  commmonAPI("GET",`${SERVER_URL}/all-movie`,"",reqHeader)
 }


   //get admin movie

export const getAdminMovieAPI=async(reqHeader)=>{
  return await  commmonAPI("GET",`${SERVER_URL}/admin-movie`,"",reqHeader)
 }


// export const getMovieDetails=async(reqHeader,id)=>{
//   return await commmonAPI("GET",`${SERVER_URL}/all-movie/${id}`,"",reqHeader)
// }
export const getMovieDetails = async ( id,reqHeader,) => {
  return await commmonAPI("DELETE",`${SERVER_URL}/all-movie/${id}`,{},reqHeader)
}


//delete movie
export const deleteMovieAPI=async(id,reqHeader)=>{                 //empty object for no body
  return await commmonAPI("DELETE",`${SERVER_URL}/remove-movie/${id}`,{},reqHeader)
}


//book movie
export const bookMovieAPI=async(id,reqBody,reqHeader)=>{                 
  return await commmonAPI("POST",`${SERVER_URL}/booking/${id}`,reqBody,reqHeader)
}

//user bookings
export const getUserBookingsAPI=async(reqHeader)=>{
  return await  commmonAPI("GET",`${SERVER_URL}/userbooking`,"",reqHeader)
 }
