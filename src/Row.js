import React , { useEffect, useState} from 'react'
import axios from './axios';
import "./Row.css"
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
const Row = ({title,fetchUrl,isLargeRow}) => {

    const base_Url = "https://image.tmdb.org/t/p/original/";

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(()=>{
        async function fetchData () {
            const request = await axios.get(fetchUrl);
            // console.log(request);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);

    const handleclick = (movie) => {
        // alert("Ok");
            if(trailerUrl){
                setTrailerUrl("");
            }
            else {
                    movieTrailer(movie?.name || "")
                    .then((url)=>{
                        const urlParams = new URLSearchParams(new URL(url).search);
                        setTrailerUrl(urlParams.get("v"));
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
            }
    }

    const opt = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay:1,
        }
    };

    // console.table(movies);
    return (
        <div className = "row">
           <h2> {title} </h2>
            <div className = "row__posters">
                {
                    movies.map(movie =>{
                        return(
                        <img 
                        onClick={handleclick(movie)}
                        className={`row__poster ${isLargeRow && "row_posterLarge"}`}  
                        key={movie.id}
                        src={`${base_Url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}/>
                    )})
                }
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opt} />}
        </div>
    )
}
export default Row;