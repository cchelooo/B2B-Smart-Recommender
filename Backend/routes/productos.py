from flask import Blueprint, request, jsonify
from supabase_conn import SUPABASE_PUBLIC_URL
from models import Product
from db import db
from supabase_conn import supabase
import uuid

productos_bp = Blueprint('productos', __name__, url_prefix='/productos')

@productos_bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{
        "id_product": str(p.id_product),
        "name": p.name,
        "category": p.category,
        "price": float(p.price),
        "image": p.image,
        "description": p.description
    } for p in products])

@productos_bp.route('/', methods=['POST'])
def add_product():
    try:
        # Obtener datos del formulario
        name = request.form.get('name')
        category = request.form.get('category')
        price_raw = request.form.get('price')
        description = request.form.get('description')
        image_file = request.files.get('image')

        if not all([name, price_raw, image_file]):
            return jsonify({"error": "Campos requeridos incompletos"}), 400

        try:
            price = float(price_raw)
        except ValueError:
            return jsonify({"error": "El precio debe ser un número válido"}), 400

        file_ext = image_file.filename.split('.')[-1]
        file_path = f"products/{uuid.uuid4()}.{file_ext}"
        file_data = image_file.read()

        # Subir imagen a Supabase
        try:
            supabase.storage.from_('product-images').upload(
                file_path, file_data, {"content-type": image_file.content_type}
            )
        except Exception as upload_err:
            return jsonify({"error": f"Error al subir imagen: {str(upload_err)}"}), 500

        # URL pública
        image_url = f"{SUPABASE_PUBLIC_URL}/storage/v1/object/public/product-images/{file_path}"

        product = Product(
            name=name,
            category=category,
            price=price,
            image=image_url,
            description=description
        )

        db.session.add(product)
        db.session.commit()

        return jsonify({"message": "Producto agregado", "id_product": str(product.id_product)}), 201

    except Exception as e:
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500