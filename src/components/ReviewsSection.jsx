// IMPORT COMPONENTS
import { voteToStars } from '../assets/utility_functions/voteToStars';


// COMPONENT EXPORT

export default function ReviewsSection({ reviews, movie }) {
    return <>
        <h3>Reviews</h3>
        <div className='reviewsContainer'>
            {reviews.map((review) => (

                <div key={review.id} className='review'>
                    <div className='reviewName'>
                        <h4>{review.name}</h4>
                        <p className='cardStars'>{`${voteToStars(movie.vote_avg)}`}</p>
                    </div>
                    <p className='reviewText'>{review.text}</p>
                </div>

            ))}
        </div>
    </>
}