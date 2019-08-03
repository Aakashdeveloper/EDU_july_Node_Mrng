const app = require('./app');
const express = require('express');
const port = process.env.port || 7801;
const session = require('express-session');

app.use(session({secret:'edurekaSecert'}));
app.set('view engine', 'ejs');
app.set('views', './views');
//Static file path
app.use(express.static(__dirname+'/public'));

let sess;
app.get('/signin', (req,res) => {
    sess= req.session;
    res.render('index')
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})