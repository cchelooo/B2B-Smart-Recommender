'''
Conexión a PostgreSQL
'''
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()  # Carga variables de entorno desde .env

app = Flask(__name__)
CORS(app)  # Permite peticiones cross-origin

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)