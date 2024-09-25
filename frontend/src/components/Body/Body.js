import React, { useState, useEffect } from "react";
import "./Body.css";

function Body() {
    // State to store movie titles from the backend
    const [movies, setMovies] = useState([]);
    // State for the selected movie
    const [selectedMovie, setSelectedMovie] = useState("");
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

        // Fetch movies from server
        fetch("http://localhost:5001/movies")
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset error message before fetching
        setErrorMessage("");

        // Set loading to true when fetching recommendations
        setLoading(true);

        try {
            // Request for recommended movies with input selected movie
            const response = await fetch("http://localhost:5001/recommend", {
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
            <form onSubmit={handleSubmit}>
                <select
                    className="search-bar"
                    name="movie"
                    id="movie"
                    value={selectedMovie}
                    onChange={(e) => setSelectedMovie(e.target.value)}
                >
                    <option value="">Select a movie...</option>
                    {movies.map((title, index) => (
                        <option key={index} value={title}>
                            {title}
                        </option>
                    ))}
                </select>
                <br />
                <button type="submit">Recommend</button>
            </form>

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
