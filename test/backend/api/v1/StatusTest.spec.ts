import chai, {expect} from 'chai';
const mongoose = require("mongoose");
import chaiHttp = require('chai-http');
import {Chat} from "../../../../src/backend/models/ChatModel";
import { IChat } from '../../../../src/shared/ModelInterfaces';
import {Status} from "../../../../src/backend/models/StatusModel";

chai.use(chaiHttp);


describe('Status', () => {
    let app: any;
    before(async() => {
        process.env.PORT = '6000';
        process.env.DB_CONNECTION_STRING = 'mongodb://localhost:27017/test_project';
        app = require('../../../../src/App').app;
        await mongoose.connect(process.env.DB_CONNECTION_STRING as string, {useNewUrlParser: true});
        mongoose.connection.on('error', () => expect.fail('Error connecting to db'));
        await Status.deleteMany({}).exec();
    });

    describe('Get Status', () => {

        it('it should GET all the Status', async () => {
            let data = {apiName: 'testApi', method: 'GET', count: 1, statusCode: 200};
            await Status.create(data);
            return chai.request(app)
                .get('/api/v1/status')
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body.length).equals(1);
                    expect(res.body[0].apiName).equals(data.apiName);
                    expect(res.body[0].method).equals(data.method);
                    expect(res.body[0].count).equals(data.count);
                    expect(res.body[0].statusCode).equals(data.statusCode);
                }).catch((err) => {
                    expect.fail('should not throw error' + err);
            })
        });
    });
});
