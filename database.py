import os
from pymongo import MongoClient
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

# MongoDB connection
def get_database():
    """
    Get MongoDB database connection
    """
    mongodb_uri = os.getenv("MONGODB_URI")
    db_name = os.getenv("MONGODB_DB_NAME", "designers")
    
    if not mongodb_uri:
        raise ValueError("MongoDB URI not found in environment variables")
    
    client = MongoClient(mongodb_uri)
    return client[db_name]

def get_all_designers():

    db = get_database()
    return list(db.userDetsils.find({}, {"_id": 0}))

def update_designer_shortlist(designer_id, shortlisted):
    """
    Update the shortlisted status of a designer
    """
    db = get_database()
    result = db.userDetsils.update_one(
        {"id": designer_id},
        {"$set": {"shortlisted": shortlisted}}
    )
    return result.modified_count > 0
