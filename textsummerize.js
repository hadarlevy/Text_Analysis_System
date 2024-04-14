const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3008; // Choose a port for the custom text summarization service

app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

function generateSummary(text) {

  const sentences = text.split(/[.!?]/).filter(sentence => sentence.trim() !== '');
  const sentenceScores = {};

  sentences.forEach(sentence => {
    const words = sentence.split(/\s+/).filter(word => word.trim() !== '');
    const score = words.length;
    sentenceScores[sentence] = score;
  });

  const sortedSentences = Object.keys(sentenceScores).sort((a, b) => sentenceScores[b] - sentenceScores[a]);
  const summarySentences = sortedSentences.slice(0, 3); // Extract top 3 sentences as summary
  const summary = summarySentences.join(' ');
  return summary;
}

app.post('/summarize', (req, res) => {
  try {
    const text = req.body.text;
    console.log(text);

    // Generate the summary
    const summary = generateSummary(text);
    const result = text.length < 10 ? `${"Summary is:"} ${generateSummary(text)} ${"\nBut this text is too short for summary:("}` : `${"Summary is:"} ${summary}`;

    // Send the summary back to the client
    res.status(200).json({ result: result });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Custom text summarization service is running on port ${port}`);
});
