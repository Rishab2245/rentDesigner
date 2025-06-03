from flask import Flask, jsonify, render_template, send_from_directory, request
import os
import json
from database import get_all_designers, update_designer_shortlist

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')


# API endpoint to get all designers
@app.route('/api/designers', methods=['GET'])
def get_designers():
    designers = get_all_designers()
    return jsonify(designers)

# API endpoint to update designer shortlist status
@app.route('/api/designers/<int:designer_id>/shortlist', methods=['PUT'])
def update_shortlist(designer_id):
    data = request.get_json()
    if data and 'shortlisted' in data:
        success = update_designer_shortlist(designer_id, data['shortlisted'])
        if success:
            return jsonify({"success": True})
    return jsonify({"success": False}), 400

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
