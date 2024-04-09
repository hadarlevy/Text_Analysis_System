const express = require('express');
const bodyParser = require('body-parser');
const natural = require('natural');

const app = express();
const port = 3006; // Choose a port for the sentiment analysis service
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.post('/analyze-sentiment', (req, res) => {
  try {
    const text = req.body.text;
    const tokenizer = new natural.WordTokenizer();
    const words = tokenizer.tokenize(text);
    const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
    const analysisResult = analyzer.getSentiment(words);
    let sentiment = 'Neutral';
    if (analysisResult > 0) {
      sentiment = 'Positive';
    } else if (analysisResult < 0) {
      sentiment = 'Negative';
    }
    // Send the sentiment analysis result back to the client
    res.status(200).json({ result: sentiment });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Sentiment analysis service is running on port ${port}`);
});
