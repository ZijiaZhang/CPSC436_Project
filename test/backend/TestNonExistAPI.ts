import chai from 'chai';
import chaiHttp = require('chai-http');
import {expect} from "chai";
chai.use(chaiHttp);

describe('Non-Exist-API', () => {
    let Server:any;
    describe('Query some random endpoint', () => {
        it('it should return 404', () => {
            Server = require("../../src/App");
            return chai.request(Server.app)
                .get('/non-exist-api')
                .then((res) => {
                    expect(res).have.status(404);
                    expect(res.body).have.key('message');
                    expect(res.body.message).eql('Requested file not find');
                }).catch((err) => {
                    expect.fail(err);
            });
        });
    });

    after(() =>
    {
        Server.stop_server();
        delete require.cache[require.resolve( '../../src/App' )]
    })
});