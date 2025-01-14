// UTILITY
import { useState, useEffect } from 'react';
import { Link } from "react-router";


// ENV IMPORTS
const apiUrlRoot = import.meta.env.VITE_APIURL;
const apiSubPath = import.meta.env.VITE_APISUBPATH;


// IMPORT COMPONENTS
import Card from '../components/Card';


// COMPONENT EXPORT

export default function HomePage() {

    // USE-STATE DATA
    const [movies, setMovies] = useState({ movies: [] });
    const [genres, setGenres] = useState([]);
    const [filterTitle, setFilterTitle] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    // FILTER VALUES HANDLERS
    const handleFilterTitleChange = (event) => {
        setFilterTitle(event.target.value);
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
        console.log(selectedGenre);
    };

    // SEARCH BUTTON
    const handleSearchButtonClick = () => {
        ajaxIndex();
        setFilterTitle('');
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
                setGenres([...new Set(data.movies.flatMap(movie => movie.genre))]);
                console.log(data);

                console.log('AJAX INDEX request: at ' + apiUrlRoot + apiSubPath + '/?title=' + filterTitle + '&genre=' + selectedGenre);
            })
            .catch((error) => {
                console.log('Error while fetching content')
            })
    };

    return <>
        <div className="container">
            <h1>Movies</h1>

            {/* FILTERS CONTROL */}
            <div className='filterControl'>
                <div className='filters'>

                    {/* FILTER TITLE */}
                    <input type="text" className='input' placeholder='Filter by title' value={filterTitle} onChange={handleFilterTitleChange} />

                    {/* FILTER GENRE */}
                    <select value={selectedGenre} onChange={handleGenreChange} className='input'>
                        <option value="">Select Genre</option>
                        {genres.map((genre, index) => (
                            <option key={index} value={genre}>{genre}</option>
                        ))}
                    </select>

                </div>

                <div className='filters'>
                    <button className='button' onClick={() => clearFilters()}>Clear filters</button>
                    <button className='button' onClick={() => handleSearchButtonClick()}>Search</button>
                </div>
            </div>

            {/* MOVIES LIST */}
            <div className='resultsSection'>

                {/* CARDS */}
                {movies?.movies.map(movie =>
                    <Card
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