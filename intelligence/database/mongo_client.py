import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "citypulse")

def get_db():
    try:
        from pymongo import MongoClient
        client = MongoClient(MONGODB_URL, serverSelectionTimeoutMS=1000)
        client.admin.command('ping')
        return client[DATABASE_NAME]
    except Exception:
        try:
            from app.database.mongodb import get_database
            return get_database()
        except Exception:
            class SyncInMemoryDB:
                def __init__(self):
                    self.collections = {}
                def __getattr__(self, name):
                    if name not in self.collections:
                        self.collections[name] = SyncInMemoryCollection()
                    return self.collections[name]
            class SyncInMemoryCollection:
                def __init__(self):
                    self.docs = []
                def insert_one(self, doc):
                    self.docs.append(doc)
                def insert_many(self, docs):
                    self.docs.extend(docs)
                def count_documents(self, filter_dict):
                    return len(self.docs)
                def find(self, filter_dict=None, projection=None):
                    return self.docs
            return SyncInMemoryDB()

