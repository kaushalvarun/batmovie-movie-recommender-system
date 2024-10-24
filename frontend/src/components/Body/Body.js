import React, { useState, useEffect } from "react";
import "./Body.css";
import MovieDropdown from "../MovieDropdown/MovieDropdown";

function Body() {
    // State to store movie titles from the backend
    const [movies, setMovies] = useState([]);
    
    // State to store recommendations
    const [recommendations, setRecommendations] = useState([]);
    // Error message if no movie found
    const [errorMessage, setErrorMessage] = useState("");
    // State to manage loading state
    const [loading, setLoading] = useState(false);

    // Fetch the list of movies from the backend
    useEffect(() => {
        // Loading set to true when fetching movies
        setLoading(true);
    
        // Making API request from backend URL
        fetch("https://batmovie-movie-recommender-system.onrender.com/movies")
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.movies);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            }).finally(() => setLoading(false));
        // Loading set to false
    }, []);

    // Handle form submission
    const getRecommendations = async (selectedMovie) => {
        // Reset error message before fetching
        setErrorMessage("");

        // Set loading to true when fetching recommendations
        setLoading(true);

        try {
            // API Request for recommended movies with input selected movie from backend
            const response = await fetch("https://batmovie-movie-recommender-system.onrender.com/recommend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Give selected movie as input in request
                body: JSON.stringify({ movie: selectedMovie }),
            });

            const data = await response.json();

            if (data.recommendations && data.recommendations.length > 0) {
                setRecommendations(data.recommendations);
            } else {
                setRecommendations([]);
                setErrorMessage("Sorry! Movie not found in the database, please try a different movie or alternate spelling.");
            }
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            setErrorMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="body">
            {/* Movie selection form */}
            <MovieDropdown 
                movies={movies}
                getRecommendations={(selMovie)=> getRecommendations(selMovie)}
            />

            {/* Loading sign */}
            {loading && <h3>Loading...</h3>}

            {/* Recommended movies */}
            {recommendations.length > 0 && (
                <div>
                    <h2>Recommended Movies:</h2>
                    <br/>
                    <div className="movie-cards">
                        {recommendations.map(([imageLink, movieTitle]) => (
                            <div className="card-box">
                                <div className="card" style={{ backgroundImage: `url(${imageLink})`}}>
                                </div>
                                <b style={{textAlign:"center"}}>{movieTitle}</b>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Display error message if no recommendations */}
            {errorMessage && <p>{errorMessage}</p>}
        </main>
    );
}

export default Body;
