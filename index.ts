import express, { Request, Response } from 'express';
const app = express()
const port = process.env.PORT || 3000;
import bodyParser from 'body-parser'
import { userRoutes } from './routes'

app.use(bodyParser.json())
app.use('/api/user', userRoutes)

app.get('/', async (req, res) => {
    res.send("server working")
})


app.listen(port, () => {
    console.log('server is running');
})