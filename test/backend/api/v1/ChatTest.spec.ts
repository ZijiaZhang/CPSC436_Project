import chai, {expect} from 'chai';
import {Chat} from "../../../../src/backend/Models";
import mongoose = require("mongoose");
import chaiHttp = require('chai-http');

chai.use(chaiHttp);


describe('Chats', () => {
    before(async ()=>{
        process.env.DB_CONNECTION_STRING = 'mongodb://localhost:27017/test_project';
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true});
        mongoose.connection.on('error', () => expect.fail('Error connecting to db'));
        const clear_chat = Chat.deleteMany({});
        await clear_chat.exec();
        await Chat.create({senderUsername: 'test1',
            receiverUsername: 'test2',
            content: 'This is a test message',
            time: new Date()});
        await mongoose.disconnect();
    });

    describe('Get all chats', () => {
        // TODO: Add test with mongodb
        it('it should GET all the chats', async () => {
            return chai.request(require('../../../../src/App').app)
                .get('/api/v1/chats')
                .query({sender_id: 'test1', receiver_id: 'test2'})
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body).have.key('allMessages');
                    expect(res.body.allMessages.length).eql(1);
                }).catch((err) => {
                    expect.fail('should not throw error' + err);
            })
        });

        it('it should raise bad request if no query specified', async () => {
            return chai.request(require('../../../../src/App').app)
                .get('/api/v1/chats')
                .query({aaa: 'test1', bbb: 'test2'})
                .then((res) => {
                    expect(res).have.status(400);
                    expect(res.body).have.key('message');
                    expect(res.body.message).eql('sender_id or receiver_id not found');
                }).catch((err) => {
                    expect.fail('should not throw error' + err);
                })
        });
    });

});
