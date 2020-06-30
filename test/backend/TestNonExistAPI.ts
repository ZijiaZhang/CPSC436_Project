import chai from 'chai';
import chaiHttp = require('chai-http');
import {expect} from "chai";
chai.use(chaiHttp);

describe('Non-Exist-API', () => {
    describe('Query some random endpoint', () => {
        it('it should return 404', (done) => {
            let Server = require("../../src/App");
            chai.request(Server.app)
                .get('/non-exist-api')
                .then((res) => {
                    Server.stop_server();
                    expect(res).have.status(404);
                    expect(res.body).have.key('message');
                    expect(res.body.message).eql('Requested file not find');
                    done();
                }).catch((err) => {
                    Server.stop_server();
                    expect.fail(err)
            });
        });
    });

});