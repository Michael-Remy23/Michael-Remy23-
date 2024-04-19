// server.mjs
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/places', async (req, res) => {
  const { keyword, latitude, longitude, apiKey } = req.query;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${keyword}&location=${latitude},${longitude}&rankby=distance&type=restaurant&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const jsonDataP = `handleResponse(${JSON.stringify(data)})`; // Wrapping JSON data in the callback function
    res.send(jsonDataP);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
