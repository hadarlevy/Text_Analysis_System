const express = require('express');
const bodyParser = require('body-parser');
const natural = require('natural');

const app = express();
const port = 3003;

// Use bodyParser middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to extract keywords from text
app.post('/keywords', (req, res) => {
  try {
    // Extract keywords from the input text
    const text = req.body.text;
    const tokenizer = new natural.WordTokenizer();
    console.log(tokenizer);
    const words = tokenizer.tokenize(text);
    console.log(words);
    const stemmer = natural.PorterStemmer;
    console.log(stemmer);
    const stemmedWords = words.map(word => stemmer.stem(word));
    console.log(stemmedWords);
    const uniqueWords = [...new Set(stemmedWords)];// Remove duplicates
    console.log(uniqueWords);
    const responseText = uniqueWords.join(', ');
    console.log(responseText);
    res.status(200).json({ result: responseText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Keyword extraction service is running on port ${port}`);
});
