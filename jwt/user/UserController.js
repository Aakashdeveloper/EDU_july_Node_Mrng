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

module.exports = router;
