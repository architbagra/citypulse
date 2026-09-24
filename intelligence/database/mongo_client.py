import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "citypulse")

client = MongoClient(MONGODB_URL)
db = client[DATABASE_NAME]

def get_db():
    return db
