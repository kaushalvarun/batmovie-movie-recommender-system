import React from "react";
import "./Body.css";

function Body() {
    return (
        <main className="body">
            <input type = "text" placeholder="Search for a movie..." className="search-bar"/>
            <div className="movie-cards">                
                <div className="card">Movie 1</div>
                <div className="card">Movie 2</div>
                <div className="card">Movie 3</div>
                <div className="card">Movie 4</div>
                <div className="card">Movie 5</div>
            </div>
        </main>
    );
}

export default Body;