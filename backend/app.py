from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import requests
import os
from dotenv import load_dotenv

# Access TMDB api key
load_dotenv()
api_key = os.getenv('API_KEY')
app = Flask(__name__)

# Allow frontend to access flask server
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Load movie dictionary, similarity matrix
with open('english_movies_dict.pkl', 'rb') as file:
    movies_dict = pickle.load(file)

with open('similarity_matrix.pkl', 'rb') as file:
    similarity = pickle.load(file)

movies = pd.DataFrame(movies_dict)

@app.route('/')
def home():
    return render_template('index.html', movies=movies['title'].tolist())

@app.route('/movies', methods=['GET'])
def get_movies():
    return jsonify(movies = movies['title'].tolist())

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    selected_movie = data.get('movie')
    print('Recieved:' + selected_movie)
    
    # Fetch the recommended movies and movie IDs
    try:
        recommended_movies, recommended_movie_posters = get_recommend_movies(selected_movie)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    recommendations = list(zip(recommended_movie_posters, recommended_movies))
    
    return jsonify(recommendations=recommendations)

def get_recommend_movies(movie):
    # Check if the movie exists in the dataset
    if movie not in movies['title'].values:
        print("Movie not found")
        return [],[]
    
    # Get index of the movie from the dataframe
    movie_index = movies[movies['title'] == movie].index[0]

    # Get similarity of that movie to every other movie
    similarity_matrix_for_this_movie = list(enumerate(similarity[movie_index]))
    
    # Get list of 10 similar movies
    similar_movie_list = sorted(similarity_matrix_for_this_movie, key=lambda x: x[1], reverse=True)[1:6]
    
    recommended_movies = []
    recommended_movie_posters = []
    for i in range(len(similar_movie_list)):
            similar_movie_index = similar_movie_list[i]
            movie_title = movies.iloc[similar_movie_index[0]]['title'] 
            movie_id = movies.iloc[similar_movie_index[0]]['movie_id'] 
            recommended_movies.append(movie_title)
            recommended_movie_posters.append(fetch_movie_poster(movie_id))
    return recommended_movies, recommended_movie_posters

import requests

def fetch_movie_poster(movie_id, timeout=3):
    # print(movie_id)
    # try:
    #     response = requests.get(f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}", timeout=timeout)
        
    #     # Check if the request was successful
    #     response.raise_for_status()  # Raises an HTTPError for bad responses (4xx or 5xx)

    #     # Attempt to retrieve the poster path
    #     data = response.json()
    #     movie_poster_path = data.get('poster_path')

    #     # Check if poster_path is available
    #     if movie_poster_path:
    #         movie_poster_url = "https://image.tmdb.org/t/p/original/" + movie_poster_path
    #         print(movie_poster_url)
    #         return movie_poster_url
    #     else:
    #         # If there's no poster_path, return a safe image URL
    #         print("Poster path not found. Returning safe image URL.")
    #         return "https://i.ibb.co/sCpkHWh/default-movie.png"  

    # except requests.exceptions.RequestException as e:
    #     # Handle any request exceptions (network issues, timeout, etc.)
    #     print(f"Error fetching movie poster: {e}")
        return "https://i.ibb.co/sCpkHWh/default-movie.png" 

# for testing
@app.route("/message")
def test():
    return {"message":"Flask API endpoint"}

if __name__ == '__main__':
    app.run(port = 5001, debug=True)