# B2BSmart

**B2BSmart** es una aplicación web B2B diseñada para que empresas optimicen sus procesos de compra mediante un sistema de recomendaciones inteligentes basado en historial de compras y perfiles de usuario. La plataforma ofrece una interfaz limpia, responsiva y moderna, pensada para mejorar la eficiencia y la experiencia del usuario empresarial.

---

## Funcionalidades principales

- **Búsqueda de productos** por nombre o categoría.
- **Carrito de compras** interactivo, con historial y recomendaciones personalizadas.
- **Recomendaciones inteligentes** mediante machine learning (TF-IDF + preferencias de categoría).
- **Gestión de historial de compras** con posibilidad de eliminar registros.
- **Inicio de sesión y registro de clientes**.
- **Dashboard empresarial** enfocado en experiencia B2B.

---

## Tecnologías utilizadas

### Frontend

- **React** + **Vite**  
- **Tailwind CSS** (estilos personalizados con paleta de colores definida)
- **Lucide React** (íconos modernos)
- **React Router Dom** (navegación SPA)
- **Vercel** (despliegue frontend)

### Backend

- **Flask** (API RESTful)
- **SQLAlchemy** (ORM para PostgreSQL)
- **Supabase** (alternativa a Firebase, utilizada inicialmente)
- **Fly.io** (despliegue del backend)
- **Flask-CORS** (para habilitar comunicación con frontend)
- **dotenv** (manejo seguro de variables de entorno)

### Recomendaciones inteligentes

- **Pandas** + **Scikit-Learn**  
- **TF-IDF Vectorizer** para analizar descripciones de productos.
- Análisis de **historial de compras** para priorizar categorías.

---

## Lógica de recomendación

1. Si el usuario no tiene historial, se recomiendan productos variados.
2. Si hay historial, se ponderan productos según:
   - Frecuencia de compra por categoría.
   - Similitud de descripción mediante TF-IDF.
3. Se combinan ambos factores para sugerir hasta 6 productos personalizados.

---

## Base de datos

- **PostgreSQL** alojado en Fly.io
- Tablas:
  - `Client`
  - `Product`
  - `PurchaseHistory`
- Uso de `UUID` como identificadores principales.
- Relaciones `1:N` entre clientes y compras.

---

## Diseño e interfaz

- Layout responsivo y moderno.
- Modales animados para historial, carrito y confirmaciones.
- Carga condicional con indicadores (`loading`, `success`, etc.).
- Paleta de colores personalizada:
  - `ghost-white`, `silver`, `french-gray`, `raisin-black`, `non-photo blue`.

![image](https://github.com/user-attachments/assets/d63361ed-f882-42ad-be5c-32bbc50e52f2)
![image](https://github.com/user-attachments/assets/751bf90b-2859-4ee4-8b8d-8047ae6d4f54)


---

### Backend

```bash
cd Backend
python -m venv venv
source venv/bin/activate  # o venv\Scripts\activate en Windows
pip install -r requirements.txt
python app.py
