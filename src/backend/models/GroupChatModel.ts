import {Document, Model, model, Schema} from "mongoose";
import { IGroupChat } from "../../shared/ModelInterfaces";

interface IGroupChatSchema extends Document, IGroupChat {
}

interface IGroupChatModel extends Model<IGroupChatSchema> {
}

const groupChatSchema: Schema = new Schema({
    senderUsername: {type: String, required: true,},
    groupChatID: {type: String, required: true,},
    content: String,
    time: Date
});

export const GroupChat = model<IGroupChatSchema, IGroupChatModel>('group_chat', groupChatSchema);
