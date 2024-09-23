from flask import Flask, render_template, request
import pickle
import pandas as pd
import requests
import os
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv('API_KEY')
app = Flask(__name__)

# Load movie dictionary
with open('english_movies_dict.pkl', 'rb') as file:
    movies_dict = pickle.load(file)

# Load similarity matrix 
with open('similarity_matrix.pkl', 'rb') as file:
    similarity = pickle.load(file)

movies = pd.DataFrame(movies_dict)

@app.route('/')
def home():
    return render_template('index.html', movies=movies['title'].tolist())

@app.route('/recommend', methods=['POST'])
def recommend():
    selected_movie = request.form.get('movie')
    
    # Fetch the recommended movies and movie IDs
    recommended_movies, recommended_movie_posters = get_recommend_movies(selected_movie)
    
    # Combine the movies and their IDs into tuples
    recommendations = list(zip(recommended_movie_posters, recommended_movies))

    # Pass the recommendations to the template
    return render_template('index.html', movies=movies['title'].tolist(), recommendations=recommendations)

def get_recommend_movies(movie):
    # Check if the movie exists in the dataset
    if movie not in movies['title'].values:
        print("Sorry! Movie not found in the database, please search for different movie or try alternate spelling.")
        return []
    
    # Get index of the movie from the dataframe
    movie_index = movies[movies['title'] == movie].index[0]
    # Get similarity of that movie to every other movie
    similarity_matrix_for_this_movie = list(enumerate(similarity[movie_index]))
    
    # Get list of 10 similar movies
    similar_movie_list = sorted(similarity_matrix_for_this_movie, key=lambda x: x[1], reverse=True)[1:6]
    
    recommended_movies = []
    recommended_movie_posters = []
    # Print similar movie list
    for i in range(len(similar_movie_list)):
            similar_movie_index = similar_movie_list[i]
            movie_title = movies.iloc[similar_movie_index[0]]['title'] 
            movie_id = movies.iloc[similar_movie_index[0]]['movie_id'] 
            recommended_movies.append(movie_title)
            recommended_movie_posters.append(fetch_movie_poster(movie_id))
    return recommended_movies, recommended_movie_posters

def fetch_movie_poster(movie_id):
    response = requests.get("https://api.themoviedb.org/3/movie/{}?api_key={}".format(movie_id, api_key))
    movie_poster_path = "https://image.tmdb.org/t/p/original/" +  response.json()['poster_path']
    return movie_poster_path


if __name__ == '__main__':
    app.run(debug=True)
