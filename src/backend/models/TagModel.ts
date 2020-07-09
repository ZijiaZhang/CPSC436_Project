import {Document, Model, model, Schema} from "mongoose";
import {uniqueValidator} from "../shared/Helpers";

interface ITagSchema extends Document {
    _id: string,
    name: string
}

export interface ITag extends ITagSchema {
}

interface ITagModel extends Model<ITag> {
}

const tagSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string) {
                return uniqueValidator({name: v}, Tag);
            },
            message: '{VALUE} is used already! Failed to add tag.'
        }
    }
});

export const Tag = model<ITag, ITagModel>('tag', tagSchema);
