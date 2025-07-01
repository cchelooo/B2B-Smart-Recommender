'''
Definiciones de tablas SQLAlchemy
'''
from db import db
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime

class Client(db.Model):
    __tablename__ = 'client'
    id_user = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    sector = db.Column(db.String)
    rol = db.Column(db.String, default='cliente')
    password = db.Column(db.String, nullable=False)  
class Product(db.Model):
    __tablename__ = 'product'
    id_product = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String)
    price = db.Column(db.Numeric, nullable=False)
    image = db.Column(db.String)        
    description = db.Column(db.String)   

class PurchaseHistory(db.Model):
    __tablename__ = 'purchase_history'
    id_history = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    id_user = db.Column(UUID(as_uuid=True), db.ForeignKey('client.id_user'), nullable=False)
    id_product = db.Column(UUID(as_uuid=True), db.ForeignKey('product.id_product'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    date_time = db.Column(db.DateTime, default=datetime.utcnow)
    client = db.relationship('Client', backref='purchases')   # FK de client
    product = db.relationship('Product', backref='purchases') # FK de product