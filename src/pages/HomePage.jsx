// UTILITY
import { useState, useEffect } from 'react';
import { Link } from "react-router";


// ENV IMPORTS
const apiUrlRoot = import.meta.env.VITE_APIURL;
const apiSubPath = import.meta.env.VITE_APISUBPATH;


// IMPORT COMPONENTS
import { voteToStars } from '../assets/utility_functions/voteToStars';


// COMPONENT EXPORT

export default function HomePage() {

    // // USE-STATE DATA
    const [movies, setMovies] = useState({
        movies: [],
    });

    // INIT USE-EFFECT
    useEffect(() => {
        ajaxIndex();
    }, []);

    // AJAX REQUEST - INDEX
    const ajaxIndex = () => {
        fetch(apiUrlRoot + apiSubPath, {
            method: 'GET',
        })
            .then(res => res.json())
            .then((data) => {
                setMovies(data);
                // console.log(data);
                console.log('AJAX INDEX request: at ' + apiUrlRoot + apiSubPath);
            })
            .catch((error) => {
                console.log('Error while fetching content')
            })
    };

    return <>
        <div className="container">
            <h1 className="debug">Movies</h1>
            {movies?.movies.map(movie =>
                <p key={movie.id} className='debug'><Link to={"/" + movie.id}>{`ID: ${movie.id} - ${movie.title} - VOTE: ${voteToStars(movie.vote_avg)}`}</Link></p>
            )}
        </div>
    </>
}