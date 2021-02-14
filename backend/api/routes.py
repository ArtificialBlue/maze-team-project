from flask import Blueprint, jsonify
from utils.generator import generate_maze

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/<size>')
def getmaze(size):
    context = {
        'bitstring': generate_maze(int(size), int(size))
    }
    return jsonify(context)
