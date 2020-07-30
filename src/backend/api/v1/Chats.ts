import express from 'express';
import {Chat} from "../../models/ChatModel";
import passport from "passport";
import {SocketStore} from "../../SocketStore";
import {MessageStatus, SocketEvents} from "../../../shared/SocketEvents";
import {IChat, IUser} from '../../../shared/ModelInterfaces';
export const chatsRouter = express.Router();

chatsRouter.use((req, res, next)=> {
    if(!req.isAuthenticated()){
        passport.authenticate('basic', { session: false })(req, res, next)
    } else {
        next();
    }
}, );


chatsRouter.get('/',  async function(req, res) {
    const sender_id = req.query.sender_id as string;
    const receiver_id = req.query.receiver_id as string;
    if (!sender_id || !receiver_id) {
        res.status(400).json({message: 'sender_id or receiver_id not found'});
        return;
    } else if (req.user && (req.user as IUser).username === req.query.sender_id) {
        const tempMessage1 = await Chat.find({senderUsername: sender_id, receiverUsername: receiver_id}).exec();
        let tempMessage2 = await Chat.find({senderUsername: receiver_id, receiverUsername: sender_id}).exec();
        let sentMessages = tempMessage1.map((message) => {return Object.assign({}, message.toObject(), {status: MessageStatus.SENT})});
        let receiveMessages = tempMessage2.map((message) => {return Object.assign({}, message.toObject(), {status: MessageStatus.RECEIVED})});
        console.log(tempMessage1);
        await Chat.update({senderUsername: receiver_id, receiverUsername: sender_id}, {read: true}).exec();
        return res.json({allMessages: [... sentMessages, ... receiveMessages]});
    } else{
        res.status(401).json({message: 'Not Authorized'});
    }
});

chatsRouter.post('/', function (req, res) {
    if (req.user && (req.user as IUser).username === req.body.sender_username){
        return Chat.create({
            senderUsername: req.body.sender_username,
            receiverUsername: req.body.receiver_username,
            content: req.body.content,
            time: new Date()
        }).then((chat: IChat) => {

            if (req.body.receiver_username in SocketStore.allSockets){
                console.log('sent');
                SocketStore.allSockets[req.body.receiver_username].emit(SocketEvents.ReceiveMessage, {message: chat})
            }
            return res.json(chat);
        }).catch(()=>
            res.status(500).json({message: 'error when try to add entry'})
        );
    } else {
        res.status(401).json({message: 'Not Authorized'})
    }
});


chatsRouter.get('/unreads/:id',  async function(req, res) {
   if(req.user && (req.user as IUser).username === req.params.id) {
        const sendMessages = await Chat.find({receiverUsername: req.params.id, read: false}).exec();
        return res.json({allMessages: [... sendMessages]});
    } else{
        res.status(401).json({message: 'Not Authorized'});
    }
});
