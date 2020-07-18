import {IUser} from "../../posts_page/components/UserBlock";
import {combineReducers} from "redux";

export let loginUser: IUser = {
    _id: "",
    username: '',
    fullname: '',
    avatarPath: '',
    gender: "",
    department: "",
    major: "",
    level: "",
    tags: [],
    friendUsernames: [],
};

export let userFriendList: IUser[] = [];

export const userInfoReducer = (curUser: IUser = loginUser, action: any) => {
    if (action.type === 'LOAD_INFO') {
        loginUser = action.loadUserInfo;
        return action.loadUserInfo;
    }
    return curUser;
};

export const userFriendsReducer = (friendList: IUser[] = userFriendList, action: any) => {
    if (action.type === 'LOAD_FRIENDS') {
        userFriendList = action.loadUserFriends;
        return action.loadUserFriends;
    }
    return friendList;
};

export default combineReducers({
    userInfo: userInfoReducer,
    userFriends: userFriendsReducer
});