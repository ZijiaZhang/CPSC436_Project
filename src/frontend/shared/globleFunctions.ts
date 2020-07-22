import {MessageStatus} from "../chat_room/components/ChatRoomBubbles";
import {IChat, IUser} from "../../shared/ModelInterfaces";

export let user: IUser;

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
        username: temp_user.username,
        savedPostIds: temp_user.savedPostIds,
        hiddenPostIds: temp_user.hiddenPostIds,
        blackListUserIds: temp_user.blackListUserIds
    };
    return user
}

export async function getUserInfo(user_id: string) {
    let user_res = await fetch('/api/v1/users/' + user_id);
    return await user_res.json();
}

export async function getManyUsersInfo(userIDList: string[]) {
    let returnList = [];
    for (let userID of userIDList) {
        let userInfo = await getUserInfo(userID);
        returnList.push(userInfo);
    }
    return returnList;
}

export async function getAllUsersInfo(user: IUser) {
    let id = user._id;
    let response = await fetch("/api/v1/users/recommend/" + id, {method: 'GET'});
    return await response.json();
}

export async function updateUserInfo(username: string, updatedInfo: any) {
    let response = await fetch('http://localhost:3000/api/v1/users/' + username, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInfo)
    });
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
    return await mapDataToPost(responseData);
}


export async function getPostsByIds(postIds: string[]) {
    let dataList = [];
    for (let id of postIds) {
        let response = await fetch('/api/v1/posts/' + id, {method: 'GET'});
        let responseData = await response.json();
        dataList.push(responseData);
    }
    return await mapDataToPost(dataList);
}

export async function getPostsByUserId(userId: string) {
    let response = await fetch('/api/v1/posts/user/' + userId, {method: 'GET'});
    let responseData = await response.json();
    return await mapDataToPost(responseData);
}

async function mapDataToPost(responseData: any[]) {
    let postList = [];
    for (let post of responseData) {
        let user = await getUserById(post.userId);
        let comments = await getCommentsByPost(post._id);
        const newPost = {
            id: post._id,
            userId: user._id,
            time: post.time,
            name: user.fullname,
            detail: post.detail,
            avatarPath: user.avatarPath,
            image: '',
            likedUserIds: post.likedUserIds,
            comments: comments,
            type: post.type,
            visibility: post.visibility,
            tags: [],
            hidden: false
        };
        postList.push(newPost);
    }
    return postList;
}

export async function getUserById(userId: string) {
    let user_res = await fetch('/api/v1/users/ids/' + userId);
    return await user_res.json();
}
export async function getCommentsByPost(postId: string) {
    let comment_res = await fetch('/api/v1/comments/' + postId);
    let comments = await comment_res.json();
    let commentList = [];
    for (let comment of comments) {
        let user = await getUserById(comment.userId);
        commentList.push({
            userId: comment.userId,
            postId: postId,
            time: comment.time,
            detail: comment.detail,
            visibility: comment.visibility,
            name: user.fullname,
            avatarPath: user.avatarPath
        })
    }
    return commentList;
}
