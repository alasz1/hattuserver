const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var parser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());
var router = express.Router();
//const fs = require('fs');

const dbserv = require("./dbservice");
var cors = require('cors');
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Get Messages from Bingo
app.get('/api/bingo', function (req, res) {
     dbserv.getBingoData().then(data => { res.json(data) });
 })

 // Get generator quotes
 app.get('/api/generaattori', function (req, res) {
     dbserv.getGeneratorData().then(data => { res.json(data) });
 })


 // Post Quote to Generator
app.post('/api/bingo', function (req, res) {
    console.log(req.body)
    dbserv.addQuote(req, res).then(data => { res.json(data) }); 
    //res.redirect('/messages/' +  req.body.table_name);
})

 app.use('/api', router);

//  let server = app.listen(3000, () => {
//      console.log(`Server listening on ${server.address().port}`);
//  });

// app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`));

app.listen(process.env.PORT || 5000);

// app.listen(port, function() {
//     console.log('Our app is running on http://localhost:' + port);
// });