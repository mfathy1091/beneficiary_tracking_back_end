import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import router from './routes/index';
import ErrorHandler from './middlewares/ErrorHandler'
import cors from 'cors'


const app: express.Application = express()
const address: string = "127.0.0.1:"+ process.env.NODE_PORT

app.use(express.json())
app.use(express.urlencoded());
app.use(cors())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})
app.use(morgan("common"))

app.use('/api', router);

interface Error {
    name? : string,
    message?: string,
    stack?: string,
    status?: number,
}





app.use(ErrorHandler);

app.use((_req: Request, res: Response) => {
    res.status(404).json({
        message: 'Not Found'
    })
})

app.listen(process.env.NODE_PORT, function () {
    console.log(`starting app on: ${address}`)
})

export default app