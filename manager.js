// manager.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const textConversionService = require('./textconversion'); // Import the text conversion service module

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Serve HTML file with text submission form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'textsubmission.html'));
});

// Handle form submission
app.post('/submit', async (req, res) => {
  try {
    const submittedText = req.body.text; // Get submitted text
    // Redirect to services page with submitted text as query parameter
    res.redirect(`/services?text=${encodeURIComponent(submittedText)}`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Serve HTML file with service buttons
app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'services.html'));
});

// Route requests to the text conversion service module
app.use('/activate-service/text-conversion', textConversionService);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
