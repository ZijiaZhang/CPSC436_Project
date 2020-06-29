const mongoose = require('mongoose');
const {Schema, model, ObjectId} = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';


function uniqueValidator(uniqueProperties: any, model: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
        model.findOne(uniqueProperties, (err: Error, existingModelInstance: any) => {
            if (err) return reject(err);
            const isUnique = existingModelInstance === null;
            resolve(isUnique);
        })
    });
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
    password: {type: String},
    gender: String,
    major: String,
    year: String,
    tags: [String],
    friendUsernames: [String],
    savedPostIds: [ObjectId],
    hiddenPostIds: [ObjectId]
});

userSchema.plugin(passportLocalMongoose);

export const User = model('User', userSchema);

const postSchema = new Schema({
    time: Date,
    username: {type: String, required: true,},
    detail: String,
    avatarPath: String,
    uploadedFiles: [{
        type: String,
        path: String
    }],
    comments: [
        {
            username: {type: String, required: true,},
            detail: String,
            time: Date,
            visibility: String,
            uploadedFiles: [{
                type: String,
                path: String
            }]
        }
    ],
    type: String,
    visibility: String,
    tags: [String],
    likedUsernames: [String]
});
export const Post = model('post', postSchema);

export interface databaseChat extends Document{
    senderUsername: string;
    receiverUsername: string;
    content: string;
    time: Date;
}

const chatSchema = new Schema({
    senderUsername: {type: String, required: true,},
    receiverUsername: {type: String, required: true,},
    content: String,
    time: Date
});
export const Chat = model('chat', chatSchema);

const tagSchema = new Schema({
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
export const Tag = model('tag', tagSchema);
