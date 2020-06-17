import {MessageStatus, SingleMessage} from "../components/ChatRoomBubbles";
import {combineReducers} from "redux";
import update from 'react-addons-update';
import {ChatRoomActions} from "../Actions";

export interface ChatRoomState {
    messages: Array<SingleMessage>;
}

function handle_message(messages: SingleMessage[] = [], action: {type: ChatRoomActions, message: string}): SingleMessage[]{
    switch (action.type){
        case ChatRoomActions.RECEIVE_MESSAGE:
            return update(messages, {$push: [{message: action.message, status:MessageStatus.RECEIVED}]});
        case ChatRoomActions.SEND_MESSAGE:
            return update(messages, {$push: [{message: action.message, status:MessageStatus.SENT}]});
        default:
            return messages
    }
}

export default combineReducers({
    messages: handle_message,
});
