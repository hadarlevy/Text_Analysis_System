const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3005; // Choose a port for the reverse text service
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.post('/reverse', (req, res) => {

  try {
    const text = req.body.text;
    console.log(text);
    // Reverse the input text
    const reversedText = text.split('').reverse().join('');

    // Send the reversed text back to the client
    res.status(200).json({ result: reversedText });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Reverse text service is running on port ${port}`);
});
