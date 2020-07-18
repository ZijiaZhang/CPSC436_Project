import {Document, Model, model, Schema} from "mongoose";
import {uniqueValidator} from "../shared/Helpers";
import {ITag} from "../../shared/ModelInterfaces";

interface ITagSchema extends Document, ITag {
    _id: string,
}

interface ITagModel extends Model<ITagSchema> {
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

export const Tag = model<ITagSchema, ITagModel>('tag', tagSchema);
