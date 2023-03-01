const express = require('express');
const router = express.Router();
const User = require('../models/User')
const passport = require('passport');

router.get('/register', (req, res)=>{
    res.render('auth/signup');
});


//register a new user
router.post('/register', async(req, res)=>{
    try{
        const {username, password, email, userType} = req.body;
        const user = new User({username, email, userType});
        await User.register(user, password);
        req.flash('success', 'New User Registered Successfully')
        res.redirect('/login');
    }
    catch(e){
        console.log(e);
    }
});

//get login page
router.get('/login', (req, res)=>{
    res.render('auth/login');
});

//login a user
router.post('/login', passport.authenticate('local', {
    failureRedirect : 'login',
    failureMessage : true,
    failureFlash : "You need to login first"
}), (req, res)=>{
    req.flash('success', `Welcome! ${req.user.username}`);
    res.redirect('products');
});

//logout
router.get('/logout', (req, res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        else{
            req.flash('success', 'Good Bye!');
            res.redirect('/login');
        }
    });
});

module.exports = router;