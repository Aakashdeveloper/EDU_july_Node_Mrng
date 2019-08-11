let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);


describe('Testing my API', () => {
    it('should be return status 200 for default', (done) => {
        chai
            .request('http://localhost:6789')
            .get('/')
            .then((res) =>{
                expect(res).to.have.status(200);
                done();
            })
            .catch((err) => {
                throw err
            })
    })

    it('Should return true for getdata route', (done) => {
        chai 
            .request('http://localhost:6789')
            .get('/getData') 
            .then((res) =>{
                expect(res).to.have.status(200);
                done();
            })
            .catch((err) => {
                throw err
            })
    })

    it('should insert data', (done) => {
            chai
            .request('http://localhost:6789').post('/addData')
            .send({name:'ABC', subject:'ML'})
            .expect(201)
            .end((err,res) => {
                done(err)
            })
    })
})