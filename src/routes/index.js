const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) =>{
    res.render('index');
});

router.get('/signup', (req, res, next) =>{
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', (req, res, next) =>{
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
}));


router.use( (req, res, next) => {
    isAuthenticated(req, res, next);
    next();
});

router.get('/logout', (req, res, next) => {
    req.logOut();
    res.redirect('/');

});

router.get('/profile', (req, res, next) =>{
    res.render('profile');
});

router.get('/dashboard', (req, res, next) =>{
    res.send('dashboard');
});


function isAuthenticated ( req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signin');
};

module.exports = router;