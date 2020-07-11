import {IUser} from "../posts_page/components/UserBlock";
import {databaseChat} from "../../backend/Models";
import {MessageStatus} from "../chat_room/components/ChatRoomBubbles";

export let user: IUser;
export let user_info: {[name: string] : IUser} = {};


export async function getCurrentUser() {
    let user_res = await fetch('/api/v1/users');
    let temp_user = await user_res.json();
    user = {
        avatarPath: "",
        department: "",
        friends: [],
        gender: "",
        interests: [],
        level: "",
        major: "",
        name: temp_user.username
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
        avatarPath: "",
        department: "",
        friends: [],
        gender: "",
        interests: [],
        level: "",
        major: "",
        name: user.username
    };
    return user_info[user_id];
}

export async function convert_to_ISingeleMessage(chat: databaseChat, status: MessageStatus) {
    let user = await(getUserInfo(chat.senderUsername));
    return {message: chat.content,
        sender: user,
        status}
}
