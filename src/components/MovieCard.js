/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

function MovieCard({movie , selectedMovie}) {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500/"
  console.log(movie)
  return (
    <div className='movie-card' onClick={()=>selectedMovie(movie)}>
      {movie.poster_path ? <img className='movie-cover' src={`${IMAGE_PATH}${movie.poster_path}`}/>
      : <div className='image-not-found'>Image Not Found</div>
      }
      <h5 className='movie-title'>{movie.title}</h5>
    </div>
  )
}

export default MovieCard