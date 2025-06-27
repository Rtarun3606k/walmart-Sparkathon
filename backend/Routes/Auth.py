from flask import Blueprint, request, jsonify
from Database.PrismaConnector import ConnectDB
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token, get_jwt
from datetime import datetime, timedelta

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/', methods=['POST'])
async def auth():

    DB = await ConnectDB()
    if not DB:
        return jsonify({
            'error': 'Database connection failed'
        }), 500

    try:
        # Extract user credentials from request
        data = request.get_json()
        if not data or 'email' not in data:
            return jsonify({
                'error': 'Email and password are required'
            }), 400

        user_Check = await DB.user.find_first({
            'where': {
                'email': data['email']
            }
        })
        if user_Check:
            # User exists, generate JWT token
            access_token = create_access_token(identity=user_Check.email, additional_claims={
                'username': user_Check.username,
                "email": user_Check.email,
                "id": user_Check.id,


            })

            # Create a refresh token with a jti (JWT ID)
            refresh_token = create_refresh_token(identity=user_Check.email)
            
            # Update the user's last login time
            await DB.user.update({
                'where': {
                    'id': user_Check.id
                },
                'data': {
                    'lastLogin': DB.now(),
                    'refreshToken': refresh_token  # Store the refresh token
                }
            })


            # Return the token and user information


            return jsonify({
                'message': 'User authenticated successfully',
                'token': access_token,
                'user': user_Check.model_dump()
            }), 200


        if not user_Check:
            userCreate = await DB.user.create({
                'email': data['email'],
                'username':data['username'],
                'cart':[],
                "profileUrl": data.get('profileUrl', None),  # Optional profile URL
                
            })

            if not userCreate:
                return jsonify({
                    'error': 'Failed to create user'
                }), 500
            
            else:
                return jsonify({
                    'message': 'User created successfully',
                    'user': userCreate.model_dump()
                }), 201

    except Exception as e:
        return jsonify({
            'error': 'An error occurred',
            'details': str(e)
        }), 500
    
    finally:
        await DB.disconnect()


    return jsonify({
        'message': 'Authentication endpoint',
        'status': 'success'
    }), 200


@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
async def refresh():
    """
    Endpoint to refresh the access token using a valid refresh token.
    
    The refresh token must be included in the Authorization header.
    Returns a new access token if the refresh token is valid.
    """
    DB = await ConnectDB()
    if not DB:
        return jsonify({
            'error': 'Database connection failed'
        }), 500

    try:
        # Get the identity from the refresh token
        current_user_email = get_jwt_identity()
        
        # Find the user by email
        user = await DB.user.find_first({
            'where': {
                'email': current_user_email
            }
        })
        
        if not user:
            return jsonify({
                'error': 'User not found'
            }), 404
            
        # Check if the refresh token is stored in the database
        token_data = get_jwt()
        token_jti = token_data["jti"]
        
        # Verify the refresh token is still valid
        # For a real implementation, you might want to check against a revoked token list or DB
        # Here we just check that the user has a refresh token stored
        if not user.refreshToken:
            return jsonify({
                'error': 'Refresh token has been revoked'
            }), 401
            
        # Generate a new access token
        new_access_token = create_access_token(identity=current_user_email, additional_claims={
            'username': user.username,
            "email": user.email,
            "id": user.id
        })
        
        return jsonify({
            'message': 'Token refreshed successfully',
            'token': new_access_token,
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'An error occurred during token refresh',
            'details': str(e)
        }), 500
        
    finally:
        await DB.disconnect()


@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
async def logout():
    """
    Endpoint to logout a user by revoking their refresh token.
    """
    DB = await ConnectDB()
    if not DB:
        return jsonify({
            'error': 'Database connection failed'
        }), 500

    try:
        # Get the identity from the token
        current_user_email = get_jwt_identity()
        
        # Find the user and remove their refresh token
        user = await DB.user.find_first({
            'where': {
                'email': current_user_email
            }
        })
        
        if not user:
            return jsonify({
                'error': 'User not found'
            }), 404
            
        # Remove the refresh token
        await DB.user.update({
            'where': {
                'id': user.id
            },
            'data': {
                'refreshToken': None  # Clear the refresh token
            }
        })
        
        return jsonify({
            'message': 'Successfully logged out'
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'An error occurred during logout',
            'details': str(e)
        }), 500
        
    finally:
        await DB.disconnect()