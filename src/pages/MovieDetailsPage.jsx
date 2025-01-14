// UTILITY
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from "react-router";


// ENV IMPORTS
const apiUrlRoot = import.meta.env.VITE_APIURL;
const apiSubPath = import.meta.env.VITE_APISUBPATH;


// IMPORT COMPONENTS
import { voteToStars } from '../assets/utility_functions/voteToStars';


// COMPONENT EXPORT

export default function MovieDetailsPage() {

    // GET URL PARAMS
    const { id: id } = useParams();

    // USE-STATE DATA
    const [movie, setMovie] = useState({
        movieDetails: [],
    });

    // INIT USE-EFFECT
    useEffect(() => {
        ajaxShow();
    }, []);

    // AJAX REQUEST - INDEX
    const ajaxShow = () => {
        fetch(apiUrlRoot + apiSubPath + "/" + id, {
            method: 'GET',
        })
            .then(res => res.json())
            .then((data) => {
                setMovie(data);
                // console.log(data);
                console.log('AJAX SHOW request: at ' + apiUrlRoot + apiSubPath + "/" + id);
            })
            .catch((error) => {
                console.log('Error while fetching content')
            })
    };

    return <>
        <div className="container">
            {movie.id ?
                <div>
                    <h1 className="debug">Movie details</h1>
                    <div>
                        <p key={movie.id} className='debug'>{`ID: ${movie.id} - ${movie.title} - VOTE: ${voteToStars(movie.vote_avg)}`}</p>
                        <button className='debug'><Link to="/">Back to Home</Link></button>
                    </div>
                </div>
                :
                <h1 className="debug">No results</h1>}
        </div>
    </>
}