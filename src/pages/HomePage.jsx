// UTILITY
import { useState, useEffect } from 'react';


// ENV IMPORTS
const apiUrlRoot = import.meta.env.VITE_APIURL;
const apiSubPath = import.meta.env.VITE_APISUBPATH;


// COMPONENT EXPORT

export default function HomePage() {

    // // USE-STATE DATA
    const [moviesList, setMoviesList] = useState({
        moviesList: [],
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
                setMoviesList(data);
                console.log(data);
                console.log('AJAX request: at ' + apiUrlRoot + apiSubPath);
            })
            .catch((error) => {
                console.log('Error while fetching content')
            })
    };

    return <>
        <div className="container">
            <h1 className="debug">Home</h1>
            {moviesList.movies.map(movie =>
                <p key={movie.id} className='debug'>{movie.title}</p>
            )}
        </div>
    </>
}