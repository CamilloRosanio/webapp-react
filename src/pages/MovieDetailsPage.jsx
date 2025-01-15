// UTILITY
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from "react-router";


// ENV IMPORTS
const apiUrlRoot = import.meta.env.VITE_APIURL;
const apiSubPath = import.meta.env.VITE_APISUBPATH;


// IMPORT COMPONENTS
import { voteToStars } from '../assets/utility_functions/voteToStars';
import MovieDetailsSection from '../components/MovieDetailsSection';
import ReviewsSection from '../components/ReviewsSection';


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

                    {/* MOVIE DETAILS */}
                    <MovieDetailsSection
                        movie={movie}
                        showReviewForm={showReviewForm}
                    />

                    {/* REVIEW FORM */}
                    <div id='reviewForm'>
                        <div className={hideForm ? 'reviewFormContainer hidden' : 'reviewFormContainer'}>
                            ciao

                            <button className='button' onClick={hideReviewForm}>Close</button>
                        </div>
                    </div>

                    {/* REVIEWS */}
                    <ReviewsSection
                        reviews={movie.reviews}
                        movie={movie}
                    />
                </div>
                :
                <h1>{`Page not found :(`}</h1>}
        </div>
    </>
}