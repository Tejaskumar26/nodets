import { Response, Request } from 'express'
import db from '../../models'
import s3 from '../../utils/s3bucket';
import { getLimitAndOffset, pagination } from '../../utils/helper';
export const sample = async (req: Request, res: Response) => {
    try {
        const sampleData = {
            message: 'This is a sample API response',
            timestamp: new Date()
        };
        res.json(sampleData);
    } catch (error) {
        console.log(error);
        res.send("something went wrong")
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await db.User.create({
            firstName: "tejas",
            lastNAme: 'kumar'
        })
        return res.status(200).json({ message: 'Success', data: user });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Something went wrong' });

    }
}

export const getUSers = async (req: Request, res: Response) => {
    try {
        const page = 2;
        const page_size = 0;
        const { limit, offset, pageSize } = await getLimitAndOffset(page, page_size)
        const { count, rows } = await db.User.findAndCountAll({
            limit: limit,
            offset: offset
        });

        const paginationData = await pagination(page, pageSize, count)
        return res.status(200).json({
            message: 'Success', data: {
                users: rows,
                pagination: paginationData
            }
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Something went wrong' });

    }
}

export const editUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const user = await db.User.findOne({
            where: { id: id }
        });
        if (user) {
            await user.update({
                firstName: "Tejaskumar",
                lastName: 'S'
            });

            return res.status(200).json({ message: 'Success', data: user });
        } else {
            return res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

export const uploadImage = async (req: Request, res: Response) => {
    try {
        const imageFilter = function (req: any, file: any, cb: any) {
            if (file) {
                req.file = file
            }
            if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
                req.fileValidationError = 'Only image files are allowed!'
                return cb(new Error('Only image files are allowed!'), false)
            }
            if (file.fileSize > 3145728) {
                req.fileValidationError = 'File size not be greater than 3 MB'
                return cb(new Error('File size not be greater than 3 MB'), false)
            }
            cb(null, true)
        }

        const uploadedFile = await s3(req, res, 'user/', imageFilter)
        if (uploadedFile) {
            let filePath = process.env.S3_BUCKET_BASE_URL + '/' + uploadedFile
            return res.status(200).json({ message: 'Success', data: filePath });
        } else {
            return res.status(400).json({ message: 'Unable to upload' });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Something went wrong', data: error });
    }
}