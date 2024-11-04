from flask import Blueprint, request, jsonify
from models import add_api, get_all_apis

api_blueprint = Blueprint('api_blueprint', __name__)

@api_blueprint.route('/add-api', methods=['POST'])
def add_api_route():
    """Endpoint to add a new API entry."""
    api_data = request.json
    add_api(api_data)
    return jsonify({"message": "API added successfully"}), 201

@api_blueprint.route('/get-apis', methods=['GET'])
def get_apis_route():
    """Endpoint to fetch all API entries."""
    apis = get_all_apis()
    return jsonify(apis), 200

