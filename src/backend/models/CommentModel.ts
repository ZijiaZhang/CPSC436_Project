import {Document, Model, model, Schema, Types} from "mongoose";
import ObjectId = Types.ObjectId;
import {IUploadedFile} from "./PostModel";

interface ICommentSchema extends Document {
    _id: string,
    username: string,
    post: string,
    time: Date,
    detail: string,
    uploadedFiles: IUploadedFile[],
    visibility: string,
}

export interface IComment extends ICommentSchema {
}

interface ICommentModel extends Model<IComment> {
}

const commentSchema: Schema = new Schema({
    username: {type: String, required: true,},
    post: {type: ObjectId, required: true,},
    detail: String,
    time: Date,
    visibility: String,
    uploadedFiles: [{
        type: String,
        path: String
    }]
});

export const Comment = model<IComment, ICommentModel>('comment', commentSchema);
