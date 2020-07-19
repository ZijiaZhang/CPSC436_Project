import chai, {expect} from 'chai';
const mongoose = require('mongoose');
import chaiHttp = require("chai-http");
import {User} from "../../../../src/backend/models/UserModel";

chai.use(chaiHttp);

describe('User', ()=> {
    describe("Get all users", ()=> {
        let app: any;
        before(async()=> {
            process.env.DB_CONNECTION_STRING = 'mongodb://localhost:27017/test';
            await mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
            mongoose.connection.on('error', ()=> expect.fail("Error connecting to db"));
            const clear_user = User.deleteMany({});
            await clear_user.exec();
            app= require('../../../../src/App').app;            
        });

        it('get user by id', async ()=>{
            await chai.request(app)
                .post('/api/v1/users/register')
                .set('content-type', 'application/json')
                .send({
                    username: 'testUser',
                    password: 'testPass',
                    fullname: 'fullname',
                    pwdConfirm: 'testPass'
                });
            return chai.request(app)
                .get('/api/v1/users/testUser')
                .auth('testUser', 'testPass')
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body.username).equals('testUser');
                }).catch((err) => {
                    expect.fail('should not throw error' + err);
                })
        });

        it('should not get user by id if not authorized', async ()=>{
            await chai.request(app)
                .post('/api/v1/users/register')
                .set('content-type', 'application/json')
                .send({
                    username: 'testUser',
                    password: 'testPass',
                    fullname: 'fullname',
                    pwdConfirm: 'testPass'
                });
            return chai.request(app)
                .get('/api/v1/users/testUser')
                .then((res) => {
                    expect(res).have.status(401);
                }).catch((err) => {
                    expect.fail('should not throw error' + err);
                })
        });

        it('register one test user', async() => {
            return chai.request(app)
            .post('/api/v1/users/register').send({username: "test",fullname: "test", password: "test", pwdConfirm: "test"})
            .then((res) => {
                expect(res).have.status(200);
                expect(res.redirects[0].endsWith('/login'));
            })
        });

        it('register one test user already exists', async() => {
            return chai.request(app)
            .post('/api/v1/users/register').send({username: "test", fullname: "test", password: "test", pwdConfirm: "test"})
            .then((res) => {
                expect(res.redirects[0].endsWith('/register?err=A%20user%20with%20the%20given%20username%20is%20already%20registered'));
            })
        });

        it('register one test user no full name given', async() => {
            return chai.request(app)
            .post('/api/v1/users/register').send({username: "test",fullname: null, password: "test", pwdConfirm: "test"})
            .then((res) => {
                expect(res).have.status(200);
                expect(res.redirects[0].endsWith('/register?err=No%20fullname%20was%20given'));
            })
        });

        it('register one test user Password Confirm Password not match', async() => {
            return chai.request(app)
            .post('/api/v1/users/register').send({username: "test",fullname: "test", password: "test", pwdConfirm: "32132"})
            .then((res) => {
                expect(res.redirects[0].endsWith('/register?err=Password%20and%20confirm%20password%20do%20not%20match'));
            })
        });

        it('login test user', async() => {
            return chai.request(app)
            .post('/api/v1/users/login').send({username: "test", password: "test"})
            .then((res) => {
                expect(res).have.status(200);
                expect(res.redirects[0].endsWith('/'));
            })
        });

        it('login test user wrong password', async() => {
            return chai.request(app)
            .post('/api/v1/users/login').send({username: "test", password: "weewrewrewre"})
            .then((res) => {
                expect(res.redirects[0].endsWith('/login?err=Password%20or%20username%20is%20incorrect'));
            })
        });

        it('get test user', async() => {
            return chai.request(app)
            .get('/api/v1/users')
            .then((res) => {
                expect(res).have.status(200);
            })
        });


        it('logout test user', async() => {
            return chai.request(app)
            .get('/api/v1/users/logout')
            .then((res) => {
                expect(res).have.status(200);
                expect(res.redirects[0].endsWith('/login'));
            })
        });

        it('update user', async() => {
            return chai.request(app)
                .patch('/api/v1/users/test').send({fullname: 'newFullname'})
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body).to.include({username: "test", fullname: 'newFullname'})
                })
        });

        it('update user with wrong username', async() => {
            return chai.request(app)
                .patch('/api/v1/users/randomUsername').send({fullname: 'newFullname'})
                .then((res) => {
                    expect(res).have.status(400);
                })
        });

        it('update user with year', async() => {
            return chai.request(app)
                .patch('/api/v1/users/test').send({level: 'master'})
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body).to.include({username: "test", fullname: 'newFullname',  level: 'master'})
                })
        });
    })
});
