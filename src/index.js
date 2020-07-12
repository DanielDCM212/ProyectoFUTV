const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

// Configuracion para HTTPS //
// const fs = require("fs");
// const https = require("https");

// const PORT = 443;
// initializations
const app = express();


// https.createServer({
//     key: fs.readFileSync("CA.key"),
//     cert: fs.readFileSync('CA.crt')
// }, app).listen(PORT, function(){
//     console.log("My https server listening on port " + PORT + "...");
// });

require('./database');
require('./passport/local-auth');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'DanielDaniloCuevasMendez',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res , next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    next();
});

// routes
app.use('/', require('./routes/index'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
