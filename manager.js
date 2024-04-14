const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Function to check if the input text contains Hebrew characters
function containsHebrew(text) {
  // Regular expression to match Hebrew characters
  const hebrewPattern = /[\u0590-\u05FF]/;
  return hebrewPattern.test(text);
}

// Route to handle form submission
app.post('/servicesManager', async (req, res) => {
  try {
    const { action, text } = req.body;

    // Check if the action is language detection
    if (action === 'detectlanguage') {
      // No need to check for Hebrew characters, allow any text for language detection
    } else {
      // Check if the input text contains Hebrew characters for all other actions
      if (containsHebrew(text)) {
        throw new Error('Input text contains Hebrew characters. Please enter text in English.');
      }
    }

    // Define a map of actions and their corresponding microservice URLs
    const actionToURL = {
      textConversion: 'http://localhost:3001/convert',
      textChain: 'http://localhost:3002/chain', // URL for text chain service
      charCount: 'http://localhost:3004/char-count',
      reverseText: 'http://localhost:3005/reverse',
      detectlanguage: 'http://localhost:3030/detectlanguage',
      textSummarize: 'http://localhost:3008/summarize'
      // Add more actions and their corresponding URLs as needed
    };

    // Check if the action is valid
    if (!actionToURL[action]) {
      throw new Error('Invalid action');
    }

    const { default: fetch } = await import('node-fetch'); // Dynamic import
    const response = await fetch(actionToURL[action], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });
    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve HTML file with text submission form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'textAnalysisManager.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running and listening on port ${port}`);
});
