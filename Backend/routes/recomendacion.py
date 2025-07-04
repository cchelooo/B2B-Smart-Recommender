from flask import Blueprint, request, jsonify
from models import db, Recommendation
from uuid import UUID
from services.recommender import generar_recomendaciones_personalizadas
from models import Product, PurchaseHistory, Client  # ya lo tienes para otras rutas


recomendacion_bp = Blueprint('recomendacion', __name__, url_prefix='/api/recomendacion')

# GET all recommendations
@recomendacion_bp.route('/', methods=['GET'])
def get_all_recommendations():
    recomendaciones = Recommendation.query.all()
    return jsonify([{
        "id_r": str(r.id_r),
        "id_user": str(r.id_user),
        "id_product": str(r.id_product),
        "score": float(r.score) if r.score else None
    } for r in recomendaciones]), 200

# GET by id_r
@recomendacion_bp.route('/<uuid:id_r>', methods=['GET'])
def get_recommendation(id_r):
    r = Recommendation.query.get_or_404(id_r)
    return jsonify({
        "id_r": str(r.id_r),
        "id_user": str(r.id_user),
        "id_product": str(r.id_product),
        "score": float(r.score) if r.score else None
    }), 200

# POST - create new recommendation
@recomendacion_bp.route('/', methods=['POST'])
def create_recommendation():
    data = request.get_json()
    new_rec = Recommendation(
        id_user=UUID(data['id_user']),
        id_product=UUID(data['id_product']),
        score=data.get('score', 0.0)
    )
    db.session.add(new_rec)
    db.session.commit()
    return jsonify({"message": "Recommendation created", "id_r": str(new_rec.id_r)}), 201

# PUT - update recommendation
@recomendacion_bp.route('/<uuid:id_r>', methods=['PUT'])
def update_recommendation(id_r):
    rec = Recommendation.query.get_or_404(id_r)
    data = request.get_json()
    
    if 'id_user' in data:
        rec.id_user = UUID(data['id_user'])
    if 'id_product' in data:
        rec.id_product = UUID(data['id_product'])
    if 'score' in data:
        rec.score = data['score']
    
    db.session.commit()
    return jsonify({"message": "Recommendation updated"}), 200

# DELETE - delete recommendation
@recomendacion_bp.route('/<uuid:id_r>', methods=['DELETE'])
def delete_recommendation(id_r):
    rec = Recommendation.query.get_or_404(id_r)
    db.session.delete(rec)
    db.session.commit()
    return jsonify({"message": "Recommendation deleted"}), 200

# GET personalizado: recomendaciones dinámicas para un usuario
@recomendacion_bp.route('/personalizadas/<uuid:id_user>', methods=['GET'])
def get_personal_recommendations(id_user):
    try:
        # Obtener historial del usuario
        historial = PurchaseHistory.query.filter_by(id_user=id_user).all()
        historial_data = [{
            "id_product": str(h.product.id_product),
            "category": h.product.category,
            "quantity": h.quantity
        } for h in historial]

        # Obtener todos los productos
        productos = Product.query.all()
        productos_data = [{
            "id_product": str(p.id_product),
            "name": p.name,
            "category": p.category,
            "price": float(p.price),
            "image": p.image,
            "description": p.description or ""  # <-- esto es clave
        } for p in productos]


        recomendaciones = generar_recomendaciones_personalizadas(historial_data, productos_data)

        return jsonify(recomendaciones), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
