from pymongo import MongoClient

# Establish connection with PyMongo
# <<MongoDB URL>> is a placeholder for the connection string to MongoDB
client = MongoClient('<<MongoDB URL>>')
db = client.business 