import {combineReducers} from "redux";
import {ChatPageAction} from "../actions";
import {IChatItem} from "../components/ChatList";
import {IUser} from "../../../shared/ModelInterfaces";

export interface IChatPageState {
    chatItems: IChatItem[];
    selectedFriends: string[];
}

function chatsReducer(chatItems: IChatItem[] = [], action: any): IChatItem[] {
    if (action.type === ChatPageAction.ADD_CHAT_ITEMS) {
        return action.items;
    }
    return chatItems;
}

function selectedFriendsReducer(friendUsernames: string[] = [], action: any): string[] {
    if (action.type === ChatPageAction.SELECT_FRIEND) {
        friendUsernames.push(action.friendUsername);
    } else if (action.type === ChatPageAction.DESELECT_FRIEND) {
        const index = friendUsernames.findIndex(name => name === action.friendUsername);
        friendUsernames.splice(index, 1);
    } else if (action.type === ChatPageAction.DESELECT_ALL) {
        friendUsernames = [];
    }

    return friendUsernames;
}

function userFriendsReducer(friends: IUser[] = [], action: any): IUser[] {
    if (action.type === ChatPageAction.LOAD_FRIENDS) {
        return action.friends;
    }
    return friends;
}

export default combineReducers({
    chatItems: chatsReducer,
    userFriends: userFriendsReducer,
    selectedFriends: selectedFriendsReducer,
});
