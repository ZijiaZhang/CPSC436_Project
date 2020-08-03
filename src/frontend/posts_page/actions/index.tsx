export const addPost = (newPost: any) => {
    return {
        type: 'ADD_POST',
        addPost: newPost
    }
};
export const updateLike = (likes: number, id: string) => {
    return {
        type: 'UPDATE_LIKE',
        updateLike: likes,
        updateId: id
    }
};
export const addComment = (comment: any, id: string) => {
    return {
        type: 'ADD_COMMENT',
        newComment: comment,
        updateId: id
    }
};
export const loadPosts = (postList: any[]) => {
    return {
        type: 'LOAD_POST',
        loadPosts: postList
    }
};
export const deletePost = (id: string) => {
    return {
        type: "DELETE_POST",
        deletePost: id
    }
};
export const loadSavedPosts = (savedPosts: any) => {
    return {
        type: "LOAD_SAVED_POSTS",
        loadSavedPosts: savedPosts
    }
};
export const loadHiddenPosts = (hiddenPosts: any) => {
    return {
        type: "LOAD_HIDDEN_POSTS",
        loadHiddenPosts: hiddenPosts
    }
};
export const loadRecommendedUsers = (recommendedUsers: any) => {
    return {
        type: "LOAD_REC_USERS",
        loadRecommendedUsers: recommendedUsers
    }
};
export const AddFriendRecUser = (username: string, friends: any) => {
    return {
        type: "FRIEND_REC_USER",
        recUsername: username,
        newFriendList: friends,
    }
};