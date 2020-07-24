import chai from 'chai';
import chaiHttp = require('chai-http');
import {expect} from "chai";
import {User} from "../../../../src/backend/models/UserModel";

const mongoose = require('mongoose');
import {Post} from "../../../../src/backend/models/PostModel";
import {IUser} from "../../../../src/shared/ModelInterfaces";
import {IPost} from "../../../../src/shared/ModelInterfaces";

chai.use(chaiHttp);


describe('Posts', () => {

    let app: any;

    before(async () => {
        process.env.DB_CONNECTION_STRING = 'mongodb://localhost:27017/test';
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
        mongoose.connection.on('error', () => expect.fail("Error connecting to db"));
        await User.deleteMany({}).exec();
        await Post.deleteMany({}).exec();
        app = require('../../../../src/App').app;
    });

    describe('Posts apis', () => {
        let postId: string;
        let userId: string;

        before(async() =>{
            await User.create({username: "1", fullname: "1"} as any).then(user => userId = user._id.toString());
        });

        it('Should add a post', async () => {
            return chai.request(app)
                .post('/api/v1/posts').send({userId: userId, detail: "abc"})
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body).to.include({userId: userId, detail: "abc"});
                    postId = res.body._id.toString();
                })
        });

        it('Should modify a post', async () => {
            return chai.request(app)
                .patch(`/api/v1/posts/${postId}`).send({detail: "def"})
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body).to.include({_id: postId, userId: userId, detail: "def"});
                })
        });

        it('Should get post', async () => {
            return chai.request(app)
                .get('/api/v1/posts')
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body[0]).to.include({_id: postId, userId: userId, detail: "def"});
                })
        });

        it('Should get post with userId', async () => {
            return chai.request(app)
                .get(`/api/v1/posts/user/${userId}`)
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body[0]).to.include({_id: postId, userId: userId, detail: "def"});
                })
        });

        it('Should delete post', async () => {
            return chai.request(app)
                .delete(`/api/v1/posts/${postId}`)
                .then((res) => {
                    expect(res).have.status(200);
                })
        });
    });

    describe("post search", () => {
        let userId: string;

        before(async () => {
            await Post.deleteMany({}).exec();
            await User.deleteMany({}).exec();
            await User.create({username: "user1", fullname: "user1"} as any).then(user => userId = user._id.toString());
            await Post.create({userId: userId, detail: "abc"} as IPost);
            await Post.create({userId: userId, detail: "b"} as IPost);
            await Post.create({userId: userId, detail: "c"} as IPost);
        });

        it('search post with phrase', async () => {
            return chai.request(app)
                .get('/api/v1/posts')
                .query({content: "abc"})
                .set('content-type', 'application/json')
                .then((res) => {
                    const posts: IPost[] = res.body;
                    expect(res).have.status(200);
                    expect(posts.length).to.equal(1);
                    expect(posts).satisfy((posts: IPost[]) => {
                        return posts.some(post => post.userId === userId && post.detail === "abc");
                    });
                });
        });

        it('search post with a letter', async () => {
            return chai.request(app)
                .get('/api/v1/posts')
                .query({content: "b"})
                .set('content-type', 'application/json')
                .then((res) => {
                    const posts: IPost[] = res.body;
                    expect(res).have.status(200);
                    expect(posts.length).to.equal(2);
                    expect(posts).satisfy((posts: IPost[]) => {
                        return posts.some(post => post.userId === userId && post.detail === "abc");
                    });
                    expect(posts).satisfy((posts: IPost[]) => {
                        return posts.some(post => post.userId === userId && post.detail === "b");
                    });
                });
        });

        it('search user with no result', async () => {
            return chai.request(app)
                .get('/api/v1/posts')
                .query({content: "lol"})
                .set('content-type', 'application/json')
                .then((res) => {
                    const posts: IPost[] = res.body;
                    expect(res).have.status(200);
                    expect(posts.length).to.equal(0);
                });
        });
    })
});
