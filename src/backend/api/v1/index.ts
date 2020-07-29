import express from 'express';
import {chatsRouter} from "./Chats";
import {usersRouter} from "./Users";
import {postsRouter} from "./Posts";
import {groupsRouter} from "./Groups";
import {groupChatsRouter} from "./GroupChats";
import {tagsRouter} from "./Tags";
import {commentsRouter} from "./Comments";
import {statusRouter} from "./Status";
export const apiV1Router = express.Router();

apiV1Router.use('/chats', chatsRouter);
apiV1Router.use('/users', usersRouter);
apiV1Router.use('/posts', postsRouter);
apiV1Router.use('/groups', groupsRouter);
apiV1Router.use('/group_chats', groupChatsRouter);
apiV1Router.use('/tags', tagsRouter);
apiV1Router.use('/comments', commentsRouter);
apiV1Router.use('/status', statusRouter);
