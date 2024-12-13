import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from '@/routes'

// Create Express server
const app = express()

// Express configuration
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(cors())
app.use(morgan('dev'))

// Routes
app.use('/api', router)

// Export express instance
export default app