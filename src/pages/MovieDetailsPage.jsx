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
    const [movie, setMovie] = useState({ movieDetails: [] });
    const [hideForm, setHideForm] = useState(true);

    // INIT USE-EFFECT
    useEffect(() => {
        ajaxShow();
    }, []);

    // AJAX REQUEST - SHOW
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

    // HIDDEN REVIEW FORM
    const showReviewForm = () => {
        if (hideForm) setHideForm(false);
        const formElement = document.getElementById('reviewForm');
        formElement.scrollIntoView({ behavior: 'smooth' });
    }

    const hideReviewForm = () => {
        if (!hideForm) setHideForm(true);
        const formElement = document.getElementById('showMovie');
        showMovie.scrollIntoView({ behavior: 'smooth' });
    }

    // AJAX REQUEST - STORE
    const ajaxStore = () => {
        alert('Store review');
    }

    return <>
        <div className="container">
            {movie.id ?
                <div className='showMovie' id='showMovie'>
                    <h1>Movie details</h1>

                    {/* MOVIE DETAILS */}
                    <div className='movieDetails'>

                        {/* DETAILS IMAGE */}
                        <div className='movieDetailsImageContainer'>
                            <img src={`${movie.image}`} alt="" className='movieDetailsImage' />
                        </div>

                        {/* DETAILS CONTENT */}
                        <div className='movieDetailsContent'>
                            <div>
                                <h2>{movie.title}</h2>
                                <p className='cardStars'>{`${voteToStars(movie.vote_avg)}`}</p>
                                <p>• {movie.genre}</p>
                                <p>{movie.abstract}</p>
                            </div>

                            {/* BUTTONS */}
                            <div className='movieDetailsButtons'>
                                <button className='input' onClick={showReviewForm}>Leave review</button>

                                <Link to="/" className='link'>
                                    <button className='button'>Back to List</button>
                                </Link>
                            </div>

                        </div>
                    </div>

                    {/* REVIEW FORM */}
                    <div id='reviewForm'>
                        <div className={hideForm ? 'reviewFormContainer hidden' : 'reviewFormContainer'}>
                            ciao

                            <button className='button' onClick={hideReviewForm}>Close</button>
                        </div>
                    </div>

                    {/* REVIEWS */}
                    <h3>Reviews</h3>
                    <div className="reviewsContainer">
                        {movie.reviews.map((review) => (

                            <div key={review.id} className='review'>
                                <div className="reviewName">
                                    <h4>{review.name}</h4>
                                    <p className='cardStars'>{`${voteToStars(movie.vote_avg)}`}</p>
                                </div>
                                <p className='reviewText'>{`${review.text}..`}</p>
                            </div>

                        ))}
                    </div>
                </div>
                :
                <h1>{`Page not found :(`}</h1>}
        </div>
    </>
}