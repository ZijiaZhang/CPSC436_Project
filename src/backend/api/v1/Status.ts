import express from "express";
import {Status} from "../../models/StatusModel";

export const statusRouter = express.Router();

statusRouter.get('/', (async (req, res, next) => {
    let r = await Status.find({}).exec();
    res.json(r);
}));
