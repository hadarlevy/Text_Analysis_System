const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3030; // Choose a port for the language detection service

app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

function detectLanguage(text) {
  // Define character sets for different languages
  const charSets = {
    english: /[A-Za-z]/,
    french: /[À-ÿ]/,
    spanish: /[Á-Úá-ú]/,
    german: /[ÄäÖöÜüß]/,
    russian: /[А-Яа-яЁё]/,
    chinese: /[\u4e00-\u9fa5]/,
    hebrew: /[\u0590-\u05FF]/
    // Add more character sets for other languages if needed
  };

  // Count occurrences of characters for each language
  const charCounts = {};
  Object.keys(charSets).forEach(language => {
    const regex = charSets[language];
    const matches = text.match(regex);
    charCounts[language] = matches ? matches.length : 0;
  });

  // Find the language with the highest character count
  let maxLanguage = '';
  let maxCount = 0;
  Object.entries(charCounts).forEach(([language, count]) => {
    if (count > maxCount) {
      maxLanguage = language;
      maxCount = count;
    }
  });

  return maxLanguage;
}

app.post('/detectlanguage', (req, res) => {
  try {
    const text = req.body.text;
    console.log(text);

    // Detect the language of the text
    const language = detectLanguage(text);

    // Send the detected language back to the client
    res.status(200).json({ result: language });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Language detection service is running on port ${port}`);
});
