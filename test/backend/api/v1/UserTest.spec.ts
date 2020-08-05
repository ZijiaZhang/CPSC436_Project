import chai, {expect} from 'chai';

const mongoose = require('mongoose');
import chaiHttp = require("chai-http");
import {User} from "../../../../src/backend/models/UserModel";
import {IUser} from '../../../../src/shared/ModelInterfaces';

chai.use(chaiHttp);

describe('User', () => {
    let app: any;
    before(async () => {
        process.env.DB_CONNECTION_STRING = 'mongodb://localhost:27017/test';
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
        mongoose.connection.on('error', () => expect.fail("Error connecting to db"));
        const clear_user = User.deleteMany({});
        await clear_user.exec();
        app = require('../../../../src/App').app;
    });

    describe("Get all users", () => {
        it('get user by id', async () => {
            await chai.request(app)
                .post('/api/v1/users/register')
                .set('content-type', 'application/json')
                .send({
                    username: 'testUser',
                    password: 'testPass',
                    fullname: 'fullname',
                    pwdConfirm: 'testPass'
                });
            return chai.request(app)
                .get('/api/v1/users/testUser')
                .auth('testUser', 'testPass')
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body.username).equals('testUser');
                }).catch((err) => {
                    expect.fail('should not throw error' + err);
                })
        });

        it('get all users', async () => {
            await chai.request(app)
                .post('/api/v1/users/register')
                .set('content-type', 'application/json')
                .send({
                    username: 'testUser2',
                    password: 'testPass2',
                    fullname: 'fullname2',
                    pwdConfirm: 'testPass2'
                });
            return chai.request(app)
                .get('/api/v1/users/all')
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body[0].username).equals('testUser');
                    expect(res.body[1].username).equals('testUser2');
                }).catch((err) => {
                    expect.fail('should not throw error' + err);
                })
        });

        it('get user by _id', async () => {
            return chai.request(app)
                .get('/api/v1/users/testUser')
                .auth('testUser', 'testPass')
                .then((res) => {
                    return chai.request(app).get('/api/v1/users/ids/' + res.body._id)
                }).then((res) => {
                    expect(res).have.status(200);
                    expect(res.body.username).equals('testUser');
                }).catch((err) => {
                    expect.fail('should not throw error' + err);
                })
        });

        it('should not get user by invalid _id', async () => {
            return chai.request(app)
                .get('/api/v1/users/ids/randomId')
                .then((res) => {
                    expect(res).have.status(500);
                }).catch((err) => {
                    expect.fail('should not throw error' + err);
                })
        });


        it('should not get user by id if not authorized', async () => {
            await chai.request(app)
                .post('/api/v1/users/register')
                .set('content-type', 'application/json')
                .send({
                    username: 'testUser',
                    password: 'testPass',
                    fullname: 'fullname',
                    pwdConfirm: 'testPass'
                });
            return chai.request(app)
                .get('/api/v1/users/testUser')
                .then((res) => {
                    expect(res).have.status(401);
                }).catch((err) => {
                    expect.fail('should not throw error' + err);
                })
        });

        it('register one test user', async () => {
            return chai.request(app)
                .post('/api/v1/users/register').send({
                    username: "test",
                    fullname: "test",
                    password: "test",
                    pwdConfirm: "test"
                })
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.redirects[0].endsWith('/login'));
                })
        });

        it('register one test user already exists', async () => {
            return chai.request(app)
                .post('/api/v1/users/register').send({
                    username: "test",
                    fullname: "test",
                    password: "test",
                    pwdConfirm: "test"
                })
                .then((res) => {
                    expect(res.redirects[0].endsWith('/register?err=A%20user%20with%20the%20given%20username%20is%20already%20registered'));
                })
        });

        it('register one test user no full name given', async () => {
            return chai.request(app)
                .post('/api/v1/users/register').send({
                    username: "test",
                    fullname: null,
                    password: "test",
                    pwdConfirm: "test"
                })
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.redirects[0].endsWith('/register?err=No%20fullname%20was%20given'));
                })
        });

        it('register one test user Password Confirm Password not match', async () => {
            return chai.request(app)
                .post('/api/v1/users/register').send({
                    username: "test",
                    fullname: "test",
                    password: "test",
                    pwdConfirm: "32132"
                })
                .then((res) => {
                    expect(res.redirects[0].endsWith('/register?err=Password%20and%20confirm%20password%20do%20not%20match'));
                })
        });

        it('login test user', async () => {
            return chai.request(app)
                .post('/api/v1/users/login').send({username: "test", password: "test"})
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.redirects[0].endsWith('/'));
                })
        });

        it('login test user wrong password', async () => {
            return chai.request(app)
                .post('/api/v1/users/login').send({username: "test", password: "weewrewrewre"})
                .then((res) => {
                    expect(res.redirects[0].endsWith('/login?err=Password%20or%20username%20is%20incorrect'));
                })
        });

        it('get test user', async () => {
            return chai.request(app)
                .get('/api/v1/users')
                .then((res) => {
                    expect(res).have.status(200);
                })
        });

        it('logout test user', async () => {
            return chai.request(app)
                .get('/api/v1/users/logout')
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.redirects[0].endsWith('/login'));
                })
        });

        it('update user', async () => {
            return chai.request(app)
                .patch('/api/v1/users/test').send({fullname: 'newFullname'})
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body).to.include({username: "test", fullname: 'newFullname'})
                })
        });

        it('update user friendList - add friend', async () => {
            return chai.request(app)
                .patch('/api/v1/users/user/addFriends').send({
                    user: {
                        username: 'test',
                        newFriend: 'testUser2'
                    },
                    friend: {
                        username: 'testUser2',
                        newFriend: 'test'
                    }
                })
                .then((res) => {
                    console.log(res.body);
                    expect(res).have.status(200);
                    expect(JSON.stringify(res.body[0].friendUsernames)).to.equal(JSON.stringify(['testUser2']));
                    expect(JSON.stringify(res.body[1].friendUsernames)).to.equal(JSON.stringify(['test']));
                    return chai.request(app)
                        .patch('/api/v1/users/user/addFriends').send({
                            user: {
                                username: 'test',
                                newFriend: 'testUser'
                            },
                            friend: {
                                username: 'testUser',
                                newFriend: 'test'
                            }
                        })
                })
                .then((res) => {
                    expect(res).have.status(200);
                    expect(JSON.stringify(res.body[0].friendUsernames)).to.equal(JSON.stringify(['testUser2', 'testUser']));
                    expect(JSON.stringify(res.body[1].friendUsernames)).to.equal(JSON.stringify(['test']));
                    return chai.request(app)
                        .patch('/api/v1/users/user/addFriends').send({
                            user: {
                                username: 'test',
                                newFriend: 'testUser2'
                            },
                            friend: {
                                username: 'testUser2',
                                newFriend: 'test'
                            }
                        })
                })
                .then((res) => {
                    expect(res).have.status(200);
                    expect(JSON.stringify(res.body[0].friendUsernames)).to.equal(JSON.stringify(['testUser2', 'testUser']));
                    expect(JSON.stringify(res.body[1].friendUsernames)).to.equal(JSON.stringify(['test']));
                })
                .catch((err) => {
                    expect.fail('add should not fail: \n ' + err);
                })
        });

        it('update user friendList - delete friend', async () => {
            return chai.request(app)
                .patch('/api/v1/users/user/deleteFriends').send({
                    user: {
                        username: 'test',
                        oldFriend: 'testUser2'
                    },
                    friend: {
                        username: 'testUser2',
                        oldFriend: 'test'
                    }
                })
                .then((res) => {
                    console.log(res.body);
                    expect(res).have.status(200);
                    expect(JSON.stringify(res.body[0].friendUsernames)).to.equal(JSON.stringify(['testUser']));
                    expect(JSON.stringify(res.body[1].friendUsernames)).to.equal(JSON.stringify([]));
                    return chai.request(app)
                        .patch('/api/v1/users/user/deleteFriends').send({
                            user: {
                                username: 'test',
                                oldFriend: 'testUser2'
                            },
                            friend: {
                                username: 'testUser2',
                                oldFriend: 'test'
                            }
                        })
                })
                .then((res) => {
                    expect(res).have.status(200);
                    expect(JSON.stringify(res.body[0].friendUsernames)).to.equal(JSON.stringify(['testUser']));
                    expect(JSON.stringify(res.body[1].friendUsernames)).to.equal(JSON.stringify([]));
                })
                .catch((err) => {
                    expect.fail('delete should not fail: \n' + err);
                })
        });

        it('update user friendList - should not add friend with wrong usernames', async () => {
            return chai.request(app)
                .patch('/api/v1/users/user/addFriends').send({
                    user: {
                        username: 'notAUser',
                        newFriend: 'notAUser2'
                    },
                    friend: {
                        username: 'notAUser2',
                        newFriend: 'notAUser'
                    }
                })
                .then((res) => {
                    expect(res).have.status(400);
                })
        });

        it('update user friendList - should not delete friend with wrong usernames', async () => {
            return chai.request(app)
                .patch('/api/v1/users/user/deleteFriends').send({
                    user: {
                        username: 'notAUser',
                        oldFriend: 'notAUser2'
                    },
                    friend: {
                        username: 'notAUser2',
                        oldFriend: 'notAUser'
                    }
                })
                .then((res) => {
                    expect(res).have.status(400);
                })
        });

        it('update user with wrong username', async () => {
            return chai.request(app)
                .patch('/api/v1/users/randomUsername').send({fullname: 'newFullname'})
                .then((res) => {
                    expect(res).have.status(400);
                })
        });

        it('update user with year', async () => {
            return chai.request(app)
                .patch('/api/v1/users/test').send({level: 'master'})
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body).to.include({username: "test", fullname: 'newFullname', level: 'master'})
                })
        });

        it('delete image that DNE', async () => {
            return chai.request(app)
                .delete('/api/v1/users/deleteAvatar').send({oldPath: './notAImage.png'})
                .then((res) => {
                    expect(res).have.status(400);
                    expect(res.text).equal('DELETE FAILED! Old profile photo not found! ');
                })
        });

        describe("user search", () => {
            let userId: string;
            before(async () => {
                type MockUserSchema = IUser & { password: string };
                await User.deleteMany({}).exec();
                await User.create({username: "test1", fullname: "test1"} as MockUserSchema).then(user => userId = user._id.toString());
                await User.create({username: "test2", fullname: "test2"} as MockUserSchema);
                await User.create({username: "abc", fullname: "def"} as MockUserSchema);
            });

            it('search user with a word', async () => {
                return chai.request(app)
                    .get('/api/v1/users/all')
                    .query({content: "test"})
                    .set('content-type', 'application/json')
                    .then((res) => {
                        const users: IUser[] = res.body;
                        expect(res).have.status(200);
                        expect(users.length).to.equal(2);
                        expect(users).satisfy((users: IUser[]) => {
                            return users.some(user => user.username === "test1" && user.fullname === "test1");
                        });
                        expect(users).satisfy((users: IUser[]) => {
                            return users.some(user => user.username === "test2" && user.fullname === "test2");
                        });
                    });
            });

            it('search recommended user with a word', async () => {
                return chai.request(app)
                    .get('/api/v1/users/recommend/' + userId)
                    .query({content: "test"})
                    .set('content-type', 'application/json')
                    .then((res) => {
                        const users: IUser[] = res.body;
                        expect(res).have.status(200);
                        expect(users.length).to.equal(1);
                        expect(users).satisfy((users: IUser[]) => {
                            return users.some(user => user.username === "test2" && user.fullname === "test2");
                        });
                    });
            });

            it('search user with a letter', async () => {
                return chai.request(app)
                    .get('/api/v1/users/all')
                    .query({content: "e"})
                    .set('content-type', 'application/json')
                    .then((res) => {
                        const users: IUser[] = res.body;
                        expect(res).have.status(200);
                        expect(users.length).to.equal(3);
                        expect(users).satisfy((users: IUser[]) => {
                            return users.some(user => user.username === "test1" && user.fullname === "test1");
                        });
                        expect(users).satisfy((users: IUser[]) => {
                            return users.some(user => user.username === "test2" && user.fullname === "test2");
                        });
                        expect(users).satisfy((users: IUser[]) => {
                            return users.some(user => user.username === "abc" && user.fullname === "def");
                        });
                    });
            });

            it('search recommended user with a letter', async () => {
                return chai.request(app)
                    .get('/api/v1/users/recommend/' + userId)
                    .query({content: "e"})
                    .set('content-type', 'application/json')
                    .then((res) => {
                        const users: IUser[] = res.body;
                        expect(res).have.status(200);
                        expect(users.length).to.equal(2);
                        expect(users).satisfy((users: IUser[]) => {
                            return users.some(user => user.username === "test2" && user.fullname === "test2");
                        });
                        expect(users).satisfy((users: IUser[]) => {
                            return users.some(user => user.username === "abc" && user.fullname === "def");
                        });
                    });
            });

            it('search user with no result', async () => {
                return chai.request(app)
                    .get('/api/v1/users/all')
                    .query({content: "cheesecake"})
                    .set('content-type', 'application/json')
                    .then((res) => {
                        const users: IUser[] = res.body;
                        expect(res).have.status(200);
                        expect(users.length).to.equal(0);
                    });
            });

            it('search recommended user with no result', async () => {
                return chai.request(app)
                    .get('/api/v1/users/recommend/' + userId)
                    .query({content: "cheesecake"})
                    .set('content-type', 'application/json')
                    .then((res) => {
                        const users: IUser[] = res.body;
                        expect(res).have.status(200);
                        expect(users.length).to.equal(0);
                    });
            });
        })
    });
});
