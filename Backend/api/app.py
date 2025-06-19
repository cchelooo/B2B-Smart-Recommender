# Codigo BETA - Pruba para implementar FLASK
from flask import Flask, jsonify
from services.supabase_conn import get_supabase_data 
from services.postgres_conn import get_postgres_data

app = Flask(__name__)

@app.route("/api/supabase")
def fetch_supabase():
    data = get_supabase_data()
    return jsonify(data)

@app.route("/api/postgres")
def fetch_postgres():
    data = get_postgres_data()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
