import {Action, Dispatch} from "redux";
import {getCurrentUser, getUserInfo, setUnread, user} from "../../shared/globleFunctions";
import {ISingleMessage} from "../components/ChatRoomBubbles";
import {IChat, IGroup, IGroupChat, IUser} from "../../../shared/ModelInterfaces";
import {requestAPIJson} from "../../shared/Networks";
import {MessageStatus} from "../../../shared/SocketEvents";
import {ChatType} from "../../shared/enums/ChatType";

export enum ChatRoomActions {
    RECEIVE_MESSAGE,
    RECEIVE_INITIAL_MESSAGE,
    SEND_MESSAGE,
    SEND_MESSAGE_PENDING,
    SEND_MESSAGE_ERROR
}

function sendMessageAPICall(user_id: string, receiver: string | null, text: string) {
    return requestAPIJson('/api/v1/chats', 'POST',
        {
            'Content-Type': 'application/json'
        },
        {
            sender_username: user_id,
            receiver_username: receiver ? receiver : user_id,
            content: text
        },
    );
}

function sendGroupChatMessage(user_id: string, group_id: string | null, content: string) {
    return requestAPIJson('/api/v1/group_chats', 'POST',
        {
            'Content-Type': 'application/json'
        },
        {
            sender_username: user_id,
            group_id,
            content,
        },
    );
}

export const sendMessage = (text: string, receiver: string | null, chatType: ChatType) => {
    return function (dispatch: Dispatch<Action>) {
        dispatch({
            type: ChatRoomActions.SEND_MESSAGE_PENDING,
            message: text,
            sender: user
        });

        const sendMessage = chatType === ChatType.IndividualChat ?
            sendMessageAPICall(user.username, receiver, text) : sendGroupChatMessage(user.username, receiver, text);

        sendMessage.then(() => {
            dispatch({
                type: ChatRoomActions.SEND_MESSAGE,
                message: text,
                sender: user
            })
        }).catch((err) => {
            dispatch({
                type: ChatRoomActions.SEND_MESSAGE_ERROR,
                message: text,
                sender: user
            })
        })
    }

};


async function getMessages(user_id: any, recever: any) {
    let data = await requestAPIJson(`/api/v1/chats?sender_id=${user_id}&receiver_id=${recever ? recever : user_id}`);
    setUnread(true);
    return data.allMessages;
}

async function getGroupChatMessages(groupId: string) {
    let data = await requestAPIJson(`/api/v1/group_chats?group_id=${groupId}`);
    return data.allMessages;
}

async function getGroupInfo(groupId: string): Promise<IGroup> {
    return requestAPIJson(`/api/v1/groups/${groupId}`);
}

export const getInitialMessages = (receiver_id: string | null, chatType: ChatType) => {
    return async function (dispatch: Dispatch<Action>) {
        if (!user) {
            await getCurrentUser();
        }
        if (!receiver_id) {
            return;
        }

        const initialMessages: ISingleMessage[] = [];

        if (chatType === ChatType.IndividualChat) {
            let user_id = user.username;
            let receive_user = await getUserInfo(receiver_id);
            let messages = await getMessages(user_id, receiver_id);
            messages = messages.map((m: IChat & {status: MessageStatus}) => {
                return {
                    message: m.content,
                    status: m.status,
                    sender: m.senderUsername==user_id?user: receive_user,
                    time: m.time
                }
            });

            initialMessages.push(...messages);
        } else {
            const groupChats = await getGroupChatMessages(receiver_id);
            const group = await getGroupInfo(receiver_id);
            const groupUsersPromises = group.users.map((username: string) => getUserInfo(username));
            const groupUsers: IUser[] = await Promise.all(groupUsersPromises);

            const messages: ISingleMessage[] = groupChats.map((chat: IGroupChat) => {
                const sender = groupUsers.find(user => user.username === chat.senderUsername);
                const messageStatus = chat.senderUsername === user.username ? MessageStatus.SENT : MessageStatus.RECEIVED;
                return {
                    message: chat.content,
                    status: messageStatus,
                    sender,
                    time: chat.time
                }
            });

            initialMessages.push(...messages);
        }

        initialMessages.sort((a: any, b: any) => new Date(a.time).getTime() - new Date(b.time).getTime());
        dispatch({
            type: ChatRoomActions.RECEIVE_INITIAL_MESSAGE,
            message: initialMessages
        })
    }
};

export const receiveNewMessage = (message: ISingleMessage) => {
    read_message(message.sender.username);
    return {
        type: ChatRoomActions.RECEIVE_MESSAGE,
        message: message
    }
};

async function read_message(username: string) {
    await requestAPIJson('/api/v1/chats/read', 'POST', undefined, {user: username});
    setUnread(true);
}
