import chai, {expect} from 'chai';
const mongoose = require("mongoose");
import chaiHttp = require('chai-http');
import {User} from "../../../../src/backend/models/UserModel";
import {Group} from "../../../../src/backend/models/GroupModel";
import {IGroup} from "../../../../src/shared/ModelInterfaces";

chai.use(chaiHttp);


describe('Group', () => {
    let app: any;
    let group_id: string;
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

    describe('Create Group', () => {
        before(async ()=>{
            const clear_group = Group.deleteMany({});
            await clear_group.exec();
        });

        it('it should Create a Group', async () => {
            return chai.request(app)
                .put('/api/v1/groups/testGroup')
                .auth('testUser', 'testPass')
                .then((res) => {
                    expect(res).have.status(200);
                    Group.findById(res.body._id).then(
                        (data: IGroup| null) => {
                            expect(data!.name).equals('testGroup');
                    }
                    ).catch(
                        (err) => {
                            expect.fail('should not throw error' + err);
                        }
                    )
                }).catch((err) => {
                    expect.fail('should not throw error' + err);
            })
        });
    });


    describe('Get Group', () => {
        before(async ()=>{
            const clear_group = Group.deleteMany({});
            await clear_group.exec();
            let response = await chai.request(app)
                .put('/api/v1/groups/testGroup')
                .auth('testUser', 'testPass');
            group_id = response.body._id;
        });

        it('it should Get a Group', async () => {
            return chai.request(app)
                .get('/api/v1/groups/'+group_id)
                .auth('testUser', 'testPass')
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body.name).equals('testGroup');
                }).catch((err) => {
                    expect.fail('should not throw error' + err);
                })
        });

        it('it should not Get a Group with wrong id', async () => {
            return chai.request(app)
                .get('/api/v1/groups/test')
                .auth('testUser', 'testPass')
                .then((res) => {
                    expect(res).have.status(404);
                }).catch((err) => {
                    expect.fail('should not throw error' + err);
                })
        });
    });


    describe('Add user Test', () => {
        beforeEach(async ()=>{
            const clear_chat = Group.deleteMany({});
            await clear_chat.exec();
            let response = await chai.request(app)
                .put('/api/v1/groups/testGroup')
                .auth('testUser', 'testPass');
            group_id = response.body._id;
        });

        it('it should add user correctly', async () => {
             return chai.request(app)
                .post('/api/v1/groups')
                .auth('testUser', 'testPass')
                .set('content-type', 'application/json')
                .send({
                    groupID: group_id,
                    username: 'testUser2'
                }).then((res) => {
                    expect(res).have.status(200);
                    expect(res.body.users).contains('testUser2')
                 }).catch((err) => {
                     expect.fail('should not throw error' + err)
                 });
        });

        it('it should not add user if the auth user is not in the group', async () => {
            return chai.request(app)
                .post('/api/v1/groups')
                .auth('testUser2', 'testPass')
                .set('content-type', 'application/json')
                .send({
                    groupID: group_id,
                    username: 'testUser2'
                }).then((res) => {
                    expect(res).have.status(401);
                }).catch((err) => {
                    expect.fail('should not throw error' + err)
                });
        });

        it('it should not add user if the user is already in the group', async () => {
            await chai.request(app)
                .post('/api/v1/groups')
                .auth('testUser', 'testPass')
                .set('content-type', 'application/json')
                .send({
                    groupID: group_id,
                    username: 'testUser2'
                }).then((res) => {
                    expect(res).have.status(200);
                    expect(res.body.users).contains('testUser2')
                }).catch((err) => {
                    expect.fail('should not throw error' + err)
                });
            return chai.request(app)
                .post('/api/v1/groups')
                .auth('testUser', 'testPass')
                .set('content-type', 'application/json')
                .send({
                    groupID: group_id,
                    username: 'testUser2'
                }).then((res) => {
                    expect(res).have.status(409);
                }).catch((err) => {
                    expect.fail('should not throw error' + err)
                });
        });
    });

});
