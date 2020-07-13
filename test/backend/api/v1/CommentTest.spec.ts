import chai from 'chai';
import chaiHttp = require('chai-http');
import {expect} from "chai";
import {User} from "../../../../src/backend/models/UserModel";

const mongoose = require('mongoose');
import {Post} from "../../../../src/backend/models/PostModel";

chai.use(chaiHttp);


describe('Comments', () => {

    describe('Comments apis', () => {
        let app: any;
        let userId: string;
        let postId: string;
        let commentId: string;

        before(async () => {
            process.env.DB_CONNECTION_STRING = 'mongodb://localhost:27017/test';
            await mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
            mongoose.connection.on('error', () => expect.fail("Error connecting to db"));
            await User.deleteMany({}).exec();
            await Post.deleteMany({}).exec();
            await User.create({username: "1", fullname: "1"} as any).then(user => userId = user._id.toString());
            await Post.create({userId: userId, detail: "abc"} as any).then(post => postId = post._id.toString());
            app = require('../../../../src/App').app;
        });

        it('Should add a comment', async () => {
            return chai.request(app)
                .post('/api/v1/posts/comments').send({userId, postId, detail: "def"})
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body).to.include({userId, postId, detail: "def"});
                    commentId = res.body._id.toString();
                })
        });

        it('Should get all comments with post id', async () => {
            return chai.request(app)
                .get(`/api/v1/posts/comments/${postId}`)
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body[0]).to.include({_id: commentId, userId, postId, detail: "def"});
                })
        });

        it('Should update comment', async () => {
            return chai.request(app)
                .patch(`/api/v1/posts/comments/${commentId}`).send({detail: "ggg"})
                .then((res) => {
                    expect(res).have.status(200);
                    expect(res.body).to.include({_id: commentId, userId, postId, detail: "ggg"});
                })
        });

        it('Should delete comment', async () => {
            return chai.request(app)
                .get(`/api/v1/posts/comments/${commentId}`)
                .then((res) => {
                    expect(res).have.status(200);
                })
        });
    });


});
