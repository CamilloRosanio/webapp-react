// UTILITY
import { useState, useEffect } from 'react';


// ENV IMPORTS
const apiUrlRoot = import.meta.env.VITE_APIURL;
const apiSubPath = import.meta.env.VITE_APISUBPATH;


// IMPORT COMPONENTS
import MovieCard from '../components/MovieCard';


// COMPONENT EXPORT

export default function HomePage() {

    // USE-STATE DATA
    const [movies, setMovies] = useState({ movies: [] });
    const [filterTitle, setFilterTitle] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');

    // FILTER VALUES HANDLERS
    const handleFilterTitleChange = (event) => {
        setFilterTitle(event.target.value);
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    // SEARCH BUTTON
    const handleSearchButtonClick = () => {
        ajaxIndex();
        setFilterTitle('');
        setSelectedGenre('');
    };

    // CLEAR FILTERS
    const clearFilters = () => {
        setFilterTitle('');
        setSelectedGenre('');
        ajaxIndex();
    };

    // INIT USE-EFFECT
    useEffect(() => {
        ajaxIndex();
    }, []);


    // AJAX REQUEST - INDEX
    const ajaxIndex = () => {
        fetch(apiUrlRoot + apiSubPath + '/?title=' + filterTitle + '&genre=' + selectedGenre, {
            method: 'GET',
        })
            .then(res => res.json())
            .then((data) => {
                setMovies(data);

                if (data.movies == 0) {
                    setMovies({ movies: ['No results'] });
                }

                if (genres.length === 0) {
                    setGenres([...new Set(data.movies.flatMap(movie => movie.genre))]);
                }

                console.log('AJAX INDEX request at: ' + apiUrlRoot + apiSubPath + '/?title=' + filterTitle + '&genre=' + selectedGenre);
                console.log(data);
            })
            .catch((error) => {
                console.log('Error while fetching content')
            })
    };

    return <>
        <div className='container'>
            <h1>Movies</h1>

            {/* FILTERS CONTROL */}
            <div className='filterControl'>
                <div className='filters fields'>

                    {/* FILTER TITLE */}
                    <input type='text' className='input' placeholder='Filter by title' value={filterTitle} onChange={handleFilterTitleChange} />

                    {/* FILTER GENRE */}
                    <select value={selectedGenre} onChange={handleGenreChange} className='input'>
                        <option value=''>Select genre</option>
                        {genres.map((genre, index) => (
                            <option key={index} value={genre}>{genre}</option>
                        ))}
                    </select>

                </div>

                <div className='filters buttons'>
                    <button className='button' onClick={() => clearFilters()}>Clear all</button>
                    <button className='button secondary' onClick={() => handleSearchButtonClick()}>Search</button>
                </div>
            </div>

            {/* MOVIES LIST */}
            <div className='resultsSection'>

                {/* CARDS */}
                {movies.movies[0] == 'No results' ?
                    <h3>{`No movies found :(`}</h3> :
                    movies?.movies.map(movie =>
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            image={movie.image}
                            title={movie.title}
                            vote={movie.vote_avg}
                        />
                    )}
            </div>
        </div>
    </>
}