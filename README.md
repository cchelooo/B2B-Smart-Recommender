# Trabajando en la app  B2B-Smart-Recommender
Backend 
- Desarrollo de la API REST con 
Flask. 
- Gestión de la base de datos en 
PostgreSQL. 

> Semana3: Backend básico (API para productos y clientes) 

## INFO del proyecto:
Estructura general del proyecto →
```
/b2bsmart              <-- frontend
/Backend               <-- backend [Área de trabajo]
/Parte_del-backend     <-- Arch posteriores
```

### 🧪 Backend en desarrollo

En este proyecto trabajamos con **Flask** para crear una API básica de productos y clientes.

```
Backend/
│
├── __pycache__/              ← Archivos temporales generados por Python
│
├── routes/                   ←  Rutas de la API organizadas por recurso
│   ├── __pycache__/          ←  Caché de Python
│   ├── clientes.py           ←  Define endpoints relacionados a clientes
│   └── productos.py          ←  Define endpoints relacionados a productos
│
├── venv/                     ←  Entorno virtual de Python(no subido)
├── .env                      ←  Variables de entorno para conectar
│
├── app.py                    ←  Ejecutar y ver si funciona todo
│
├── db.py                     ←  Configuración de la base de datos y conexión 
│
├── models.py                 ←  Define los modelos de datos
│
├── requirements.txt          ←  Lista de dependencias de Python para instalar el entorno con `pip install -r`

```
### Captura de funcionamiento de API

<img src="Parte_del_backend/assets/Captura de pantalla 2025-06-22 203715.png" alt="Tablas Supabase" style="max-width: 100%; height: auto;" />
<p><i>JSON - Datos registrados del client</i></p>
