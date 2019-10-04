const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('morgan');
const auth = require('./middleware/auth');
// routers
const userRouter = require('./routes/userRoute');
// config
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
// middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());


// connecting db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.then((db) => {
    console.log("Connected correctly to db");
  }, (err) => {
    console.log(err);
  });
// routes
app.use('/api/user', userRouter);



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port, () => {
    console.log(`Connected to the server at http://localhost:${port}`);
});
