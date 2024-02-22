import React, { createContext, useState } from 'react'
export const movieContext=createContext()

function MovieShare({children}) {
    const [movies, setMovies] = useState("");

  return (



<movieContext.Provider value={{movies,setMovies}}>
        {children}
    
</movieContext.Provider>    
  )
}

export default MovieShare