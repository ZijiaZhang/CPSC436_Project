import {Types} from "mongoose";
import {AppError} from "./IAppError";
import Express from "express";
const express = Express();
const {response, request} = express;

type Request = typeof request;
type Response = typeof response;

export function checkIsValidObjectId(req: any, res: any, next: any) {
    const ids = Object.keys(req.params);
    const areAllParamIdsValid: boolean = ids.every(id => Types.ObjectId.isValid(req.params[id]));
    areAllParamIdsValid ? next() : next(new Error('Unable to parse invalid object id'));
}

// TODO
// export function errorHandler(err: AppError, req: Request, res: Response, next: any) {
//     // uncomment this following line print stack trace for debugging purposes
//     console.error(err.stack);
//
//     res.status(err.statusCode).json({message: err.message}); // Frontend users should not see backend trace
// }
