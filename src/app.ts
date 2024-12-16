import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes'
import { swaggerInit } from './config/swagger'
import { GlobalErrors } from './middlewares/global-errors'

// Create Express server
const app = express()

// Express configuration
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
swaggerInit(app)

// Middlewares
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(morgan('dev'))

// Routes
app.use(router)
app.use(GlobalErrors)
app.use((_: Request, res: Response) => {
    res.status(404).json({ error: 'Not found!' });
});

// Export express instance
export default app