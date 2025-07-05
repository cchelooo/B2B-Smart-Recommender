'''
Punto de entrada de la API Flask
'''
from db import app
from routes.clientes import clientes_bp
from routes.productos import productos_bp
from routes.historial import history_bp
from routes.recomendacion import recomendacion_bp
from flask_cors import CORS


app.register_blueprint(clientes_bp)
app.register_blueprint(productos_bp)
app.register_blueprint(history_bp)
app.register_blueprint(recomendacion_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
