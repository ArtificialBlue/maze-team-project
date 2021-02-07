from flask import Blueprint, jsonify
from utils.generator import createMaze
# from utils.get_mz import get_mz

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/')
def getmaze():
    context = {
        'bitstring': createMaze(15, 15)
        # 'bitstring': get_mz("0")
    }
    return jsonify(context)
