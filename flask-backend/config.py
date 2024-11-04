import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

# MongoDB URI
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
DB_NAME = os.getenv("DB_NAME", "api_verse")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
