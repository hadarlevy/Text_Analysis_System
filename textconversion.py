from flask import Flask, request, jsonify

app = Flask(__name__)
port = 3007  # Port for the text conversion service

@app.route('/convert', methods=['POST'])
def convert_text():
    try:
        submitted_text = request.json['text']  # Get submitted text from request

        # Check if the input is empty or contains only numbers or non-English characters
        if not submitted_text.strip() or submitted_text.isdigit() or not submitted_text.isalnum():
            raise ValueError('Invalid input: Please enter a valid text.')

        # Perform text conversion logic
        converted_text = {
            'uppercase': submitted_text.upper(),  # Convert text to uppercase
            'lowercase': submitted_text.lower()   # Convert text to lowercase
        }

        # Send the converted text back to the client
        return jsonify({'result': converted_text}), 200

    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)}), 400  # Send error message as response

if __name__ == '__main__':
    app.run(port=port)
