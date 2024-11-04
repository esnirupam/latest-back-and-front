from config import db

def add_api(api_data):
    """Function to add a new API entry to the MongoDB collection."""
    return db.apis.insert_one(api_data)

def get_all_apis():
    """Function to fetch all APIs from the MongoDB collection."""
    return list(db.apis.find({}, {"_id": 0}))  # Exclude MongoDB's _id from results

