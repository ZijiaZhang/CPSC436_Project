import {Document, Model, model, Schema, Types} from "mongoose";
import ObjectId = Types.ObjectId;
import { IPost } from "../../shared/ModelInterfaces";

interface IPostSchema extends Document, IPost {
    _id: string
}

interface IPostModel extends Model<IPostSchema> {
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

export const Post = model<IPostSchema, IPostModel>('post', postSchema);


