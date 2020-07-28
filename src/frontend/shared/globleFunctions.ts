import {MessageStatus} from "../chat_room/components/ChatRoomBubbles";
import {IChat, IUser} from "../../shared/ModelInterfaces";
import {requestAPIJson} from "./Networks";

export let user: IUser;

export async function getCurrentUser() {
    let temp_user = await requestAPIJson('/api/v1/users');
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
        blackListUserIds: temp_user.blackListUserIds,
        groups: temp_user.groups
    };
    return user
}

export async function getUserInfo(user_id: string) {
    return await requestAPIJson('/api/v1/users/' + user_id);
}

export async function getManyUsersInfo(userIDList: string[]) {
    let returnList = [];
    for (let userID of userIDList) {
        let userInfo = await getUserInfo(userID);
        returnList.push(userInfo);
    }
    return returnList;
}

export async function getAllUsersInfo(user: IUser, query: string = '') {
    let id = user._id;
    const url = `/api/v1/users/recommend/${id}` + (query? `?${query}` : '');
    return await requestAPIJson(url);
}

export async function updateUserInfo(username: string, updatedInfo: any) {
    return await requestAPIJson('/api/v1/users/' + username,
       'PATCH',
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        updatedInfo);
}

export async function convert_to_ISingeleMessage(chat: IChat, status: MessageStatus) {
    let user = await(getUserInfo(chat.senderUsername));
    return {message: chat.content,
        sender: user,
        status}
}

export async function getPosts(query: string = '') {
    const url = '/api/v1/posts' + (query? `?${query}` : '');
    let responseData = await requestAPIJson(url);
    return await mapDataToPost(responseData);
}


export async function getPostsByIds(postIds: string[]) {
    let dataList = [];
    for (let id of postIds) {
        let responseData = await requestAPIJson('/api/v1/posts/' + id, );
        dataList.push(responseData);
    }
    return await mapDataToPost(dataList);
}

export async function getPostsByUserId(userId: string) {
    let responseData = await requestAPIJson('/api/v1/posts/user/' + userId);
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
            avatarPath: user.avatarPath ? user.avatarPath : './images/photoP.png',
            image: '',
            likedUserIds: post.likedUserIds,
            comments: comments,
            type: post.type,
            visibility: post.visibility,
            tags: post.tags,
        };
        postList.push(newPost);
    }
    return postList;
}

export async function getUserById(userId: string) {
    return await requestAPIJson('/api/v1/users/ids/' + userId);
}

export async function getCommentsByPost(postId: string) {
    let comments = await requestAPIJson('/api/v1/comments/' + postId);
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

export async function getAllTags() {
    return await requestAPIJson('/api/v1/tags');
}
export async function addNewTag(tagName: string) {
    return await requestAPIJson('/api/v1/tags',
        'POST',
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, {name: tagName});
}