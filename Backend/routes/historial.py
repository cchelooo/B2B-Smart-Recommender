from flask import Blueprint, request, jsonify
from models import PurchaseHistory, Client, Product
from db import db
import uuid
from datetime import datetime

history_bp = Blueprint('history', __name__, url_prefix='/history')

# 📘 GET: Listar historial de compras
@history_bp.route('/', methods=['GET'])
def get_history():
    history = PurchaseHistory.query.all()
    return jsonify([
        {
            "id_history": str(h.id_history),
            "client": {
                "id_user": str(h.client.id_user),
                "name": h.client.name,
                "email": h.client.email
            },
            "product": {
                "id_product": str(h.product.id_product),
                "name": h.product.name,
                "price": float(h.product.price),
                "image": h.product.image
            },
            "quantity": h.quantity,
            "date_time": h.date_time.strftime('%Y-%m-%d %H:%M:%S')
        } for h in history
    ])

# 📝 POST: Registrar nueva compra
@history_bp.route('/', methods=['POST'])
def add_history():
    data = request.get_json()
    try:
        id_user = uuid.UUID(data['id_user'])
        id_product = uuid.UUID(data['id_product'])
        quantity = int(data['quantity'])

        new_history = PurchaseHistory(
            id_user=id_user,
            id_product=id_product,
            quantity=quantity
        )
        db.session.add(new_history)
        db.session.commit()

        return jsonify({"message": "Historial registrado", "id_history": str(new_history.id_history)}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400
# DELETE: Eliminar una compra del historial por ID
@history_bp.route('/<uuid:id_history>', methods=['DELETE'])
def delete_history(id_history):
    history_item = PurchaseHistory.query.get_or_404(id_history)
    db.session.delete(history_item)
    db.session.commit()
    return jsonify({"message": f"Compra {id_history} eliminada del historial"}), 200