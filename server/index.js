//service/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

app.use(express.static('build'));

app.get('/api/catalog', async (req, res) => {
  try {
    const response = await axios.get('https://greet.bg/wp-json/wc/store/products?page=1');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/edit/:id', async (req, res) => {
  try {
    const postId = req.params.id
    const response = await axios.post(`https://greet.bg/?add-to-cart=${postId}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});





