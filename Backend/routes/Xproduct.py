from flask import Blueprint, request, jsonify
from models import Product
from db import db
from supabase_conn import supabase
import uuid

productos_bp = Blueprint('productos', __name__, url_prefix='/productos')

### PRODUCTOS
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

@productos_bp.route('/<uuid:id_product>', methods=['GET'])
def get_product(id_product):
    p = Product.query.get_or_404(id_product)
    return jsonify({
        "id_product": str(p.id_product),
        "name": p.name,
        "category": p.category,
        "price": float(p.price),
        "image": p.image,
        "description": p.description
    })

@productos_bp.route('/', methods=['POST'])
def add_product():
    try:
        name = request.form.get('name')
        category = request.form.get('category')
        price = request.form.get('price')
        description = request.form.get('description')
        image_file = request.files.get('image')

        if not all([name, price, image_file]):
            return jsonify({"error": "Campos requeridos incompletos"}), 400

        file_ext = image_file.filename.split('.')[-1]
        file_path = f"products/{uuid.uuid4()}.{file_ext}"
        file_data = image_file.read()

        upload_response = supabase.storage.from_('product-images').upload(
            file_path, file_data, {"content-type": image_file.content_type}
        )

        if upload_response.error:
            return jsonify({"error": "Error al subir imagen: " + str(upload_response.error)}), 500

        image_url = f"{supabase.storage.url}/object/public/product-images/{file_path}"

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
    
# manage → el endpoint para editar/actualizar un producto está aquí como la función update_product con método PUT:
@productos_bp.route('/<uuid:id_product>', methods=['PUT'])
def update_product(id_product):
    data = request.get_json()
    product = Product.query.get_or_404(id_product)
    product.name = data.get('name', product.name)
    product.category = data.get('category', product.category)
    product.price = data.get('price', product.price)
    product.image = data.get('image', product.image)
    product.description = data.get('description', product.description)
    db.session.commit()
    return jsonify({"message": "Product updated"})

@productos_bp.route('/<uuid:id_product>', methods=['DELETE'])
def delete_product(id_product):
    product = Product.query.get_or_404(id_product)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted"})