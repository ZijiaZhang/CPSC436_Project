import express from 'express';
import {apiV1Router} from "./v1";
export const apiRouter = express.Router();

apiRouter.use('/v1', apiV1Router);

