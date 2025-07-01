from flask import Blueprint, request, jsonify
from models import db, Recommendation
from uuid import UUID

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
