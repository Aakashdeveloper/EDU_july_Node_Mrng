var express = require('express');
var app = express();
var port = 7800;

//Static file path
app.use(express.static(__dirname+'/public'));
//Html path
app.set('views', './src/views');
app.set('view engine', 'ejs');

var menu = [
    {name:'Home', link:'/'},
    {name:'Movies', link:'/movies'},
    {name:'Artists', link:'/artist'}
]

var moviesRouter = require('./src/routes/moviesRoutes')(menu);
var artistRouter = require('./src/routes/ArtistsRoute')(menu);

app.use('/movies', moviesRouter);
app.use('/artist', artistRouter);

app.get('/',function(req,res){
    res.render('index',{title:'Home Page', 
                        menu:menu})
});

app.listen(port,function(err){
    if(err) throw err;
    else {
        console.log("app is running on the port "+ port);
    }
})
