from flask import Blueprint, request, jsonify
from models import Client
from db import db

clientes_bp = Blueprint('clientes', __name__, url_prefix='/clientes')

@clientes_bp.route('/', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    return jsonify([{
        "id_user": str(c.id_user),
        "name": c.name,
        "email": c.email,
        "sector": c.sector,
        "rol": c.rol,
        "password": c.password
    } for c in clients])

@clientes_bp.route('/', methods=['POST'])
def add_client():
    data = request.get_json()
    client = Client(
        name=data['name'],
        email=data['email'],
        sector=data.get('sector'),
        rol=data.get('rol', 'cliente'),
        password=data['password']
    )
    db.session.add(client)
    db.session.commit()
    return jsonify({"message": "Client added", "id_user": str(client.id_user)}), 201
