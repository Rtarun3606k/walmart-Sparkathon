from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from Database.PrismaConnector import ConnectDB
import asyncio
from datetime import datetime

app = Flask(__name__)
CORS(app)


@app.route('/health', methods=['GET'])
def health_check():
    return jsonify(status='healthy'), 200


@app.route("/test",methods=["GET"])
async def func():
    result = await ConnectDB()
    
    try:
        # Create a unique email to avoid conflicts
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        unique_email = f"user_{timestamp}@email.com"
        
        user = await result.test.create({
            'name': f"Test User {timestamp}",
            'createdAt': datetime.now(),
        })

        # Convert to dict for JSON serialization
        user_data = user.model_dump()
        
        return jsonify({
            'message': 'User created successfully',
            'user': user_data
        }), 201
    
    except Exception as e:
        return jsonify({
            'error': 'Failed to create user',
            'details': str(e)
        }), 500
    
    finally:
        # Always disconnect from the database
        await result.disconnect()





