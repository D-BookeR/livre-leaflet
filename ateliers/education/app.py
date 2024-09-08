from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import psycopg2
import psycopg2.extras

app = Flask(__name__, static_folder='static')
CORS(app)

# Configuration de la connexion à la base de données
DATABASE_CONFIG = {
    'dbname': 'richnou',
    'user': 'richnou',
    'password': '',
    'host': 'localhost',
    'port': '5432'
}


def get_db_connection():
    conn = psycopg2.connect(**DATABASE_CONFIG)
    return conn


@app.route('/education', methods=['GET'])
def get_education():
    try:
        # Lire les paramètres de la requête
        lat = float(request.args.get('lat'))
        lng = float(request.args.get('lng'))
    except (TypeError, ValueError) as e:
        return jsonify({'error': 'Invalid parameters'}), 400
    
    # les points dans un rayon de 10km
    radius = float(request.args.get('radius', 1000)) 
    if radius > 5000:
        radius = 5000

    # Calculer le rayon en degrés (approximation simple)
    radius = radius / 111300  # 111300 mètres par degré
    query = """
    SELECT id, etab_type, nom, cp, ville, lat, lng,
           ST_DistanceSphere(
               ST_SetSRID(ST_MakePoint(%s, %s), 4326),
               coord
           ) / 1000.0 AS distance
    FROM education
    WHERE ST_DWithin(
        coord,
        ST_SetSRID(ST_MakePoint(%s, %s), 4326),
        %s
    )
    ORDER BY distance
    -- LIMIT 100
    """

    # les 20 points autour...
    # query = """
    #     SELECT id, etab_type, nom, cp, ville, lat, lng,
    #         ST_DistanceSphere(
    #             ST_SetSRID(ST_MakePoint(%s, %s), 4326),
    #             coord
    #         ) / 1000.0 AS distance
    #     FROM education
    #     ORDER BY distance
    #     LIMIT 20
    # """

    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute(query, (lng, lat, lng, lat, radius))
        # cur.execute(query, (lng, lat))
        rows = cur.fetchall()
        cur.close()
        conn.close()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    # Convertir les résultats en JSON
    results = [dict(row) for row in rows]
    return jsonify(results)


@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)


if __name__ == '__main__':
    app.run(debug=True)
