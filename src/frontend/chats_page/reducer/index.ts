import {combineReducers} from "redux";
import {ChatPageAction} from "../actions";
import {IChatItem} from "../components/ChatList";

export interface IChatPageState {
    chatItems: IChatItem[]
}

function chatsReducer(chatItems: IChatItem[] = [], action: any): IChatItem[] {
    if (action.type === ChatPageAction.ADD_CHAT_ITEMS) {
        return action.items;
    }
    return chatItems;
}

export default combineReducers({
    chatItems: chatsReducer
});
