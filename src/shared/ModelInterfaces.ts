export interface ITag {
    _id: string,
    name: string
}

export interface IUser {
    _id: string,
    username: string,
    fullname: string,
    gender: string,
    major: string,
    level: string,
    avatarPath: string,
    department: string,
    tags: ITag[],
    friendUsernames: string[],
    savedPostIds: string[],
    hiddenPostIds: string[],
    groups: string[],
    blackListUserIds: string[],
    courses: ICourse[]
}

export interface IPost {
    _id: string,
    time: Date,
    userId: string,
    detail: string,
    uploadedFiles: IUploadedFile[],
    type: string,
    visibility: string,
    tags: ITag[],
    likedUserIds: string[]
}

export interface IUploadedFile {
    fileType: string,
    path: string
}

export interface IComment {
    _id: string,
    userId: string,
    postId: string,
    time: Date,
    detail: string,
    visibility: string,
}

export interface IChat {
    senderUsername: string;
    receiverUsername: string;
    content: string;
    time: Date;
    read: boolean;
}

export interface IStatus {
    apiName: string,
    statusCode: number,
    method: string,
    count: number
}

export interface ICourse {
    name: string,
    activity: string,
    section: string,
    term: string,
    lastUpdated: string
}

export interface IGroup {
    _id: string,
    users: string[],
    name: string
}

export interface IGroupChat {
    senderUsername: string;
    groupChatID: string;
    content: string;
    time: Date;
}

