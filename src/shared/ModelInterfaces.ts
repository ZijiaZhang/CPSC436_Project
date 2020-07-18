export interface ITag {
    _id: string,
    name: string
}

export interface IUser {
    _id: string,
    username: string,
    fullname: string,
    password: string,
    gender: string,
    major: string,
    level: string,
    avatarPath: string,
    department: string,
    tags: ITag[],
    friendUsernames: string[],
    savedPostIds: string[],
    hiddenPostIds: string[]
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
    type: string,
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
}