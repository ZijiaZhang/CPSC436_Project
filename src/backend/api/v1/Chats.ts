import express from 'express';
import {Chat, databaseChat} from "../../Models";
export const chatsRouter = express.Router();

chatsRouter.get('/', function(req, res) {
    // TODO: Add auth
    const sender_id = req.query.sender_id;
    const receiver_id = req.query.receiver_id;
    if (!sender_id || !receiver_id){
        res.status(400).json({message: 'sender_id or receiver_id not found'});
        return;
    }

    const allMessages= Chat.find({senderUsername: sender_id, receiverUsername: receiver_id});
    allMessages.exec();
    return allMessages.then((chats: any) =>{
        res.json({
            allMessages: chats
        });
    }).catch(() => res.status(500).json({message: 'error when handling the query'}));

});

chatsRouter.post('/', function (req, res) {
    // TODO: Add auth
    return Chat.create({
        senderUsername: req.body.sender_username,
        receiverUsername: req.body.receiver_username,
        content: req.body.content,
        time: new Date()
    }).then((chat:databaseChat) => {
        return res.json(chat);
    }).catch(()=>
        res.status(500).json({message: 'error when try to add entry'})
    );
});
