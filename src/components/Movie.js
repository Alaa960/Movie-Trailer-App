import axios from 'axios'
import React, {useEffect, useState} from 'react'
import MovieCard from './MovieCard'
function Movie() {
    const [movies ,setMovies] = useState([])
    const [selectedMovie , setSelectedMovie] = useState({})
    const [searchKey ,setSearchKey] = useState("")
    const API_URL  = "https://api.themoviedb.org/3"
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original/"
    const fetchMovies = async  (searchKey)=> {
        const type =    searchKey ? "search" : "discover"
        const {data : {results}} =  await axios.get(`${API_URL}/${type}/movie?api_key=56d2e7cee4771982b50751c8bc6bdf4a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,{
            params : {
                query : searchKey
            }
        })
        setSelectedMovie(results[0])
        setMovies(results)
    }
    const fetchMovie = () => {
        const {data} =  axios.get('https://api.themoviedb.org/3/movie/157336?api_key=56d2e7cee4771982b50751c8bc6bdf4a&append_to_response=videos,images')
        console.log(data)
    }
    const selectMovie = (movie) => {
        const data = fetchMovie(movie.id)
        console.log(data)
        setSelectedMovie(movie)
    }
    useEffect(()=> {
        fetchMovies()
    },[])

    const renderMovie = ()=> (
        movies.map(movie => (
            <MovieCard
            key={movie.id}
            movie={movie}
            selectedMovie={selectMovie}
            />
        ))
    )
    const searchMovies = (e) => {
        e.preventDefault()
        fetchMovies(searchKey)
    }
    return (
    <div>
        <header className='header'>
        <div className={'header-content max-center'}>
        <h1>Movie App</h1>
        <form onSubmit={searchMovies}>
            <input className='search-input' placeholder='Search ....' type='text' onChange={(e) => setSearchKey(e.target.value)}/>
            <button type='submit' className='search-btn'>Search</button>
        </form>
        </div>
        </header>
        <div className='hero' style={{backgroundImage :`url('${IMAGE_PATH}${selectedMovie.backdrop_path}')`}}>
            <div className='hero-content max-center'>
                {console.log(selectedMovie)}
                <button className='button-play'>Play Trailer</button>
                <h1>{selectedMovie.title}</h1>
                {selectedMovie.overview ? <p>{selectedMovie.overview}</p> : null}
            </div>
        </div>
        <div className="container">
            {renderMovie()}
        </div>
    </div>
  )
}

export default Movie