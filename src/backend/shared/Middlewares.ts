import {Types} from "mongoose";
import Express from "express";
const express = Express();
const {response, request} = express;
import {Status} from "../models/StatusModel";

type Request = typeof request;
type Response = typeof response;

export function checkIsValidObjectId(req: any, res: any, next: any) {
    const ids = Object.keys(req.params);
    const areAllParamIdsValid: boolean = ids.every(id => Types.ObjectId.isValid(req.params[id]));
    areAllParamIdsValid ? next() : next(new Error('Unable to parse invalid object id'));
}

export function managementMiddleware(req: Request, res: Response, next: any) {
    res.on('finish', async () => {
        const old_stat = await Status.findOne({apiName: req.baseUrl || req.path, method: req.method, statusCode: res.statusCode}).exec();
        if (!old_stat){
            await Status.create({apiName: req.baseUrl || req.path, method: req.method, statusCode: res.statusCode, count: 1});
            return;
        }
        old_stat.count++;
        await old_stat.save();
    });
    next()
}

