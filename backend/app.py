from flask import Flask, render_template, send_from_directory, request, jsonify
from flask_cors import CORS
import pickle, gzip
import pandas as pd
import os
from dotenv import load_dotenv

# Access TMDB api key
load_dotenv()
api_key = os.getenv('API_KEY')

app = Flask(__name__, static_folder='../frontend/build', template_folder='../frontend/build')

# Allow all domains to access flask server (enablin frontend to access flask server)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load movie dictionary, similarity matrix
path = os.path.join(os.path.dirname(__file__), 'english_movies_dict.pkl')
with open(path, 'rb') as file:
    movies_dict = pickle.load(file)

# Load similarity matrix
def load_similarity_matrix():
    try:
        print("Attempting to load the similarity matrix...")
        path = os.path.join(os.path.dirname(__file__), 'similarity_matrix.pkl.gz')
        with gzip.open(path, 'rb') as f:
            loaded_similarity_matrix = pickle.load(f)
        print("Similarity matrix loaded successfully.")
        return loaded_similarity_matrix
    except FileNotFoundError:
        print("Error: The file 'similarity_matrix.pkl.gz' was not found.")
        return None
    except pickle.UnpicklingError:
        print("Error: The file could not be unpickled.")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        print(f"Error type: {type(e)}")
        return None
similarity = load_similarity_matrix()

movies = pd.DataFrame(movies_dict)

# Serve React app's frontend files
@app.route('/', defaults={'path':''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return render_template('index.html')
    
# API endpoint to get movie titles
@app.route('/movies', methods=['GET'])
def get_movies():
    return jsonify(movies = movies['title'].tolist())

# API endpoint for movie recommendations
@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    selected_movie = data.get('movie')
    print(f'Recieved:{selected_movie}')
    
    # Fetch the recommended movies and movie IDs
    try:
        recommended_movies, recommended_movie_posters = get_recommend_movies(selected_movie)
    except Exception as e:
        return jsonify({"Error": str(e)}), 500

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
    try:
        response = requests.get(f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}", timeout=timeout)
        
        # Check if the request was successful
        response.raise_for_status()  # Raises an HTTPError for bad responses (4xx or 5xx)

        # Attempt to retrieve the poster path
        data = response.json()
        movie_poster_path = data.get('poster_path')

        # Check if poster_path is available
        if movie_poster_path:
            movie_poster_url = "https://image.tmdb.org/t/p/original/" + movie_poster_path
            print(movie_poster_url)
            return movie_poster_url
        else:
            # If there's no poster_path, return a default image URL
            print("Poster path not found")
            return "https://i.ibb.co/sCpkHWh/default-movie.png"  

    except requests.exceptions.RequestException as e:
        # Handling request exceptions (network issues, timeout, etc.)
        print(f"Error fetching movie poster: {e}")
        return "https://i.ibb.co/sCpkHWh/default-movie.png" 
if __name__ == '__main__':
    app.run(host='0.0.0.0', port = os.getenv('PORT', 5001), debug=True)