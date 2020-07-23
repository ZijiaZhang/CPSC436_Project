export const loadUserInfo = (user: any) => {
    return {
        type: "LOAD_INFO",
        loadUserInfo: user
    }
};

export const loadUserFriends = (friendList: any) => {
    return {
        type: "LOAD_FRIENDS",
        loadUserFriends: friendList
    }
};

export const loadDisplayedUser = (user: any) => {
    return {
        type: "LOAD_DISPLAYED_USER",
        displayedUser: user
    }
};

export const loadDisplayedFriends = (friendList: any) => {
    return {
        type: "LOAD_DISPLAYED_FRIENDS",
        displayedFriends: friendList
    }
};

export const loadTags = (tagList: any) => {
    return {
        type: "LOAD_TAGS",
        tags: tagList
    }
};

export const addTag = (newTag: any) => {
    return {
        type: "ADD_TAG",
        tag: newTag
    }
};
