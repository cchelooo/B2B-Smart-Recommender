'''
Definiciones de tablas SQLAlchemy
'''
from db import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Client(db.Model):
    __tablename__ = 'client'
    id_user = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    sector = db.Column(db.String)
    rol = db.Column(db.String, default='cliente')  # Nueva columna agregada


class Product(db.Model):
    __tablename__ = 'product'
    id_product = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String)
    price = db.Column(db.Numeric, nullable=False)
    image = db.Column(db.String)        
    description = db.Column(db.String)   