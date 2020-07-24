import {Document, Model, model, Schema} from "mongoose";

interface IStatusSchema extends Document {
    apiName: string,
    statusCode: number,
    method: string,
    count: number
}

interface IStatusModel extends Model<IStatusSchema> {
}

const StatusSchema: Schema = new Schema({
    apiName: {type: String, required: true,},
    count: {type: Number, required: true,},
    statusCode: Number,
    method: String
});

export const Status = model<IStatusSchema, IStatusModel>('Status', StatusSchema);
