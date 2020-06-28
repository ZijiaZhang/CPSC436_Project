import express from 'express';
import {chatsRouter} from "./Chats";
import {usersRouter} from "./Users";
export const apiV1Router = express.Router();

apiV1Router.use('/chats', chatsRouter);
apiV1Router.use('/users', usersRouter);

module.exports = apiV1Router;