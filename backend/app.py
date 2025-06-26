from flask import Flask, request, jsonify
from flask_cors import CORS
import os



app = Flask(__name__)
CORS(app)


@app.route('/health', methods=['GET'])
def health_check():
    return jsonify(status='healthy'), 200




