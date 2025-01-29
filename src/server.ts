import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes'
import { swaggerInit } from './config/swagger'
import { GlobalErrors } from './middlewares/global-errors'

// Create Express Server 
const app = express()

// Express Configuration
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
swaggerInit(app)

// Middlewares
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(morgan('dev'))

// Routes
app.use(routes)
app.use(GlobalErrors)
app.use((_: Request, res: Response) => {
    res.status(404).json({ message: 'Not Found' })
})

// Export 
export default app