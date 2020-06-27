import chai from 'chai';
import chaiHttp = require('chai-http');
import {app} from "../../../../src/App";
import {expect} from "chai";
chai.use(chaiHttp);


describe('Chats', () => {

    describe('Get all chats', () => {
        // TODO: Add test with mongodb
        it('it should GET all the chats', (done) => {
            chai.request(app)
                .get('/api/v1/chats')
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body).have.key('allMessages');
                    expect(res.body.allMessages.length).eql(1);
                    done();
                }).catch((err) => {
                    throw err;
            });
        });
    });

});
