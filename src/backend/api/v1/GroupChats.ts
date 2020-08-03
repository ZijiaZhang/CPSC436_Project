import express from 'express';
import passport from "passport";
import {SocketStore} from "../../SocketStore";
import {SocketEvents} from "../../../shared/SocketEvents";
import {IUser, IGroup, IGroupChat} from "../../../shared/ModelInterfaces";
import {GroupChat} from "../../models/GroupChatModel";
import {Group} from "../../models/GroupModel";
export const groupChatsRouter = express.Router();

groupChatsRouter.use((req, res, next)=> {
    if(!req.isAuthenticated()){
        passport.authenticate('basic', { session: false })(req, res, next)
    } else {
        next();
    }
} );


groupChatsRouter.get('/', function(req, res) {
    const group_id = req.query.group_id as string;
    const user = req.user as IUser;
    if (!group_id) {
        res.status(400).json({message: 'group_id not found'});
        return;
    } else if (user && user.groups.includes(group_id)) {
        const allMessages = GroupChat.find({groupChatID: group_id});
        allMessages.exec();
        return allMessages.then((chats: IGroupChat[]) => {
            res.json({
                allMessages: chats
            });
        }).catch(() => res.status(500).json({message: 'error when handling the query'}));
    } else{
        res.status(401).json({message: 'Not Authorized'});
    }
});

groupChatsRouter.post('/', function (req, res) {
    const user = req.user as IUser;
    if (req.user && user.username === req.body.sender_username && user.groups.includes(req.body.group_id)){
        return GroupChat.create({
            senderUsername: req.body.sender_username,
            groupChatID: req.body.group_id,
            content: req.body.content,
            time: new Date()
        }).then((chat: IGroupChat) => {
            Group.findById(req.body.group_id).then((group: IGroup| null) =>{
                for(let username of group!.users){
                    if (username in SocketStore.allSockets && username!== req.body.sender_username){
                        SocketStore.allSockets[username].emit(SocketEvents.ReceiveMessage, {message: chat})
                    }
                }
            }).catch((err) => {
                console.error(err);
            });


            return res.json(chat);
        }).catch(()=>
            res.status(500).json({message: 'error when try to add entry'})
        );
    } else {
        res.status(401).json({message: 'Not Authorized'})
    }
});
