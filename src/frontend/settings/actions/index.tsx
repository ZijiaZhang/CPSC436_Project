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