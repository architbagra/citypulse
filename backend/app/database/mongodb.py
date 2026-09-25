import os
import asyncio
from dotenv import load_dotenv
from typing import Dict, List, Any

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "citypulse")

class InMemoryCollection:
    def __init__(self, name: str):
        self.name = name
        self.documents: List[Dict[str, Any]] = []

    async def count_documents(self, filter_dict: dict) -> int:
        return len(self.documents)

    async def insert_one(self, doc: dict):
        self.documents.append(doc)
        return type("InsertResult", (), {"inserted_id": doc.get("id", "mem_id")})()

    async def insert_many(self, docs: List[dict]):
        self.documents.extend(docs)
        return type("InsertManyResult", (), {"inserted_ids": [d.get("id") for d in docs]})()

    async def update_one(self, filter_dict: dict, update_dict: dict):
        if "$set" in update_dict:
            sets = update_dict["$set"]
            for doc in self.documents:
                match = all(doc.get(k) == v for k, v in filter_dict.items())
                if match:
                    doc.update(sets)
                    break
        return type("UpdateResult", (), {"modified_count": 1})()

    def find(self, filter_dict: dict = None, projection: dict = None):
        return InMemoryCursor(self.documents)

class InMemoryCursor:
    def __init__(self, docs: List[dict]):
        self.docs = docs

    async def to_list(self, length: int = 100) -> List[dict]:
        return self.docs[:length]

class InMemoryDatabase:
    def __init__(self):
        self.collections: Dict[str, InMemoryCollection] = {}

    def __getattr__(self, item: str) -> InMemoryCollection:
        if item not in self.collections:
            self.collections[item] = InMemoryCollection(item)
        return self.collections[item]

class Database:
    client = None
    db = None
    is_mongo_connected: bool = False

db_instance = Database()

async def connect_to_mongo():
    from motor.motor_asyncio import AsyncIOMotorClient
    print(f"Connecting to MongoDB at {MONGODB_URL}...")
    try:
        client = AsyncIOMotorClient(MONGODB_URL, serverSelectionTimeoutMS=3000)
        # Verify server connection
        await client.admin.command('ping')
        db_instance.client = client
        db_instance.db = client[DATABASE_NAME]
        db_instance.is_mongo_connected = True
        print("Connected successfully to MongoDB Atlas!")
    except Exception as e:
        print(f"MongoDB unavailable ({e}). Fallback to In-Memory Database Engine.")
        db_instance.is_mongo_connected = False
        db_instance.db = InMemoryDatabase()

async def close_mongo_connection():
    if db_instance.is_mongo_connected and db_instance.client is not None:
        print("Closing MongoDB connection...")
        db_instance.client.close()
        print("Closed MongoDB connection.")

def get_database():
    if db_instance.db is None:
        db_instance.db = InMemoryDatabase()
    return db_instance.db
