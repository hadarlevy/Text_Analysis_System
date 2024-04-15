from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/chainPY', methods=['POST'])
def chain_text():
    try:
        data = request.get_json()
        text = data['text']
        
        # Chain the text
        chained_text = ''.join(text.split())
        
        return jsonify({'result': chained_text}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
