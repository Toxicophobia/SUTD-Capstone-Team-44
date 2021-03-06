var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Data_Lake');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function(callback) {
    //The code in this asynchronous callback block is executed after connecting to MongoDB.
    console.log('Successfully connected to MongoDB.');
});


var app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
