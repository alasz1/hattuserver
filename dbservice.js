
require('dotenv').config()

const Pool = require('pg').Pool;
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

const conopts = {
  // username: process.env.PGUSER,
  // password: process.env.PGPASSWORD,
  user: 'lzmovuwmlnwgog',
  password: 'c392d8857c57cf3ab607586434c08cf445369d536b53c7833231c0f507a3fe09',
  //DATABASE_URL: 'postgres://lzmovuwmlnwgog:c392d8857c57cf3ab607586434c08cf445369d536b53c7833231c0f507a3fe09@ec2-54-246-92-116.eu-west-1.compute.amazonaws.com:5432/dc7l8hdpr0tbic',
  host: 'ec2-54-246-92-116.eu-west-1.compute.amazonaws.com',
  database: 'dc7l8hdpr0tbic',
  //connectionString: process.env.DATABASE_URL,
  //ssl: true,
  //sslmode: "require"
};

const pool = new Pool(conopts);

function getBingoData() {
  return pool.connect()
    .then(client => {
      let sql = "SELECT * FROM bingo;";
      return client.query(sql)
        .then(res => {
          client.release();
          return res.rows;
        })
        .catch(err => {
          client.release();
          throw error;
        });
    });
};

// const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });

// client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

function addQuote(quote, response) {
  console.log(quote)
  return pool.connect()
    .then(client => {
      const kysely = {
        text: "insert into generator(text, class) values($1::text, $2::text) RETURNING *",
        values: [quote.text, quote.class]
      };
      client.query(kysely, (error, results) => {
        if (error) {
          throw (error);
        }
        response.status(201).send(`Quote added`)
      });
    });
};

module.exports = { getBingoData, addQuote };