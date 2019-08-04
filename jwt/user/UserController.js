const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const LocalStorage = require('node-localstorage').LocalStorage;
const config = require('../config');
const jwt = require('jsonwebtoken');
localStorage = new LocalStorage('./scratch');

app.set('view engine', 'ejs');
app.set('views', './views');
//Static file path
app.use(express.static(__dirname+'/public'));

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
const User = require('./User');

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/profile', (req,res) => {
    var token = localStorage.getItem('authtoken');
    if(!token) {
        res.redirect('/signin')
    }       
    jwt.verify(token, config.secert, (err, decoded) => {
        if(err) {
            res.redirect('/signin')
        }
        User.findById(decoded.id, {password:0}, (err,user) => {
            if(err) {res.redirect('/signin')}
            if(!user) {res.redirect('/signin')}

            res.render('profile',{user});
        })
    })
});

router.get('/logout', (req,res) => {
    localStorage.removeItem('authtoken');
    res.redirect('/signin')
})

module.exports = router;
