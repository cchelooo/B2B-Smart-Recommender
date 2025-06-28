'''
Punto de entrada de la API Flask
'''
from db import app
from routes.clientes import clientes_bp
from routes.productos import productos_bp

app.register_blueprint(clientes_bp)
app.register_blueprint(productos_bp)

if __name__ == '__main__':
    app.run(debug=True)
