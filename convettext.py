from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/convertPY', methods=['POST'])
def convert_text():
    try:
        data = request.get_json()
        text = data['text']
        
        # Convert text to uppercase and lowercase
        uppercase_text = text.upper()
        lowercase_text = text.lower()
        result = 'uppercase:' f'{uppercase_text}, lowercase:' f'{lowercase_text}'
        return jsonify({'result':result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
