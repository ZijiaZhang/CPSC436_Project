import {ISingleMessage} from "../components/ChatRoomBubbles";
import {combineReducers} from "redux";
import update from 'immutability-helper';
import {ChatRoomActions} from "../Actions";
import {MessageStatus} from "../../../shared/SocketEvents";

export interface ChatRoomState {
    messages: Array<ISingleMessage>;
}

function handle_message(messages: ISingleMessage[] = [],
                        action: any): ISingleMessage[]{
    switch (action.type){
        case ChatRoomActions.RECEIVE_INITIAL_MESSAGE:
            return action.message;
        case ChatRoomActions.SEND_MESSAGE:
            return update(messages,
                {$push: [{message: action.message, status:MessageStatus.SENT, sender: action.sender}]});
        case ChatRoomActions.RECEIVE_MESSAGE:
            return update(messages, {$push: [action.message]});
        case ChatRoomActions.SEND_MESSAGE_ERROR:
            return update(messages, {$push: [{message: action.message, status:MessageStatus.NOT_SENT, sender: action.sender}]});
        default:
            return messages
    }
}

export default combineReducers({
    messages: handle_message,
});
