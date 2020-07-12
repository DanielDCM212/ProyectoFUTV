const express = require('express');
const router = express.Router();
const passport = require('passport');

const Card = require('../models/cards');
const { response } = require('express');

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
    //next();
});

router.get('/logout', (req, res, next) => {
    req.logOut();
    res.redirect('/');
});


router.get('/profile', async (req, res) => {
    const user_id = req.user._id;
    
    // Card.findOne({userID: user_id})
    //     .then(data => {
    //         res.render('profile', {data});
    //     })
    //     .catch(err => console.log(err));

    console.log(req.user._id);
    try {
        const data = await Card.findOne({userID:req.user._id});
        console.log(data);
        res.render('profile', {
            data
        });
        
    } catch (error) {
        console.log(error);
    }
});

router.get('/card', (req, res ) =>{
    res.render('card');
});

router.get('/history', async function name (req, res, next) {
    res.render('history');
});


router.post('/card', async (req, res, next) => {
    // const card = await Card.findOne({ userID: req.body.userID });
    // console.log( card );
    const card = new Card(req.body);
    await card.save();
    console.log(card);
    res.redirect("profile");
    
});

router.get('/pay', (req, res, next) =>{
    res.render('pay');
});

router.post('/pay', (req, res, next) =>{
    res.redirect('history');
});

function isAuthenticated ( req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signin');
}

module.exports = router;