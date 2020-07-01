import chai, {expect} from 'chai';
import {Chat, databaseChat} from "../../../../src/backend/Models";
import mongoose = require("mongoose");
import chaiHttp = require('chai-http');

chai.use(chaiHttp);


describe('Chats', () => {
    let app: any;
    before(async() => {
        process.env.DB_CONNECTION_STRING = 'mongodb://localhost:27017/test_project';
        app = require('../../../../src/App').app;
        await mongoose.connect(process.env.DB_CONNECTION_STRING as string, {useNewUrlParser: true});
        mongoose.connection.on('error', () => expect.fail('Error connecting to db'));
    });

    describe('Get all chats', () => {


        before(async ()=>{
            const clear_chat = Chat.deleteMany({});
            await clear_chat.exec();
            await Chat.create({senderUsername: 'test1',
                receiverUsername: 'test2',
                content: 'This is a test message',
                time: new Date()});
        });

        it('it should GET all the chats', async () => {
            return chai.request(app)
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
            return chai.request(app)
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


    describe('Post chats', () => {
        before(async ()=>{
            const clear_chat = Chat.deleteMany({});
            await clear_chat.exec();
        });

        it('it should post chat correctly', async () => {
            return chai.request(app)
                .post('/api/v1/chats')
                .send({
                    sender_username: 'test-user1',
                    receiver_username: 'test-user2',
                    content: 'test string'
                })
                .then((res) => {
                    expect(res.body.senderUsername).equals('test-user1');
                    expect(res.body.receiverUsername).equals('test-user2');
                    expect(res.body.content).equals('test string');
                    return Chat.find({senderUsername: 'test-user1', receiverUsername: 'test-user2'}).exec()
                        .then( (result: databaseChat[])=>{
                            expect(result.length).equals(1)
                        })
                })
                .catch((err) => {
                    expect.fail('should not throw error' + err);
                })
        });
    });

});
