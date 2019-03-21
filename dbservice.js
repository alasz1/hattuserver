
require('dotenv').config()

const Pool = require('pg').Pool;
// const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });

const conopts = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  DATABASE_URL: process.env.DATABASE_URL,
  host: process.env.HOST,
  database: process.env.DATABASE,
  //connectionString: process.env.DATABASE_URL,
  ssl: true,
  //sslmode: "require"
};

// const pool = new Pool(conopts);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

function getBingoData() {
  return pool.connect()
    .then(client => {
      let sql = "SELECT * FROM bingo ORDER BY RANDOM() LIMIT 16;";
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

function getGeneratorData() {
  return pool.connect()
    .then(client => {
      let sql = "SELECT * FROM generator ORDER BY RANDOM() LIMIT 1;";
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

// function addQuote(q, response) {
//   console.log(q)
//   return pool.connect()
//     .then(client => {
//       const kysely = {
//         text: 'insert into bingo(quote) values('+ quote +')',
//         values: [q]
//       };
//       client.query(kysely, (error, results) => {
//         if (error) {
//           throw (error);
//         }
//         //response.status(201).send(`Quote added`)
//       });
//     });
// };

const addQuote = (request, response) => {
  const { quote } = request.body

  pool.query('INSERT INTO bingo (quote) VALUES ($1)', [quote], (error, results) => {
    if (error) {
      throw error
    }
    //response.status(201).send(`Quote added`)
    console.log("quote added")
  })
}

module.exports = { getBingoData, addQuote, getGeneratorData };