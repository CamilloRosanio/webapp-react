// UTILITY
import { Link } from 'react-router';


// IMPORT COMPONENTS
import { voteToStars } from '../assets/utility_functions/voteToStars';


// COMPONENT EXPORT

export default function MovieDetailsSection({ movie, showReviewForm }) {
    return <>
        <h1>Movie details</h1>

        <div className='movieDetails'>

            {/* DETAILS IMAGE */}
            <div className='movieDetailsImageContainer'>
                <img src={`${movie.image}`} alt='' className='movieDetailsImage' />
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
                    <button className='button' onClick={showReviewForm}>Leave review</button>

                    <Link to='/' className='link'>
                        <button className='button secondary'>Back to List</button>
                    </Link>
                </div>

            </div>
        </div>
    </>
}