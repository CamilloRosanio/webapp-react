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
                <div className='showMovie'>
                    <h1>Movie details</h1>

                    <Link to="/" className='link'>
                        <button className='button'>Back to List</button>
                    </Link>

                    {/* MOVIE DETAILS */}
                    <div className='movieDetails'>

                        {/* DETAILS IMAGE */}
                        <div className='movieDetailsImageContainer'>
                            <img src={`${movie.image}`} alt="" className='movieDetailsImage' />
                        </div>

                        {/* DETAILS CONTENT */}
                        <div className='movieDetailsContent'>
                            <h2>{movie.title}</h2>
                            <p className='cardStars'>{`${voteToStars(movie.vote_avg)}`}</p>
                            <p>• {movie.genre}</p>
                            <p>{movie.abstract}</p>
                        </div>
                    </div>

                    {/* REVIEWS */}
                    <h3>Reviews</h3>
                    <div className="reviewsContainer">
                        {movie.reviews.map((review) => (

                            <div key={review.id} className='review'>
                                <h4>{review.name}</h4>
                                <p className='cardStars'>{`${voteToStars(movie.vote_avg)}`}</p>
                                <p>{review.text}</p>
                            </div>

                        ))}
                    </div>

                    <Link to="/" className='link'>
                        <button className='button bottom'>Back to List</button>
                    </Link>
                </div>
                :
                <h1>{`Page not found :(`}</h1>}
        </div>
    </>
}