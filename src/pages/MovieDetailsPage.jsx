// UTILITY
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';


// ENV IMPORTS
const apiUrlRoot = import.meta.env.VITE_APIURL;
const apiSubPath = import.meta.env.VITE_APISUBPATH;


// IMPORT COMPONENTS
import MovieDetailsSection from '../components/MovieDetailsSection';
import ReviewsSection from '../components/ReviewsSection';
import ReviewsForm from '../components/ReviewsForm';


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
        fetch(apiUrlRoot + apiSubPath + '/' + id, {
            method: 'GET',
        })
            .then(res => res.json())
            .then((data) => {
                setMovie(data);
                console.log('AJAX SHOW request: at ' + apiUrlRoot + apiSubPath + '/' + id);
                console.log(data);
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
        const pageTop = document.getElementById('showMovie');
        pageTop.scrollIntoView({ behavior: 'smooth' });
    }


    return <>
        <div className='container'>
            {movie.id ?
                <div className='showMovie' id='showMovie'>

                    {/* MOVIE DETAILS */}
                    <MovieDetailsSection
                        movie={movie}
                        showReviewForm={showReviewForm}
                    />

                    {/* REVIEW FORM */}
                    <ReviewsForm
                        movie_id={movie.id}
                        hideForm={hideForm}
                        hideReviewForm={hideReviewForm}
                        ajaxShow={ajaxShow}
                    />

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