import {Document, Model, model, Schema} from "mongoose";

interface IGroupChatSchema extends Document {
    senderUsername: string;
    groupChatID: string;
    content: string;
    time: Date;
}

export interface IGroupChat extends IGroupChatSchema {
}

interface IGroupChatModel extends Model<IGroupChat> {
}

const groupChatSchema: Schema = new Schema({
    senderUsername: {type: String, required: true,},
    groupChatID: {type: String, required: true,},
    content: String,
    time: Date
});

export const GroupChat = model<IGroupChat, IGroupChatModel>('group_chat', groupChatSchema);
