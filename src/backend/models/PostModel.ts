import {Document, Model, model, Schema, Types} from "mongoose";
import ObjectId = Types.ObjectId;
import {ITag} from "./TagModel";

interface IPostSchema extends Document {
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

export interface IPost extends IPostSchema {
}

interface IPostModel extends Model<IPost> {
}

const postSchema: Schema = new Schema({
    time: Date,
    userId: {type: ObjectId, required: true,},
    detail: {type: String, required: true,},
    uploadedFiles: [{
        type: String,
        path: String
    }],
    type: String,
    visibility: String,
    tags: [ObjectId],
    likedUserIds: [ObjectId]
});

export const Post = model<IPost, IPostModel>('post', postSchema);

export interface IUploadedFile {
    type: string,
    path: string
}
