import express from 'express';
import {chatsRouter} from "./Chats";
export const apiV1Router = express.Router();

apiV1Router.use('/chats', chatsRouter);
