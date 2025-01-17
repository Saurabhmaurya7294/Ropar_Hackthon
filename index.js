const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/ask-ai', async (req, res) => {
  const question = req.body.question;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `Explain this in simple terms: ${question}`,
        max_tokens: 100,
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    res.json({ answer: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).send('Error connecting to AI service');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
