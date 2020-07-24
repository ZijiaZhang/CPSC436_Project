import express from 'express';
import {checkIsValidObjectId} from "../../shared/Middlewares";
import {Post} from "../../models/PostModel";
import {Comment} from "../../models/CommentModel";
import {commentsRouter} from "./Comments";
import {IPost} from "../../../shared/ModelInterfaces";
import {FilterQuery} from "mongoose";

export const postsRouter = express.Router();

postsRouter.use('/comments', commentsRouter);

// get all posts
postsRouter.get('/', (req, res, next) => {
    const conditions: FilterQuery<IPost> = {};
    if (Object.keys(req.query).length > 0) {
        const content = req.query.content as string;
        // case insensitive search with option "i"
        conditions.detail = {"$regex": content, "$options": "i"};
    }
    const query = Post.find(conditions);
    return query.exec()
        .then((posts: IPost[]) => {
            res.json(posts)
        })
        .catch(() => {
            res.status(500).json({message: 'Failed getting all posts.'})
        });
});

// get post with id
postsRouter.get('/:id', checkIsValidObjectId, (req, res, next) => {
    const postId = req.params.id;

    const query = Post.findById(postId);
    return query.exec()
        .then((post: IPost | null) => {
            if (post === null) {
                res.status(400).json({message: `Cannot find post with id ${postId}`});
            } else {
                res.json(post);
            }
        })
        .catch((err: Error) => {
            console.error(err);
            res.status(500).json({message: 'Failed getting post.'})
        });
});

// get all posts of user with userId
postsRouter.get('/user/:userId', checkIsValidObjectId, (req, res, next) => {
    const {userId} = req.params;
    const query = Post.find({userId});
    return query.exec()
        .then((posts: IPost[]) => {
            res.json(posts)
        })
        .catch(() => {
            res.status(500).json({message: `Failed getting posts for user ${userId}.`})
        });
});

// add new post
postsRouter.post('/', (req, res, next) => {
    const post = req.body;

    Post.create(post)
        .then((newPost: IPost) => {
            res.json(newPost)
        })
        .catch(() => {
            res.status(500).json({message: `Failed add new post for user ${post.username}.`})
        });
});

// update post with id
postsRouter.patch('/:id', (req, res, next) => {
    const {id} = req.params;
    const newProperties = req.body;
    const query = Post.findByIdAndUpdate(id, newProperties, {new: true});
    query.exec()
        .then((post: IPost | null) => {
            if (post === null) {
                res.status(400).json({message: `Cannot find post with id ${id}`});
            } else{
                res.json(post);
            }
        })
        .catch(() => {
            res.status(500).json({message: `Failed to update post with id ${id}`});
        })
});

// delete post with id
postsRouter.delete('/:id', checkIsValidObjectId, (req, res, next) => {
    const {id} = req.params;
    const postQuery = Post.findByIdAndDelete(id);
    const commentQuery = Comment.deleteMany({postId: id});
    Promise.all([postQuery.exec(), commentQuery.exec()])
        .then(() => res.json({message: "Pose Deleted"}))
        .catch(() => {
            res.status(500).json({message: `Failed to delete post with id ${id}`});
        });
});
