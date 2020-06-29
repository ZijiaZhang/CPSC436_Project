import chai, {expect} from 'chai';
import {User} from '../../../../src/backend/Models';
const mongoose = require('mongoose');
import chaiHttp = require("chai-http");

describe('User', ()=> {
    describe("Get all users", ()=> {
        let app: any;
        before(async()=> {
            process.env.DB_CONNECTION_STRING = 'mongodb://127.0.0.1:27017/test';
            await mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
            mongoose.connection.on('error', ()=> expect.fail("Error connecting to db"));
            const clear_user = User.deleteMany({});
            await clear_user.exec();
            app= require('../../../../src/App').app;            
        });

        it('register one test user', async() => {
            return chai.request(app)
            .post('/api/v1/users/register').send({username: "test", password: "test", pwdConfirm: "test"})
            .then((res) => {
                expect(res).have.status(200);
                expect(res.redirects[0].endsWith('/login'));
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
    })
})
