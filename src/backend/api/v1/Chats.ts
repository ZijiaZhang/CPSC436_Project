import express from 'express';
import {Chat} from "../../Models";
export const chatsRouter = express.Router();

chatsRouter.get('/', function(req, res, next) {
    // TODO: Add connection to mongodb
    // TODO: Add auth
    const sender_id = req.query.sender_id;
    const receiver_id = req.query.receiver_id;
    if (!sender_id || !receiver_id){
        res.status(400).json({message: 'sender_id or receiver_id not found'});
        return;
    }

    const allMessages= Chat.find({senderUsername: sender_id, receiverUsername: receiver_id});
    allMessages.exec();
    allMessages.then((chats: any) =>{
        res.json({
            allMessages: chats
        });
    }).catch(() => res.status(500).json({message: 'error when handling the query'}));

});

chatsRouter.post('/', function (req, res, next) {

});
