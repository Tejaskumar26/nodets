import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const s3 = new S3Client({
    region: process.env.AWS_S3_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ""
    }
});

const uploadToS3 = (req: any, res: any, filePath: any, filter: any) => {
    try {
        const storage = multerS3({
            s3: s3,
            bucket: process.env.AWS_S3_BUCKET_NAME ?? "",
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata: function (req: any, file: any, cb: any) {
                cb(null, { fieldName: file.originalname });
            },
            key: function (req: any, file: any, cb: any) {
                cb(null, filePath + uuidv4() + path.extname(file.originalname));
            },
        })
        const upload = multer({ storage: storage, fileFilter: filter }).single('file');
        return new Promise((resolve, reject) => {
            upload(req, res, function (err: any) {
                if (req.fileValidationError) {
                    return reject(req.fileValidationError)
                } else if (!req.file) {
                    return reject('Please select a file to upload')
                } else if (err) {
                    console.log(err);
                    return reject('Something went wrong!')
                } else {
                    return resolve(req.file.key)
                }
            })
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Unable to upload' });
    }
}

export default uploadToS3;