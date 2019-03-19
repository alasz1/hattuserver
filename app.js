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

// Get messages
router.get('/getdata/:table_name', parser, function (req, res) {
    console.log(req.params.table_name);
     dbserv.getAllData(req.params.table_name).then(data => { res.json(data) });
 })

 // Post Quote
 router.post('/addquote', parser, function (req, res) {
    dbserv.addQuote(req).then(data => { (data => { res.json(data) }); }); 
    //res.redirect('/messages/' +  req.body.table_name);
})

 app.use('/api', router);

 let server = app.listen(3000, () => {
     console.log(`Server listening on ${server.address().port}`);
 });