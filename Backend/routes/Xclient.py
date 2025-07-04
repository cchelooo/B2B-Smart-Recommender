from flask import Blueprint, request, jsonify
from models import Client
from db import db
import uuid

clientes_bp = Blueprint('clientes', __name__, url_prefix='/clientes')

### CLIENTES
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

@clientes_bp.route('/<uuid:id_user>', methods=['GET'])
def get_client(id_user):
    c = Client.query.get_or_404(id_user)
    return jsonify({
        "id_user": str(c.id_user),
        "name": c.name,
        "email": c.email,
        "sector": c.sector,
        "rol": c.rol,
        "password": c.password
    })

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

# manage (editar/actualizar cliente) corresponde a la función update_client con método PUT:
@clientes_bp.route('/<uuid:id_user>', methods=['PUT'])
def update_client(id_user):
    data = request.get_json()
    client = Client.query.get_or_404(id_user)
    client.name = data.get('name', client.name)
    client.email = data.get('email', client.email)
    client.sector = data.get('sector', client.sector)
    client.rol = data.get('rol', client.rol)
    if 'password' in data:
        client.password = data['password']
    db.session.commit()
    return jsonify({"message": "Client updated"})

@clientes_bp.route('/<uuid:id_user>', methods=['DELETE'])
def delete_client(id_user):
    client = Client.query.get_or_404(id_user)
    db.session.delete(client)
    db.session.commit()
    return jsonify({"message": "Client deleted"})