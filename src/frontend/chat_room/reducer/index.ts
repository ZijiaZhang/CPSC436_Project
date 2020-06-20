import {MessageStatus, ISingleMessage} from "../components/ChatRoomBubbles";
import {combineReducers} from "redux";
import update from 'immutability-helper';
import {ChatRoomActions} from "../Actions";

export interface ChatRoomState {
    messages: Array<ISingleMessage>;
}

function handle_message(messages: ISingleMessage[] = [], action: {type: ChatRoomActions, message: string}): ISingleMessage[]{
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
