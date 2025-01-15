// UTILITY
import { Link } from 'react-router';


// IMPORT COMPONENTS
import { voteToStars } from '../assets/utility_functions/voteToStars';


// COMPONENT EXPORT

export default function MovieCard({ id, image, title, vote }) {
    return <>
        <Link to={'/' + id}>
            <div className='card' key={id}>

                {/* CARD IMAGE */}
                <div className='cardImageContainer'>
                    <img src={`${image}`} alt='' className='cardImage' />
                </div>

                {/* CARD CONTENT */}
                <div className='cardContent'>
                    <h3>{`${title}`}</h3>
                    <p className='cardStars'>{`${voteToStars(vote)}`}</p>
                </div>
            </div>
        </Link>
    </>
}