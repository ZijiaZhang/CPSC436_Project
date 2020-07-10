import {IUser} from "../../posts_page/components/UserBlock";
import {combineReducers} from "redux";

const user: IUser = {
    username: '',
    fullname: '',
    avatarPath: '',
    gender: "",
    department: "",
    major: "",
    level: "",
    tags: [],
    friends: [],
};

const userInfoReducer = (curUser: IUser = user, action: any) => {
    if (action.type === 'LOAD_INFO') {
        return action.loadUserInfo;
    }
    return curUser;
};

export default combineReducers({
    userInfo: userInfoReducer,
});