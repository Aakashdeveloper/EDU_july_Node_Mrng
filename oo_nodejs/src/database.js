const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";

const maincall = (myObj) => {
    MongoClient.connect(url, (err,db) => {
        if(err) throw err;
        var dbo = db.db('testdatajuly');
        dbo.collection('first').insertOne(myObj, (err) => {
            if(err) throw err;
            console.log('data inserted');
            db.close();
        })
    })
}

//Get


//post
maincall.prototype.postData = (colName, myObj) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db('testdatajuly')
        dbo.collection(colName).insertOne(myObj, (err,result) => {
                if(err) throw err
                console.log('data inserted')
                db.close();
            })
    })
    let out = "Data instered"
    return out

}

//put
maincall.prototype.putData = (colName,query, myObj) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db('testdatajuly')
        dbo.collection(colName).update(query, myObj, (err,result) => {
                if(err) throw err
                console.log('data Updated')
                db.close();
            })
    })
}

// Delete
maincall.prototype.deleteData = (colName,query) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db('testdatajuly')
        dbo.collection(colName).deleteOne(query,(err,result) => {
                if(err) throw err
                console.log('data Deleted')
                db.close();
            })
    })
}

module.exports = maincall