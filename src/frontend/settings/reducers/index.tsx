import {combineReducers} from "redux";
import {IUser} from "../../../shared/ModelInterfaces";

let postList: any[] = [];
let savedPostList: any[] = [];
let hiddenPostList: any[] = [];
let recommendedUsers: any[] = [];
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
    savedPostIds: [],
    hiddenPostIds: [],
    blackListUserIds: []
};

export let userFriendList: IUser[] = [];

export const userInfoReducer = (curUser: IUser = Object.create(loginUser), action: any) => {
    if (action.type === 'LOAD_INFO') {
        loginUser = Object.create(action.loadUserInfo);
        return action.loadUserInfo;
    }
    return curUser;
};

export const userFriendsReducer = (friendList: IUser[] = userFriendList.slice(), action: any) => {
    if (action.type === 'LOAD_FRIENDS') {
        userFriendList = action.loadUserFriends.slice();
        return action.loadUserFriends;
    }
    return friendList;
};

const inputDraftReducer = (draft = "", action: { type: string; saveInputDraft: string; }) => {
    if (action.type === 'SAVE_DRAFT') {
        return action.saveInputDraft;
    }
    return draft;
};
const postListReducer = (posts = postList.slice(), action: any) => {
    switch(action.type) {
        case 'LOAD_POST':
            postList = action.loadPosts;
            return action.loadPosts;
        case 'ADD_POST':
            postList.push(action.addPost);
            return postList.slice();
        case 'UPDATE_LIKE':
            let updateLike = posts.findIndex(post => post.id === action.updateId);
            console.log(updateLike);
            posts[updateLike].likedUserIds = action.updateLike;
            return posts.slice();
        case 'ADD_COMMENT':
            let updateComment = posts.findIndex(post => post.id === action.updateId);
            posts[updateComment].comments.push(action.newComment);
            return posts.slice();
        case 'DELETE_POST':
            let deletePost = posts.findIndex(post => post.id === action.deletePost);
            posts.splice(deletePost, 1);
            return posts.slice();
        default:
            return posts;
    }
};
const savedPostsReducer = (savedPosts = savedPostList.slice(), action: any) => {
    if (action.type === "LOAD_SAVED_POSTS") {
        savedPostList = action.loadSavedPosts;
        return action.loadSavedPosts;
    }
    return savedPosts;
};
const hiddenPostsReducer = (hiddenPosts = hiddenPostList.slice(), action: any) => {
    if (action.type === "LOAD_HIDDEN_POSTS") {
        hiddenPosts = action.loadHiddenPosts;
        return action.loadHiddenPosts;
    }
    return hiddenPosts;
};
const recommendedUsersReducer = (userList = recommendedUsers.slice(), action: any) => {
    if (action.type === "LOAD_REC_USERS") {
        recommendedUsers = action.loadRecommendedUsers;
        return action.loadRecommendedUsers;
    } else if(action.type === "FRIEND_REC_USER") {
        let updateUser = userList.findIndex(user => user.username === action.recUsername);
        userList[updateUser].friendUsernames = action.newFriendList;
        return userList.slice();
    }
    return userList;
};

export default combineReducers({
    postList: postListReducer,
    inputDraft: inputDraftReducer,
    userInfo: userInfoReducer,
    userFriends: userFriendsReducer,
    savedPosts: savedPostsReducer,
    hiddenPosts: hiddenPostsReducer,
    recommendedUsers: recommendedUsersReducer
});
