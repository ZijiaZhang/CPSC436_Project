import {Document, Model, model, Schema, Types} from "mongoose";
import ObjectId = Types.ObjectId;
import { IComment } from "../../shared/ModelInterfaces";

interface ICommentSchema extends Document, IComment {
    _id: string,
}

interface ICommentModel extends Model<ICommentSchema> {
}

const commentSchema: Schema = new Schema({
    userId: {type: ObjectId, required: true,},
    postId: {type: ObjectId, required: true,},
    detail: {type: String, required: true,},
    time: Date,
    visibility: String,
});

export const Comment = model<ICommentSchema, ICommentModel>('comment', commentSchema);
