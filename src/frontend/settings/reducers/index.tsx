import {IUser} from "../../posts_page/components/UserBlock";
import {combineReducers} from "redux";

const user: IUser = {
    name: 'Denise',
    avatarPath: './images/test2.png',
    gender: "female",
    department: "Science",
    major: "HON Computer Science",
    level: "Bachelor",
    interests: ['music', 'reading'],
    friends: ['Gary', 'Will'],
};

const userInfoReducer = (curUser: IUser = user, action: any) => {
    if (action.type === 'LOAD_INFO') {
        console.log(action.loadUserInfo);
        return action.loadUserInfo;
    }
    return curUser;
};

export default combineReducers({
    userInfo: userInfoReducer,
});