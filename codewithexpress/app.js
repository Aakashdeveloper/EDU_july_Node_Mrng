var express = require('express');
var fs = require('fs')
var app = express();
var port = process.env.port || 6700;

app.get('/', function(req,res){
    res.send('Yes this is express')
});

app.get('/movies', function(req,res){
    fs.readFile('movies.json',function(err,data){
        if(err) throw err;
        res.send(JSON.parse(data))
    })
   
});


app.get('/products', function(req,res){
    fs.readFile('product.json',function(err,data){
        if(err) throw err;
        res.send(JSON.parse(data))
    })
   
});

app.listen(port,function(err){
    if(err) throw err;
    console.log('server is running on port '+port)
});



Delay(2, ()=> {
    delay1((a)=>{
        console.log('final output', a)
    })
})