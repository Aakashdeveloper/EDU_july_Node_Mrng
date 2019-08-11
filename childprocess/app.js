const cluster  = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if(cluster.isMaster){
    masterProcess();
} else {
    childProcess();
}

function masterProcess(){
    console.log(`Master ${process.pid} is running`);

    for(let i = 0; i< numCPUs; i++){
        console.log(`Forking process number ${i} ...`)
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} removed`);
        console.log('Forking a new process after calculating....')
        cluster.fork();
    })
}

function childProcess(){
    console.log(`Worker ${process.pid} started....`);

    http.createServer((req,res) => {
        res.writeHead(200);
        res.end('Running on multi core')

        process.exit(1);
    }).listen(5500);
}
