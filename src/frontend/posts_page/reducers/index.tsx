import {combineReducers} from 'redux';
import {IPost} from "../components/PostBlock";
import {userFriendsReducer, userInfoReducer} from "../../settings/reducers";

let postList: IPost[] = [];

const inputDraftReducer = (draft = "", action: { type: string; saveInputDraft: string; }) => {
    if (action.type === 'SAVE_DRAFT') {
        return action.saveInputDraft;
    }
    return draft;
};
const postListReducer = (posts = postList, action: any) => {
    switch(action.type) {
        case 'LOAD_POST':
            postList = action.loadPosts;
            return action.loadPosts;
        case 'ADD_POST':
            postList.push(action.addPost);
            return posts.slice(0, posts.length).concat(action.addPost);
        case 'ADD_LIKE':
            posts[action.addLike].numLikes += 1;
            posts[action.addLike].liked = true;
            return posts.slice(0, posts.length);
        case 'UNDO_LIKE':
            posts[action.undoLike].numLikes -= 1;
            posts[action.undoLike].liked = false;
            return posts.slice(0, posts.length);
        case 'ADD_COMMENT':
            const comment = action.newComment;
            posts[comment.index].comments.push(comment.detail);
            return posts.slice(0, posts.length);
        case 'HIDE_POST':
            posts[action.hidePost].hidden = !posts[action.hidePost].hidden;
            return posts.slice(0, posts.length);
        default:
            return posts;
    }
};


export default combineReducers({
    postList: postListReducer,
    inputDraft: inputDraftReducer,
    userInfo: userInfoReducer,
    userFriends: userFriendsReducer
});
