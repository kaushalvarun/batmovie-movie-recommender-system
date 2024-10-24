import React, { useState } from "react";
import "./MovieDropdown.css"

const MovieDropdown = ({ movies, getRecommendations }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    // Handle input change
    const handleInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        
        // Filter the movies
        const filtered = movies.filter((movie) =>
            movie.toLowerCase().includes(term.toLowerCase())
        );

        setFilteredMovies(filtered);
        // Reset the highlighted index after each search
        setHighlightedIndex(0); 
    };

    // Handle key navigation
    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setHighlightedIndex((prevIndex) =>
                Math.min(prevIndex + 1, filteredMovies.length - 1)
            );
        } else if (e.key === "ArrowUp") {
            setHighlightedIndex((prevIndex) =>
                Math.max(prevIndex - 1, 0)
            );
        } else if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission on Enter
            if (filteredMovies.length > 0) {
                const selectedMovie = filteredMovies[highlightedIndex];
                setSearchTerm(selectedMovie); // Update input field
                getRecommendations(selectedMovie); // Send selected movie to parent
                setFilteredMovies([]); // Clear the dropdown after selection
            }
        }
    };

    // Handle movie click (mouse selection)
    const handleMovieClick = (movie) => {
        setSearchTerm(movie); // Set selected movie in input
        getRecommendations(movie); // Send selected movie to parent
        setFilteredMovies([]); // Clear the dropdown
    };

    return (
            <form onSubmit={(e) => e.preventDefault()}>
                {/* Search bar */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="search-bar"
                    name="movie"
                    id="movie"
                    placeholder="Search for a movie..."
                    autoComplete="off"
                />
                {/* Filtered movie list */}
                {filteredMovies.length > 0 && (
                    <ul className="dropdown">
                        {filteredMovies.slice(0, 10).map((movie, index) => (
                            <li
                                key={index}
                                className={
                                    index === highlightedIndex ? "highlighted" : ""
                                }
                                onClick={() => handleMovieClick(movie)}
                            >
                                {movie}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
    );
};

export default MovieDropdown;
