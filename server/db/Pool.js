const { Pool} = require('pg');


const pool = new Pool({
  user: 'asctkouw',
  host: 'cornelius.db.elephantsql.com',
  database: 'asctkouw',
  password: 'lHHzLeAaFX2496CrIuvkJyNNpAMp0Ftr',
  port: 5432,
  max:10,
  idleTimeoutMillis: 30000
});

module.exports = pool;