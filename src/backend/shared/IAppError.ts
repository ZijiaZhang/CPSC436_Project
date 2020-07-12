// export interface IAppError extends Error{
//     statusCode: number
// }

// TODO: Not sure if we are going to use this
export class AppError extends Error{
    // default status code = 500
    statusCode: number = 500;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}
