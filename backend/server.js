const express = require('express');
const app = express();
const db = require('./db');
app.use(express.json());

// backend/server.js
// ...
app.get('/references', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM references');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/references', async (req, res) => {
  const { title, pdf_url } = req.body;
  await db.query('INSERT INTO references (title, pdf_url) VALUES ($1, $2)', [title, pdf_url]);
  res.sendStatus(201);
});

app.put('/references/:id', async (req, res) => {
  const { title, pdf_url } = req.body;
  await db.query('UPDATE references SET title = $1, pdf_url = $2 WHERE id = $3', [title, pdf_url, req.params.id]);
  res.sendStatus(200);
});

app.delete('/references/:id', async (req, res) => {
  await db.query('DELETE FROM references WHERE id = $1', [req.params.id]);
  res.sendStatus(204);
});

app.listen(3000, '0.0.0.0', () => console.log('Backend running on port 3000'));