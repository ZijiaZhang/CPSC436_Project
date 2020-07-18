import express from 'express';
import {chatsRouter} from "./Chats";
import {usersRouter} from "./Users";
import {postsRouter} from "./Posts";
import {tagsRouter} from "./Tags";
export const apiV1Router = express.Router();

apiV1Router.use('/chats', chatsRouter);
apiV1Router.use('/users', usersRouter);
apiV1Router.use('/posts', postsRouter);
apiV1Router.use('/tags', tagsRouter);
