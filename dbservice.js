
require('dotenv').config()

const Pool = require('pg').Pool;

const conopts = {
  // user: process.env.PGUSER,
  // password: process.env.PGPASSWORD,
  // DATABASE_URL: 'postgres://lzmovuwmlnwgog:c392d8857c57cf3ab607586434c08cf445369d536b53c7833231c0f507a3fe09@ec2-54-246-92-116.eu-west-1.compute.amazonaws.com:5432/dc7l8hdpr0tbic',
  // database: 'dc7l8hdpr0tbic'
  connectionString: process.env.DATABASE_URL,
  ssl: true,
};

const pool = new Pool(conopts);

function getAllData(table_name) {
  return pool.connect()
    .then(client => {
      let sql = "SELECT * FROM " + table_name + ";";
      return client.query(sql)
        .then(res => {
          client.release();
          for (let row of res.rows) {
            console.log(JSON.stringify(row));
          }
          return res.rows;
        })
        .catch(err => {
          client.release();
          throw error;
        });
    });
};


function addQuote(quote, response) {
  console.log(quote)
  return pool.connect()
    .then(client => {
      const kysely = {
        text: "insert into generator(quote, class) values($1::text, $2::text) RETURNING *",
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

module.exports = { getAllData, addQuote };