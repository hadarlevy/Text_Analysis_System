const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Route to handle form submission
app.post('/servicesManager', async (req, res) => {
  try {
    const { action, text } = req.body;
    console.log(action);
    // Define a map of actions and their corresponding microservice URLs
    const actionToURL = {
      textConversion: 'http://localhost:3001/convert',
      textChain: 'http://localhost:3002/chain', // URL for text chain service
      charCount: 'http://localhost:3004/char-count',
      reverseText: 'http://localhost:3005/reverse',
      textkeywords: 'http://localhost:3003/keywords',
      analyzeSentiment: 'http://localhost:3006/analyze-sentiment'
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve HTML file with text submission form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'textAnalysisManager.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
