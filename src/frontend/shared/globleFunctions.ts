import {IChat, IGroup, IUser} from "../../shared/ModelInterfaces";
import {requestAPIJson} from "./Networks";
import {MessageStatus} from "../../shared/SocketEvents";

export let user: IUser;
export let refresh_unread: boolean = true;

export function setUnread(unread: boolean) {
    refresh_unread = unread
}

export async function getCurrentUser() {
    let temp_user = await requestAPIJson('/api/v1/users');
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
        groups: temp_user.groups,
        courses: temp_user.courses
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

export async function userAddFriends(updatedInfo: any) {
    return await requestAPIJson('/api/v1/users/user/addFriends',
        'PATCH',
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        updatedInfo);
}

export async function userDeleteFriends(updatedInfo: any) {
    return await requestAPIJson('/api/v1/users/user/deleteFriends',
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

export async function getPosts(query: string = '', loginUser: IUser) {
    const url = '/api/v1/posts' + (query? `?${query}` : '');
    let responseData = await requestAPIJson(url);
    return await mapDataToPost(responseData, loginUser);
}

export async function getSavedPosts(targetUser: IUser, loginUser: IUser, ) {
    let resList = [];
    let idList = [];
    for (let id of targetUser.savedPostIds) {
        let res = await fetch('/api/v1/posts/'  + id, {method: 'GET'});
        if (res.status !== 400) {
            resList.push(res);
            idList.push(id);
        }
    }
    if(idList !== targetUser.savedPostIds) {
        await requestAPIJson('/api/v1/users/' + targetUser.username, 'PATCH',
            {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            {
                savedPostIds: idList
            });
    }
    return await getPostsByIds(resList, loginUser);
}

export async function getHiddenPosts(targetUser: IUser, loginUser: IUser, ) {
    let resList = [];
    let idList = [];
    for (let id of targetUser.hiddenPostIds) {
        let res = await fetch('/api/v1/posts/'  + id, {method: 'GET'});
        if (res.status !== 400) {
            resList.push(res);
            idList.push(id);
        }
    }
    if(idList !== targetUser.hiddenPostIds) {
        await requestAPIJson('/api/v1/users/' + targetUser.username, 'PATCH',
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            {
                hiddenPostIds: idList
            });
    }
    return await getPostsByIds(resList, loginUser);
}

export async function getPostsByIds(resList: Response[], loginUser: IUser) {
    let dataList = [];
    for (let res of resList) {
        let responseData = await res.json();
        dataList.push(responseData);
    }
    return await mapDataToPost(dataList, loginUser);
}

export async function getPostsByUserId(userId: string, loginUser: IUser) {
    let responseData = await requestAPIJson('/api/v1/posts/user/' + userId);
    return await mapDataToPost(responseData, loginUser);
}

async function mapDataToPost(responseData: any[], loginUser: IUser) {
    let postList = [];
    for (let post of responseData) {
        let isLoginUsersPost = post.userId === loginUser._id;
        if(!(post.visibility === 'private' && !isLoginUsersPost)) {
            let user = await getUserById(post.userId);
            if(!(post.visibility === 'friendsOnly' && !loginUser.friendUsernames.includes(user.username) && !isLoginUsersPost)) {
                let comments = await getCommentsByPost(post._id, isLoginUsersPost, loginUser._id);
                const newPost = {
                    id: post._id,
                    userId: user._id,
                    time: post.time,
                    name: user.fullname,
                    detail: post.detail,
                    avatarPath: user.avatarPath ? user.avatarPath : './images/photoP.png',
                    image: post.uploadedFiles,
                    likedUserIds: post.likedUserIds,
                    comments: comments,
                    type: post.type,
                    visibility: post.visibility,
                    tags: post.tags,
                };
                postList.push(newPost);
            }
        }
    }
    return postList;
}

export async function getUserById(userId: string) {
    return await requestAPIJson('/api/v1/users/ids/' + userId);
}

export async function getCommentsByPost(postId: string, isLoginUsersPost: boolean, loginUserId: string) {
    let comments = await requestAPIJson('/api/v1/comments/' + postId);
    let commentList = [];
    for (let comment of comments) {
        if(!(comment.visibility === 'private' && !isLoginUsersPost && comment.userId !== loginUserId)) {
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

export async function getAllGroups(group_ids: string[]): Promise<IGroup[]> {
    const promiseList = group_ids.map(groupId => requestAPIJson(`api/v1/groups/${groupId}`));
    return await Promise.all(promiseList);
}

export async function getGroupByGroupId(groupId: string): Promise<IGroup> {
    return await requestAPIJson(`api/v1/groups/${groupId}`);
}
