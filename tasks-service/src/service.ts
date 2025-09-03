import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from './config/cors'
import { healthChecktHandler } from './controllers/Healthcheck.controller'
import { connetDB } from './config/db'
import taskRoutes from './routes/task.routes'


dotenv.config()
connetDB()
const app = express()
app.use(cors(corsConfig))

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/v1/healthcheck', healthChecktHandler)
app.use('/api/v1/task', taskRoutes)


export default app