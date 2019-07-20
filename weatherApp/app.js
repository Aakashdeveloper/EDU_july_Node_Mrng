var express = require('express');
var app = express();
var port = process.env.port || 9000;
var request = require('request');

const ApiUrl =  'http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29'

app.use(express.static(__dirname+'/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.send('Code is Working')
});

function getWeather(url) {
    // Setting URL and headers for request
    var options = {
        url: ApiUrl,
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise 
    return new Promise(function(resolve, reject) {
        // Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}

app.get('/weatherwithpromisse',(req,res) => {
    var dataPromise = getWeather();
    // Get user details after that get followers from URL
    dataPromise.then(JSON.parse)
               .then(function(result) {
                    res.render('weatherView',{output:result,title:'***Weather App***'})
                })
})

app.get('/weather', function(req,res){
    request(ApiUrl, function(err,response,body){
        if(err){
            res.status(404).send('error in API')
        }else {
            var output = JSON.parse(body)
            //  res.status(200).send(output)
            console.log(response)
            res.render('weatherView',{title:'Weather App',output:output})
        }
    })
})


app.listen(port, function(err){
    if(err) throw err;
    console.log('Server is running on port '+port)
})