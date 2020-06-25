export const addPost = (newPost: any) => {
    return {
        type: 'ADD_POST',
        modification: newPost
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
        modification: index
    }
};
export const undoLike = (index: any) => {
    return {
        type: 'UNDO_LIKE',
        modification: index
    }
};
export const addComment = (comment: any) => {
    return {
        type: 'ADD_COMMENT',
        modification: comment
    }
};
export const hidePost = (index: any) => {
    return {
        type: 'HIDE_POST',
        modification: index
    }
};
export const displayDetail = (detailedMessage: any) => {
    return {
        type: 'DETAILED_MESSAGE',
        displayDetail: detailedMessage
    }
};
