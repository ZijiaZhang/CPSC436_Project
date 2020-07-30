import chai, {expect} from 'chai';
const mongoose = require("mongoose");
import chaiHttp = require('chai-http');
import {Chat} from "../../../../src/backend/models/ChatModel";
import { IChat } from '../../../../src/shared/ModelInterfaces';
import {User} from "../../../../src/backend/models/UserModel";

chai.use(chaiHttp);


describe('Chats', () => {
    let app: any;
    let cookie: any;
    before(async() => {
        process.env.PORT = '6000';
        process.env.DB_CONNECTION_STRING = 'mongodb://localhost:27017/test_project';
        app = require('../../../../src/App').app;
        await mongoose.connect(process.env.DB_CONNECTION_STRING as string, {useNewUrlParser: true});
        mongoose.connection.on('error', () => expect.fail('Error connecting to db'));
        await User.deleteMany({}).exec();
        await chai.request(app)
            .post('/api/v1/users/register')
            .set('content-type', 'application/json')
            .send({
                username: 'testUser',
                password: 'testPass',
                fullname: 'fullname',
                pwdConfirm: 'testPass'
            });

        await chai.request(app)
            .post('/api/v1/users/register')
            .set('content-type', 'application/json')
            .send({
                username: 'testUser2',
                password: 'testPass',
                fullname: 'fullname',
                pwdConfirm: 'testPass'
            });
    });

    describe('Get all chats', () => {
        before(async ()=>{
            const clear_chat = Chat.deleteMany({});
            await clear_chat.exec();
            await Chat.create({senderUsername: 'testUser',
                receiverUsername: 'testUser2',
                content: 'This is a test message',
                time: new Date(), read: false});
        });

        it('it should GET all the chats', async () => {
            return chai.request(app)
                .get('/api/v1/chats')
                .auth('testUser', 'testPass')
                .query({sender_id: 'testUser', receiver_id: 'testUser2'})
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
                .query({aaa: 'testUser', bbb: 'testUser2'})
                .auth('testUser', 'testPass')
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
                .auth('testUser', 'testPass')
                .send({
                    sender_username: 'testUser',
                    receiver_username: 'testUser2',
                    content: 'test string'
                })
                .then((res) => {
                    expect(res.body.senderUsername).equals('testUser');
                    expect(res.body.receiverUsername).equals('testUser2');
                    expect(res.body.content).equals('test string');
                    return Chat.find({senderUsername: 'testUser', receiverUsername: 'testUser2'}).exec()
                        .then( (result: IChat[])=>{
                            expect(result.length).equals(1)
                        })
                })
                .catch((err) => {
                    expect.fail('should not throw error' + err);
                })
        });
    });

});
