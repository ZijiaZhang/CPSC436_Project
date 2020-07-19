import {Document, model, PassportLocalModel, Schema, Types} from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import ObjectId = Types.ObjectId;
import {uniqueValidator} from "../shared/Helpers";
import { IUser } from "../../shared/ModelInterfaces";

interface IUserSchema extends Document, IUser {
    _id: string,
}

interface IUserModel extends PassportLocalModel<IUserSchema> {
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        immutable: true,
        unique: true,
        validate: [{
            validator: (v: string): boolean => {
                return v.length >= 1;
            },
            message: 'Username must be greater than length of 1'
        }, {
            validator: (v: string): Promise<boolean> => {
                return uniqueValidator({username: v}, User);
            },
            message: 'Failed to add user because username {VALUE} is used already.'
        }]
    },
    fullname: {type: String, required: true},
    password: {type: String},
    gender: String,
    major: String,
    level: String,
    avatarPath: String,
    tags: [ObjectId],
    friendUsernames: [String],
    savedPostIds: [ObjectId],
    hiddenPostIds: [ObjectId],
});

userSchema.plugin(passportLocalMongoose);

export const User = model<IUserSchema, IUserModel>('User', userSchema);
