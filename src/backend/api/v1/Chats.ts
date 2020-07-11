import express from 'express';
import {Chat, IChat} from "../../models/ChatModel";
import passport from "passport";
export const chatsRouter = express.Router();


chatsRouter.get('/', (req, res, next)=> {
    if(!req.isAuthenticated()){
        passport.authenticate('basic', { session: false })(req, res, next)
    } else {
        next();
    }
}, function(req, res) {
    const sender_id = req.query.sender_id as string;
    const receiver_id = req.query.receiver_id as string;
    if (!sender_id || !receiver_id) {
        res.status(400).json({message: 'sender_id or receiver_id not found'});
        return;
    } else if (req.user && ((req.user as {username: string}).username === req.query.sender_id ||
                    (req.user as {username: string}).username === req.query.receiver_id) ) {
        const allMessages = Chat.find({senderUsername: sender_id, receiverUsername: receiver_id});
        allMessages.exec();
        return allMessages.then((chats: IChat[]) => {
            res.json({
                allMessages: chats
            });
        }).catch(() => res.status(500).json({message: 'error when handling the query'}));
    } else{
        res.status(401).json({message: 'Not Authorized'});
    }
});

chatsRouter.post('/', (req, res, next)=> {
    if(!req.isAuthenticated()){
        passport.authenticate('basic', { session: false })(req, res, next)
    } else {
        next();
    }
}, function (req, res) {
    if (req.user && (req.user as {username: string}).username === req.body.sender_username){
        return Chat.create({
            senderUsername: req.body.sender_username,
            receiverUsername: req.body.receiver_username,
            content: req.body.content,
            time: new Date()
        }).then((chat: IChat) => {
            return res.json(chat);
        }).catch(()=>
            res.status(500).json({message: 'error when try to add entry'})
        );
    } else {
        res.status(401).json({message: 'Not Authorized'})
    }
});
