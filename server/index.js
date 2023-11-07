const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials:true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(session({
  key: "userID",
  secret: "subscribe",
  resave: false,
  saveUninitialized: false,
  cookie:{
    expires: 60 * 60 * 10, 
  }
}))


app.use(function (err, req, res, next) {
  if (err.status) {
    // Handle known errors with specific HTTP status codes
    res.status(err.status).json({ error: err.message });
  } else {
    // Handle other unexpected errors
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



var homeRouter = require('./routes/home');


app.use('/',homeRouter);



app.listen(3001, () => {
    console.log(`Server is running on port 3001.`);
  });