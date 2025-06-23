from flask import Blueprint, request, jsonify
from models import Product
from db import db

productos_bp = Blueprint('productos', __name__, url_prefix='/productos')

@productos_bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{
        "id_product": str(p.id_product),
        "name": p.name,
        "category": p.category,
        "price": float(p.price)
    } for p in products])

@productos_bp.route('/', methods=['POST'])
def add_product():
    data = request.get_json()
    product = Product(
        name=data['name'],
        category=data.get('category'),
        price=data['price']
    )
    db.session.add(product)
    db.session.commit()
    return jsonify({"message": "Product added", "id_product": str(product.id_product)}), 201
