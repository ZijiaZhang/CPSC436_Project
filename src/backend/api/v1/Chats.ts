import express from 'express';
export const chatsRouter = express.Router();

chatsRouter.get('/', function(req, res, next) {
    res.send({
        allMessages: [{
            sender_id: '1',
            sender_username: 'TestUser1',
            receiver_id: '2',
            receiver_username:'TestUser2',
            content: 'Hello',
            time: new Date(2020,6,10,0,0,0,0)
        }]
    });
});
