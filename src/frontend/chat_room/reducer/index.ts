import {MessageStatus, ISingleMessage} from "../components/ChatRoomBubbles";
import {combineReducers} from "redux";
import update from 'immutability-helper';
import {ChatRoomActions} from "../Actions";
import {IUserProps} from "../../shared/interfaces/IUserProps";

export interface ChatRoomState {
    messages: Array<ISingleMessage>;
}

function handle_message(messages: ISingleMessage[] = [],
                        action: {type: ChatRoomActions, message: string, sender: IUserProps}): ISingleMessage[]{
    switch (action.type){
        case ChatRoomActions.RECEIVE_MESSAGE:
            return update(messages,
                {$push: [{message: action.message, status:MessageStatus.RECEIVED, sender: action.sender}]});
        case ChatRoomActions.SEND_MESSAGE:
            return update(messages,
                {$push: [{message: action.message, status:MessageStatus.SENT, sender: action.sender}]});
        default:
            return messages
    }
}

export default combineReducers({
    messages: handle_message,
});
