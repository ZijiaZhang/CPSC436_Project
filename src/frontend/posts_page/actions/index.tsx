export const addPost = (newPost: any) => {
    return {
        type: 'ADD_POST',
        addPost: newPost
    }
};
export const saveInputDraft = (curInput: string) => {
    return {
        type: 'SAVE_DRAFT',
        saveInputDraft: curInput
    }
};
export const addLike = (index: any) => {
    return {
        type: 'ADD_LIKE',
        addLike: index
    }
};
export const undoLike = (index: any) => {
    return {
        type: 'UNDO_LIKE',
        undoLike: index
    }
};
export const addComment = (comment: any) => {
    return {
        type: 'ADD_COMMENT',
        newComment: comment
    }
};
export const hidePost = (index: any) => {
    return {
        type: 'HIDE_POST',
        hidePost: index
    }
};
export const loadPosts = (postList: any[]) => {
    return {
        type: 'LOAD_POST',
        loadPosts: postList
    }
};
export const displayDetail = (detailedMessage: any) => {
    return {
        type: 'DETAILED_MESSAGE',
        displayDetail: detailedMessage
    }
};
