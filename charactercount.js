const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3004; // Choose a port for the character count service
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.post('/char-count', (req, res) => {

  try {
    const text = req.body.text;
    console.log(text);
    // Count the number of characters in the input text
    const charCount = text.length;

    // Send the character count back to the client
    res.status(200).json({ result: charCount });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Character count service is running on port ${port}`);
});
