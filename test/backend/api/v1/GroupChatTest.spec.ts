import chai, {expect} from 'chai';
const mongoose = require("mongoose");
import chaiHttp = require('chai-http');
import {User} from "../../../../src/backend/models/UserModel";
import {Group} from "../../../../src/backend/models/GroupModel";
import {GroupChat} from "../../../../src/backend/models/GroupChatModel";
import {IGroupChat} from "../../../../src/shared/ModelInterfaces";

chai.use(chaiHttp);


describe('GroupChats', () => {
    let app: any;
    let group_id: string;
    before(async() => {
        process.env.PORT = '6000';
        process.env.DB_CONNECTION_STRING = 'mongodb://localhost:27017/test_project';
        app = require('../../../../src/App').app;
        await mongoose.connect(process.env.DB_CONNECTION_STRING as string, {useNewUrlParser: true});
        mongoose.connection.on('error', () => expect.fail('Error connecting to db'));
        await User.deleteMany({}).exec();
        await Group.deleteMany({}).exec();
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

        let response = await chai.request(app)
            .put('/api/v1/groups/testGroup')
            .auth('testUser', 'testPass');
        group_id = response.body._id;

        await chai.request(app)
            .post('/api/v1/groups')
            .auth('testUser', 'testPass')
            .set('content-type', 'application/json')
            .send({
                groupID: group_id,
                username: 'testUser2'
            });
    });

    describe('Get all chats', () => {
        before(async ()=>{
            const clear_chat = GroupChat.deleteMany({});
            await clear_chat.exec();
            await GroupChat.create({senderUsername: 'testUser',
                groupChatID: group_id,
                content: 'This is a test message',
                time: new Date()});
        });

        it('it should GET all the chats', async () => {
            return chai.request(app)
                .get('/api/v1/group_chats')
                .auth('testUser', 'testPass')
                .query({group_id: group_id})
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
                .get('/api/v1/group_chats')
                .query({aaa: 'testUser', bbb: 'testUser2'})
                .auth('testUser', 'testPass')
                .then((res) => {
                    expect(res).have.status(400);
                    expect(res.body).have.key('message');
                    expect(res.body.message).eql('group_id not found');
                }).catch((err) => {
                    expect.fail('should not throw error' + err);
                })
        });
    });


    describe('Post chats', () => {
        before(async ()=>{
            const clear_chat = GroupChat.deleteMany({});
            await clear_chat.exec();
        });

        it('it should post chat correctly', async () => {
            return chai.request(app)
                .post('/api/v1/group_chats')
                .auth('testUser', 'testPass')
                .send({
                    sender_username: 'testUser',
                    group_id: group_id,
                    content: 'test string'
                })
                .then((res) => {
                    expect(res.body.senderUsername).equals('testUser');
                    expect(res.body.groupChatID).equals(group_id);
                    expect(res.body.content).equals('test string');
                    return GroupChat.find({senderUsername: 'testUser', groupChatID: group_id}).exec()
                        .then( (result: IGroupChat[])=>{
                            expect(result.length).equals(1)
                        })
                })
                .catch((err) => {
                    expect.fail('should not throw error' + err);
                })
        });

        it('it should not post chat if unauthorized', async () => {
            return chai.request(app)
                .post('/api/v1/group_chats')
                .send({
                    sender_username: 'testUser',
                    group_id: group_id,
                    content: 'test string'
                })
                .then((res) => {
                    expect(res).have.status(401);
                })
                .catch((err) => {
                    expect.fail('should not throw error' + err);
                })
        });
    });

});
