const express = require('express');
const app = express();
const port = 3001; // Port for the text conversion service

app.use(express.json());

app.post('/convert', (req, res) => {
  try {
    const submittedText = req.body.text; // Get submitted text

    // Check if the input is empty or contains only numbers Check if the input contains only English letters and numbers
    if (!submittedText.trim() || /^\d+$/.test(submittedText) || !/^[a-zA-Z0-9\s]+$/.test(submittedText)) {
      throw new Error('Invalid input: Please enter a valid text.');
    }

    // Perform text conversion logic
    const convertedText = {
      uppercase: submittedText.toUpperCase(), // Convert text to uppercase
      lowercase: submittedText.toLowerCase() // Convert text to lowercase
    };

    // Send the converted text back to the client
    res.status(200).json({ result: convertedText });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message }); // Send error message as response
  }
});

app.listen(port, () => {
  console.log(`Text conversion service is running on port ${port}`);
});
