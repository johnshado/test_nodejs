const path = require('path');
const morgan = require('morgan')
const express = require('express');
const mongoose = require('mongoose');

const app = express();
var EJS  = require('ejs');

app.engine('html', EJS.renderFile);

//connect db
mongoose.connect('mongodb://localhost/invent')
  .then(db=>console.log('DB connected'))
  .catch(err=>console.log(err));

//importing Routes
const indexRoutes = require('./routes/index');

//Settings
var port = process.env.PORT ;
app.set('port', port || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/', indexRoutes);

//starting server
app.listen(app.get('port'),() =>{
  console.log(`server on port ${app.get('port')}`);
});
