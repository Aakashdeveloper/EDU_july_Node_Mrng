import express from 'express';
import mongo from 'mongodb';
const MongoClient = mongo.MongoClient;
import bodyParser from 'body-parser';
const app = express();
const port = 7600;
let db;
const mongourl='mongodb://127.0.0.1:27017/'
const col_name="mydata";
// Static file path
app.use(express.static(__dirname+'/public'));
// Html or view file
app.set('views','./src/views');
// template engine
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',(req,res) => {
    db.collection(col_name).find().toArray((err,result) => {
        if(err) throw err;
        res.render('index',{data:result})
    })
})

app.post('/addUser',(req,res) => {
    db.collection(col_name)
        .insertOne(req.body,(err,result) => {
            if(err){
                res.status(401)
            }else{
               res.redirect('/')
            }
        })
});

app.post('/find_by_name',(req,res) => {
    let name = req.body.name;
    db.collection(col_name)
        .find({name:name})
        .toArray((err,result) => {
            if(err) throw err;
            res.send(result)
        })
});

app.put('/updateuser',(req,res) =>  {
    db.collection(col_name)
        .findOneAndUpdate({"name": req.body.name},{
            $set:{
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                class:req.body.class
            }
        },{
            upsert:true
        },(err,result) => {
            if(err) throw err;
            res.send(result)
        })
})

app.delete('/deleteUser',(req,res) => {
    db.collection(col_name).findOneAndDelete({
        "name":req.body.name
    },(err,result) => {
        if(err) res.status(500).send(err)
        res.send({"messgae":"deleted"})
    })
})

app.get('/new',(req,res)=>{
    res.render('admin')
})

MongoClient.connect(mongourl,(err,client) => {
    if(err) throw err;
    db =client.db('classpractice');
    app.listen(port,(err)=>{
        console.log(`server is running on port ${port}`)
    });
})

