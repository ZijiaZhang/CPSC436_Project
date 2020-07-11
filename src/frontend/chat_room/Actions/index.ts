import {Action, Dispatch} from "redux";
import {getCurrentUser, user} from "../../shared/globleFunctions";
import {MessageStatus} from "../components/ChatRoomBubbles";
import {databaseChat} from "../../../backend/Models";

export enum ChatRoomActions{
    RECEIVE_INITIAL_MESSAGE,
    SEND_MESSAGE,
    SEND_MESSAGE_PENDING,
    SEND_MESSAGE_ERROR
}

export const sendMessage = (text: string, receiver: string|null) => {
    return function (dispatch: Dispatch<Action>) {
        let user_id = user.username;
        dispatch({
            type: ChatRoomActions.SEND_MESSAGE_PENDING,
            message: text,
            sender: user_id
        });


        fetch('/api/v1/chats', {
            method: 'POST',
            body: JSON.stringify({sender_username: user_id, receiver_username: receiver?receiver:user_id, content: text}),
            headers: {
                'Content-Type': 'application/json'
            }}).then((res) => {
            dispatch({
                type: ChatRoomActions.SEND_MESSAGE,
                message:text,
                sender: user_id
            })
        }).catch((err) => {
            dispatch({
                type: ChatRoomActions.SEND_MESSAGE_ERROR,
                message:text,
                sender: user_id
            })
        })
    }

};


async function getMessages<T>(user_id: any, recever: any) {
    let res = await fetch(`/api/v1/chats?sender_id=${user_id}&receiver_id=${recever ? recever : user_id}`);
    let data = await res.json();
    return data.allMessages;
}

export const getInitialMessages = (receiver: any) => {
    return async function(dispatch: Dispatch<Action>) {
        if (!user){
            await getCurrentUser();
        }
        let user_id = user.username;

        let sent_messages = await getMessages(user_id, receiver.username);
        sent_messages = sent_messages.map((m: databaseChat) => {
            return {
                message: m.content,
                status:MessageStatus.SENT,
                sender: user,
                time: m.time
            }
        });

        let receive_messages = await getMessages(receiver.username, user_id);
        receive_messages = receive_messages.map((m: databaseChat) => {
            return {
                message: m.content,
                status: MessageStatus.RECEIVED,
                sender: receiver,
                time: m.time
            }
        });

        receive_messages.push(...sent_messages);
        console.log(receive_messages);
        receive_messages.sort((a: any,b: any) => new Date(a.time).getTime() - new Date(b.time).getTime());
        dispatch({
            type: ChatRoomActions.RECEIVE_INITIAL_MESSAGE,
            message: receive_messages
        })
    }
};
