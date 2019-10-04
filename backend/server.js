const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('./middleware/auth');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.then((db) => {
    console.log("Connected correctly to db");
  }, (err) => {
    console.log(err);
  });

app.listen(port, () => {
    console.log(`Connected to the server at http://localhost:${port}`);
});
