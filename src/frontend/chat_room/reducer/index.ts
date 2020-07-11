import {MessageStatus, ISingleMessage} from "../components/ChatRoomBubbles";
import {combineReducers} from "redux";
import update from 'immutability-helper';
import {ChatRoomActions} from "../Actions";
import {IUserProps} from "../../shared/interfaces/IUserProps";

export interface ChatRoomState {
    messages: Array<ISingleMessage>;
}

function handle_message(messages: ISingleMessage[] = [],
                        action: any): ISingleMessage[]{
    switch (action.type){
        case ChatRoomActions.RECEIVE_INITIAL_MESSAGE:
            console.log(action.message);
            return action.message;
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
