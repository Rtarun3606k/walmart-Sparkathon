from flask import Flask, request, jsonify,Blueprint
from flask_cors import CORS
import os
from Database.PrismaConnector import ConnectDB
import asyncio
from datetime import datetime

from flask_jwt_extended import JWTManager

# import all blueprints
from Routes.Auth import auth_bp

# Initialize Flask app and CORS
app = Flask(__name__)
jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your_default_secret_key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600  # Token expiration time
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = 86400  # Refresh token expiration time
# Initialize CORS

CORS(app)


@app.route('/health', methods=['GET'])
def health_check():
    return jsonify(status='healthy'), 200


@app.route("/test",methods=["GET"])
async def func():
    result = await ConnectDB()
    print("Connected to the database successfully", type(result))
    
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



app.register_blueprint(auth_bp, url_prefix='/auth')




