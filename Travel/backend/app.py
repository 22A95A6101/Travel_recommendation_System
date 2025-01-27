from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from geopy.distance import great_circle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)  # This will allow all origins by default

# Load and prepare data
df = pd.read_csv('data/japan_travel.csv')
df['Latitude'] = df['Latitude'].astype(float)
df['Longitude'] = df['Longitude'].astype(float)
df['Reviews'] = pd.to_numeric(df['Reviews'], errors='coerce')
df = df.dropna(subset=['Type', 'Description', 'Reviews', 'Latitude', 'Longitude'])
df['Reviews'] = df['Reviews'].fillna(df['Reviews'].mean())
df['Description'] = df['Description'].fillna('')

@app.route('/', methods=['POST'])
def get_recommendations():
    data = request.form
    user_preference_type = data['type'].strip().lower()
    user_lat = float(data['lat'].strip())
    user_lon = float(data['lon'].strip())
    min_rating = float(data['rating'].strip())
    
    # TF-IDF vectorization
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(df['Description'])
    
    # User profile vectorization
    user_profile = vectorizer.transform([user_preference_type])
    user_similarity = cosine_similarity(user_profile, tfidf_matrix)
    
    df['Similarity'] = user_similarity.flatten()
    
    # Filter and sort data
    df_filtered = df[df['Reviews'] >= min_rating]
    df_filtered['Distance'] = df_filtered.apply(lambda row: great_circle((user_lat, user_lon), (row['Latitude'], row['Longitude'])).km, axis=1)
    
    df_filtered_sorted = df_filtered.sort_values(by=['Similarity', 'Distance'], ascending=[False, True])
    
    # Limit to top 5 recommendations
    recommendations = df_filtered_sorted.head(5)
    result = recommendations[['Name', 'Type', 'Description', 'Reviews', 'Distance']].to_dict(orient='records')
    
    return jsonify({'recommendations': result})

if __name__ == '__main__':
    app.run(debug=True)
