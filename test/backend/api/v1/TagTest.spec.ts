import chai from 'chai';
import chaiHttp = require('chai-http');
import {expect} from "chai";
import {Tag} from "../../../../src/backend/models/TagModel";
const mongoose = require('mongoose');
chai.use(chaiHttp);


describe('Tags', () => {

    describe('Tags apis', () => {
        let app: any;
        let tagId: string;

        before(async () => {
            process.env.DB_CONNECTION_STRING = 'mongodb://localhost:27017/test';
            await mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
            mongoose.connection.on('error', () => expect.fail("Error connecting to db"));
            await Tag.deleteMany({}).exec();
            app = require('../../../../src/App').app;
        });

        it('Should add a tag', async () => {
            return chai.request(app)
                .post('/api/v1/tags').send({name: "tag1"})
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body).to.include({name: "tag1"});
                    tagId = res.body._id;
                })
        });

        it('Should get all tags', async () => {
            return chai.request(app)
                .get(`/api/v1/tags`)
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body[0]).to.include({_id: tagId, name: "tag1"});
                })
        });

        it('Fail to add tag with empty name', async () => {
            return chai.request(app)
                .post('/api/v1/tags').send({})
                .then((res) => {
                    expect(res).have.status(500);
                })
        });
    });


});
