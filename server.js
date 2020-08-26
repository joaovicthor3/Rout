const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');


// set up express app
const app = express();

//set up createServer

app.use(cors());

// set view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, //a day in milisseconds
  keys: [keys.session.cookieKey]
}));

// initialize passportSetup
app.use(passport.initialize());
app.use(passport.session());

// create home route
app.get('/', (req, res) => {
    res.render('home', { user : req.user });
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// connect to mongodb
mongoose.connect('mongodb://localhost/rout', { useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection.on('connected', () =>{
  console.log('connected!');
});

// use body-parser middleware
app.use(bodyParser.json());

//nove_env
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/build'));
}

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(8000, function(){
    console.log('now listening for requests on port ', '8000');
});
