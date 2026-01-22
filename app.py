
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load dataset
df = pd.read_csv("data/songs.csv")
df["combined"] = df["artist"] + " " + df["genre"] + " " + df["mood"]

# Vectorize
vectorizer = CountVectorizer()
matrix = vectorizer.fit_transform(df["combined"])
similarity = cosine_similarity(matrix)

class RecommendRequest(BaseModel):
    song: str

@app.post("/recommend")
def recommend(req: RecommendRequest):
    # normalize input
    input_song = req.song.strip().lower()

    # normalize dataset
    df["song_lower"] = df["song"].str.lower()

    if input_song not in df["song_lower"].values:
        return {"recommendations": []}

    idx = df[df["song_lower"] == input_song].index[0]
    scores = list(enumerate(similarity[idx]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)[1:6]

    recommendations = [
        {
            "song": df.iloc[i[0]]["song"],
            "artist": df.iloc[i[0]]["artist"]
        }
        for i in scores
    ]

    return {"recommendations": recommendations}

