from flask import Blueprint, request, jsonify
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
        price = request.form.get('price')
        description = request.form.get('description')
        image_file = request.files.get('image')

        # Validar campos obligatorios
        if not all([name, price, image_file]):
            return jsonify({"error": "Campos requeridos incompletos"}), 400

        # Preparar datos para subir imagen a Supabase Storage
        file_ext = image_file.filename.split('.')[-1]
        file_path = f"products/{uuid.uuid4()}.{file_ext}"
        file_data = image_file.read()

        # Subir imagen
        upload_response = supabase.storage.from_('product-images').upload(
            file_path, file_data, {"content-type": image_file.content_type}
        )

        # Verificar error en subida
        if upload_response.error:
            return jsonify({"error": "Error al subir imagen: " + str(upload_response.error)}), 500

        # Construir URL pública de la imagen
        image_url = f"{supabase.storage.url}/object/public/product-images/{file_path}"

        # Crear nuevo producto en base de datos
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
        return jsonify({"error": str(e)}), 500
