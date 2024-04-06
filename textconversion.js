// textconversion.js

const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  try {
    const submittedText = req.body.text; // Get submitted text

    // Perform text conversion logic
    const convertedText = {
      uppercase: submittedText.toUpperCase(), // Convert text to uppercase
      lowercase: submittedText.toLowerCase()  // Convert text to lowercase
    };

    // Send the converted text back to the client
    res.status(200).json({ result: convertedText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
