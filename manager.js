// manager.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express app
const app = express();
const port = process.env.port || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

// Define route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'textAnalysis.html'));


  // Update the file path
});
// Define route to handle form submission
app.post('/submit', (req, res) => {
  // Retrieve user input from request body
  const text = req.body.text;
  // Here you can handle the user input and interact with the microservices
  // For demonstration, let's just log the text to the console
  console.log('User input:', text);
  // Send a response back to the client
  res.send('Received your input!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
