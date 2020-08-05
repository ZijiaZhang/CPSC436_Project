import {combineReducers} from "redux";
import {ITag, IUser} from "../../../shared/ModelInterfaces";

let postList: any[] = [];
let savedPostList: any[] = [];
let hiddenPostList: any[] = [];
let recommendedUsers: any[] = [];
let tagList: ITag[] = [];
let displayedUser: IUser = {
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
    blackListUserIds: [],
    groups: [],
    courses: []
};

let loginUser: IUser = {
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
    blackListUserIds: [],
    groups: [],
    courses: []
};
let displayedFriendList: IUser[] = [];
let userFriendList: IUser[] = [];

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
        return savedPostList.slice();
    } else if (action.type === "DELETE_POST") {
        let deletePost = savedPosts.findIndex(post => post.id === action.deletePost);
        savedPosts.splice(deletePost, 1);
        return savedPosts.slice();
    }
    return savedPosts;
};
const hiddenPostsReducer = (hiddenPosts = hiddenPostList.slice(), action: any) => {
    if (action.type === "LOAD_HIDDEN_POSTS") {
        hiddenPostList = action.loadHiddenPosts;
        return hiddenPostList.slice();
    } else if (action.type === "DELETE_POST") {
        let deletePost = hiddenPosts.findIndex(post => post.id === action.deletePost);
        hiddenPosts.splice(deletePost, 1);
        return hiddenPosts.slice();
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

const displayedUserReducer = (userDisplay = displayedUser, action: any) => {
    if(action.type === "LOAD_DISPLAYED_USER") {
        displayedUser = Object.create(action.displayedUser);
        return action.displayedUser;
    }
    return userDisplay;
};

const displayedFriendsReducer = (friendsDisplay = displayedFriendList, action: any) => {
    if(action.type === "LOAD_DISPLAYED_FRIENDS") {
        displayedFriendList = action.displayedFriends.slice();
        return action.displayedFriends;
    }
    return friendsDisplay;
};

const tagListReducer = (tags = tagList, action: any) => {
    if (action.type === "LOAD_TAGS") {
        tagList = action.tags.slice();
        return action.tags
    } else if (action.type === "ADD_TAG") {
        tagList.push(action.tag);
        return tagList;
    }
    return tags;
};

export default combineReducers({
    postList: postListReducer,
    userInfo: userInfoReducer,
    userFriends: userFriendsReducer,
    savedPosts: savedPostsReducer,
    hiddenPosts: hiddenPostsReducer,
    recommendedUsers: recommendedUsersReducer,
    displayedUser: displayedUserReducer,
    displayedFriends: displayedFriendsReducer,
    tagList: tagListReducer
});
