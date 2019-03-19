
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
  DATABASE_URL: 'postgres://lzmovuwmlnwgog:c392d8857c57cf3ab607586434c08cf445369d536b53c7833231c0f507a3fe09@ec2-54-246-92-116.eu-west-1.compute.amazonaws.com:5432/dc7l8hdpr0tbic',
  host: 'ec2-54-246-92-116.eu-west-1.compute.amazonaws.com',
  database: 'dc7l8hdpr0tbic',
  //connectionString: process.env.DATABASE_URL,
  ssl: true,
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

module.exports = { getBingoData, addQuote };