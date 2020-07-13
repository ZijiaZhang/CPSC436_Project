import chai from 'chai';
import chaiHttp = require('chai-http');
import {expect} from "chai";
import {User} from "../../../../src/backend/models/UserModel";

const mongoose = require('mongoose');
import {Post} from "../../../../src/backend/models/PostModel";

chai.use(chaiHttp);


describe('Posts', () => {

    describe('Posts apis', () => {
        let app: any;
        let userId: string;
        let postId: string;

        before(async () => {
            process.env.DB_CONNECTION_STRING = 'mongodb://localhost:27017/test';
            await mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
            mongoose.connection.on('error', () => expect.fail("Error connecting to db"));
            await User.deleteMany({}).exec();
            await Post.deleteMany({}).exec();
            await User.create({username: "1", fullname: "1"} as any).then(user => userId = user._id.toString());
            app = require('../../../../src/App').app;
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


});
