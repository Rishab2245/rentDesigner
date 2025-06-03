from flask import Flask, jsonify, render_template, send_from_directory
import os
import json

app = Flask(__name__, 
            static_folder='../static',
            template_folder='../templates')

# Load designers data from JSON file
def load_designers_data():
    try:
        with open(os.path.join(app.static_folder, 'js/designers.json'), 'r') as file:
            return json.load(file)
    except Exception as e:
        print(f"Error loading designers data: {e}")
        return []

# API endpoint to get all designers
@app.route('/api/designers', methods=['GET'])
def get_designers():
    designers = load_designers_data()
    return jsonify(designers)

# Route for the main page
@app.route('/')
def index():
    return render_template('index.html')

# Serve static files
@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
