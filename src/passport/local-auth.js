const passport = require('passport');
const LocalEstrategy = require('passport-local').Strategy;

const User = require('../models/user');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new LocalEstrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({'email': email});
    // console.log(user);
    if( user ){
        return done(null, false, req.flash('signupMessage','El email ya existe.'));
    }else{
        const newUser = new User();
        newUser.name = req.body.name;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        // console.log(user)
        await newUser.save();
        done(null, newUser);
    }
}));

passport.use('local-signin', new LocalEstrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = await User.findOne({email:email});

    if(!user){
        return done(null, false, req.flash('signinMessage',"Usuario no encontrado"));
    }
    if(!user.comparePassword(password)){
        return done(null, false, req.flash('signinMessage',"Password incorrecta"));
    }

    return done(null, user);
}));