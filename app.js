'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql      = require('mysql');

const connection = mysql.createConnection({
  host     : '35.197.142.230',
  user     : 'dpuenglish',
  password : 'dpi!123eng#lish',
  database : 'toeic2019'
});

connection.connect();
const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/dictionary', (req, res) => {
  let search = req.body.search;
  connection.query("SELECT * FROM amazontoeic WHERE Entry LIKE '"+ search + "%';", function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.status(200).send(results).end();
  });
});

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;