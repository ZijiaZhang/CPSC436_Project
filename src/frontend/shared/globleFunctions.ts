import {IUser} from "../posts_page/components/UserBlock";
import {MessageStatus} from "../chat_room/components/ChatRoomBubbles";
import {IChat} from "../../shared/ModelInterfaces";
import {IPost} from "../posts_page/components/PostBlock";

export let user: IUser;
export let user_info: {[name: string] : IUser} = {};


export async function getCurrentUser() {
    let user_res = await fetch('/api/v1/users');
    let temp_user = await user_res.json();
    console.log(temp_user);
    user = {
        _id: temp_user._id,
        fullname: temp_user.fullname,
        tags: temp_user.tags,
        avatarPath: temp_user.avatarPath,
        department: temp_user.department,
        friendUsernames: temp_user.friendUsernames,
        gender: temp_user.gender,
        level: temp_user.level,
        major: temp_user.major,
        username: temp_user.username
    };
    return user
}

export async function getUserInfo(user_id: string) {
    if (user_id in user_info) {
        return user_info[user_id];
    }
    let user_res = await fetch('/api/v1/users/' + user_id);
    let user = await user_res.json();
    user_info[user_id] = {
        _id: user._id,
        fullname: user.fullname,
        tags: user.tags,
        avatarPath: user.avatarPath,
        department: user.department,
        friendUsernames: user.friendUsernames,
        gender: user.gender,
        level: user.level,
        major: user.major,
        username: user.username
    };
    return user_info[user_id];
}

export async function getManyUsersInfo(userIDList: string[]) {
    let returnList = [];
    for (let userID of userIDList) {
        if (userID in user_info) {
            returnList.push(Object.create(user_info[userID]));
        } else {
            let userInfo = await getUserInfo(userID);
            returnList.push(userInfo);
        }
    }
    return returnList;
}

export async function getAllUsersInfo() {
    let response = await fetch("/api/v1/users/all", {method: 'GET'});
    return await response.json();
}

export async function convert_to_ISingeleMessage(chat: IChat, status: MessageStatus) {
    let user = await(getUserInfo(chat.senderUsername));
    return {message: chat.content,
        sender: user,
        status}
}

export async function getPosts() {
    let response = await fetch('/api/v1/posts', {method: 'GET'});
    let responseData = await response.json();
    let postList: IPost[] = [];
    let id = 0;
    for (let post of responseData) {
        postList.push({
            id: id.toString(),
            time: post.time,
            name: 'TBD',
            detail: post.detail,
            avatarPath: './images/photoP.png',
            image: '',
            numLikes: 0,
            comments: [],
            type: post.type,
            visibility: post.visibility,
            tags: [],
            liked: false,
            hidden: false
        });
        id++;
    }
    return postList;
}