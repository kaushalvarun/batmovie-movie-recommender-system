import pickle,gzip
def load_similarity_matrix():
    try:
        print("Attempting to load the similarity matrix...")
        with gzip.open('similarity_matrix.pkl.gz', 'rb') as f:
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
