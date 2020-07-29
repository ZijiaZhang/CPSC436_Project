import {Document, Model, model, Schema} from "mongoose";
import {IStatus} from "../../shared/ModelInterfaces";

interface IStatusSchema extends Document, IStatus {
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
