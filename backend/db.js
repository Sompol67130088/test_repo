const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'postgres', // ชื่อ service ของ database ใน docker-compose
  database: 'sompolcdb',
  password: 'secret',
  port: 5432,
});

module.exports = {
  query: async (text, params) => {
    try {
      const res = await pool.query(text, params);
      return res;
    } catch (err) {
      console.error('Database query error:', err);
      throw err;
    }
  },
};

