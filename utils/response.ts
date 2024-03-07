import { Response } from 'express';

interface SuccessResponse {
    statusCode: number;
    message: string;
    data: any;
}

interface ErrorResponse {
    statusCode: number;
    message: string;
    errors?: any;
}

export const success = (res: Response, obj: SuccessResponse): Response => {
    const { statusCode, message, data } = obj;
    return res.status(statusCode).json({ status: true, message, data });
};

export const error = (res: Response, e: ErrorResponse): Response => {
    const { statusCode, message, errors } = e;
    return res.status(statusCode).json({ status: false, message, errors });
};
