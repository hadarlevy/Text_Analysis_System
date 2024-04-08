from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def count_words():
    try:
        data = request.json
        text = data.get('text')
        if text is None or not text.strip():
            raise ValueError('Input text is empty')

        word_count = len(text.split())
        return jsonify({'word_count': word_count}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
