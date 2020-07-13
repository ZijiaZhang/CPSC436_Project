import {Document, Model, model, Schema, Types} from "mongoose";
import ObjectId = Types.ObjectId;
import {IUploadedFile} from "./PostModel";

interface ICommentSchema extends Document {
    _id: string,
    userId: string,
    postId: string,
    time: Date,
    detail: string,
    visibility: string,
}

export interface IComment extends ICommentSchema {
}

interface ICommentModel extends Model<IComment> {
}

const commentSchema: Schema = new Schema({
    userId: {type: ObjectId, required: true,},
    postId: {type: ObjectId, required: true,},
    detail: {type: String, required: true,},
    time: Date,
    visibility: String,
});

export const Comment = model<IComment, ICommentModel>('comment', commentSchema);
