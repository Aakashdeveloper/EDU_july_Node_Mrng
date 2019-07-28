import express from 'express';
const app = express();
const port = 8600;

app.get('/', (req,res) => {
    res.send("Welcome to es6");
})

app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Running on port ${port}`)
});