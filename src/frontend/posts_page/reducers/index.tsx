import {combineReducers} from 'redux';
import {userFriendsReducer, userInfoReducer} from "../../settings/reducers";

let postList: any[] = [];
let savedPostList: any[] = [];

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
            return posts.slice().concat(action.addPost);
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


export default combineReducers({
    postList: postListReducer,
    inputDraft: inputDraftReducer,
    userInfo: userInfoReducer,
    userFriends: userFriendsReducer,
    savedPosts: savedPostsReducer
});
