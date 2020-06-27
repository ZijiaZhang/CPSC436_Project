import chai from 'chai';
import chaiHttp = require('chai-http');
import {app} from "../../src/App";
import {expect} from "chai";
chai.use(chaiHttp);

describe('Non-Exist-API', () => {

    describe('Query some random endpoint', () => {
        it('it should return 404', (done) => {
            chai.request(app)
                .get('/non-exist-api')
                .then((res) => {
                    expect(res).have.status(404);
                    expect(res.body).have.key('message');
                    expect(res.body.message).eql('Requested file not find');
                    done();
                }).catch((err) => {
                throw err;
            });
        });
    });

});