import express from "express";
import {checkIsValidObjectId} from "../../shared/Middlewares";

export const commentsRouter = express.Router();

// get all comments for a post with postId
commentsRouter.get('/:postId', checkIsValidObjectId, (req, res, next) => {

});

// update comment with id
commentsRouter.patch('/:commentId', checkIsValidObjectId, (req, res, next) => {

});

// add new comment
commentsRouter.post('/', checkIsValidObjectId, (req, res, next) => {

});

// delete comment with id
commentsRouter.delete('/:commentId', checkIsValidObjectId, (req, res, next) => {

});