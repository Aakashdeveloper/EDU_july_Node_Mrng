const express = require('express');
const router = express.Router();
const app = express();
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch')
// For parsing form sata
const bodyParser = require('body-parser');
// For validating and generating token
const jwt = require('jsonwebtoken');
// For encode password
const bcrypt = require('bcryptjs');
// For secert token
const config = require('../config');
// For user schema
const User = require('../user/User');
const session = require('express-session');

router.use(session({secret:'edurekaSecert1', resave:false, saveUninitialized:true}));

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/register', (req,res) =>  {
    const hashedPasword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPasword
    }, (err, user) => {
        if(err) return res.status(500).send('There was a problem registering user')
        /*var token = jwt.sign({id: user._id}, config.secert,{
            expiresIn: 86400 // expire in 24 hours
        });*/
       //res.send('Registration successful')
       const string = encodeURIComponent('SuccessFully Regsiter Please Login Now');
       res.redirect('/signin?msg=' + string)
    })
});

router.post('/login', (req,res) => {
    User.findOne({email: req.body.email}, (err,user) => {
        if(err) return res.status(500).send('Error on the server');
        if(!user) { res.send('Not Registered USer')}
        else{
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if(!passwordIsValid) return res.status(401).send({auth: false, token:null});
            var token = jwt.sign({id: user._id}, config.secert,{
                expiresIn:86400// expire in 24 hours
            });
            console.log('in login')
            localStorage.setItem('authtoken',token);
            res.redirect('/users/profile');
        }
    })
});

router.get('/loginedUer', (req,res) =>{
    var token = req.headers['x-access-token'];
    if(!token) res.status(401).send({auth:false, message:'No Token Provided'});

    jwt.verify(token, config.secert, (err, decoded) => {
        if(err) return res.status(401).send({auth:false,
                                             message: 'Failed to authenticate'});
        console.log(decoded);
        User.findById(decoded.id, {password:0}, (err,user) => {
            if(err) res.status(500).send('There is problem finding user');
            if(!user) res.status(404).send('No User Found');

            res.send(user);
        })
    })
})



module.exports = router;

