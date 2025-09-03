import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from './config/cors'
import { healthchecktHandler } from './controllers/Healthcheck.controller'
import { connetDB } from './config/db'
import authRoutes from './routes/auth.routes'


dotenv.config()
connetDB()
const app = express()
app.use(cors(corsConfig))
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/healthcheck', healthchecktHandler)


export default app