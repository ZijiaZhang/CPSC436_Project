import express from "express";
import {checkIsValidObjectId} from "../../shared/Middlewares";
import {Comment} from "../../models/CommentModel";
import { IComment } from "../../../shared/ModelInterfaces";

export const commentsRouter = express.Router();

// get all comments for a post with postId
commentsRouter.get('/:postId', checkIsValidObjectId, (req, res, next) => {
    const {postId} = req.params;
    const query = Comment.find({postId});
    query.exec()
        .then((comments: IComment[]) => {
            res.json(comments);
        })
        .catch(() => res.status(500).json({message: `Failed getting comments for post ${postId}`}));
});

// update comment with id
commentsRouter.patch('/:commentId', checkIsValidObjectId, (req, res, next) => {
    const {commentId} = req.params;
    const newProperties = req.body;
    const query = Comment.findByIdAndUpdate(commentId, newProperties, {new: true});
    query.exec()
        .then((comment: IComment | null) => {
            comment === null ?
                res.status(400).json({message: `Comment with id ${commentId} cannot be found`}) :
                res.json(comment);
        })
        .catch(() => res.status(500).json({message: `Failed updating comment ${commentId}`}));
});

// add new comment
commentsRouter.post('/', (req, res, next) => {
    const comment = req.body;

    Comment.create(comment)
        .then((newComment: IComment) => {
            res.json(newComment);
        })
        .catch(() => res.status(500).json({message: 'Failed to add comment'}));
});

// delete comment with id
commentsRouter.delete('/:commentId', checkIsValidObjectId, (req, res, next) => {
    const {commentId} = req.params;
    const query = Comment.findByIdAndDelete(commentId);
    query.exec()
        .then(() => res.json({message: "Comment Deleted"}))
        .catch(() => res.status(500).json({message: `Failed to delete comment with id ${commentId}`}))
});
