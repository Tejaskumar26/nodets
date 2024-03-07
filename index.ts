import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
const app = express()
const port = process.env.APP_PORT || 3000;
import bodyParser from 'body-parser'
import { userRoutes } from './routes'
import { success, error } from './utils/response'


app.use(bodyParser.json())
app.use('/api/user', userRoutes)

app.get('/', async (req: Request, res: Response) => {
    return success(res, {
        statusCode: 200,
        message: "Server is working",
        data: "Test server"
    })
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})