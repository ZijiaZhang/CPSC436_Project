import {Document, Model, model, Schema} from "mongoose";
import { IGroup } from "../../shared/ModelInterfaces";

interface IGroupSchema extends Document, IGroup {
    _id: string
}

interface IGroupModel extends Model<IGroupSchema> {
}

const groupSchema: Schema = new Schema({
    users: [String],
    name: String,
});

export const Group = model<IGroupSchema, IGroupModel>('group', groupSchema);
