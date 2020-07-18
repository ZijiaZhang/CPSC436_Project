import {Document, Model, model, Schema} from "mongoose";

interface IGroupSchema extends Document {
    users: string[];
    name: string;
}

export interface IGroup extends IGroupSchema {
}

interface IGroupModel extends Model<IGroup> {
}

const groupSchema: Schema = new Schema({
    users: [String],
    name: String,
});

export const Group = model<IGroup, IGroupModel>('group', groupSchema);
