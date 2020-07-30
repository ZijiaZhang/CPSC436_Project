import {Document, Model, model, Schema} from "mongoose";
import { IChat } from "../../shared/ModelInterfaces";

interface IChatSchema extends Document, IChat {
}

interface IChatModel extends Model<IChatSchema> {
}

const chatSchema: Schema = new Schema({
    senderUsername: {type: String, required: true,},
    receiverUsername: {type: String, required: true,},
    content: String,
    time: Date,
    read: Boolean,
});

export const Chat = model<IChatSchema, IChatModel>('chat', chatSchema);
