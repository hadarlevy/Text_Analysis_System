const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3002; // Choose a port for the text chain service
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.post('/chain', (req, res) => {

  try {
    const text = req.body.text;
    console.log(text);
    // check if there are non english words
    const words = text.split(/\s+/);
    for (const word of words) {
      if (!/^[a-zA-Z0-9\s]+$/.test(word)) {
        throw new Error('Invalid input: Each word should only contain letters, numbers, and spaces.');
      }
    }

    const concatenatedText = text.replace(/\s+/g, '');
    // Send the concatenated text back to the client
    res.status(200).json({ result: concatenatedText });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Text chain service is running on port ${port}`);
});
