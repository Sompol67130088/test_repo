const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

// GET all references
app.get('/references', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM references_data');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST new reference
app.post('/references', async (req, res) => {
  const { title, pdf_url } = req.body;
  try {
    await db.query(
      'INSERT INTO references_data (title, pdf_url) VALUES ($1, $2)',
      [title, pdf_url]
    );
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// PUT update reference
app.put('/references/:id', async (req, res) => {
  const { title, pdf_url } = req.body;
  try {
    await db.query(
      'UPDATE references_data SET title = $1, pdf_url = $2 WHERE id = $3',
      [title, pdf_url, req.params.id]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE reference
app.delete('/references/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM references_data WHERE id = $1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Start server
app.listen(3000, () => {
  console.log('Backend running on port 3000');
});
