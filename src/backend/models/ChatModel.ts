import {Document, Model, model, Schema} from "mongoose";

interface IChatSchema extends Document {
    senderUsername: string;
    receiverUsername: string;
    content: string;
    time: Date;
}

export interface IChat extends IChatSchema {
}

interface IChatModel extends Model<IChat> {
}

const chatSchema: Schema = new Schema({
    senderUsername: {type: String, required: true,},
    receiverUsername: {type: String, required: true,},
    content: String,
    time: Date
});

export const Chat = model<IChat, IChatModel>('chat', chatSchema);
