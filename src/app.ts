import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes'
import { swaggerInit } from './config/swagger'

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

// Export express instance
export default app