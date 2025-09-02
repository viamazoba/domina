import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from './config/cors'
import { healthchecktHandler } from './controllers/healthcheck.controller'
import { connetDB } from './config/db'
/* import examRoutes from './routes/exam.routes'
import schoolRoutes from './routes/school.routes'
import userRoutes from './routes/user.routes'
import groupRoutes from './routes/group.routes' */
//import authRoutes from './routes/authRoutes'


dotenv.config()
connetDB()
const app = express()
app.use(cors(corsConfig))

// Logging
app.use(morgan('dev'))

// Leer datos de formulario
app.use(express.json())

//Routes
//app.use('/api/auth', authRoutes)
/* app.use('/api/v1/exams', examRoutes)
app.use('/api/v1/schools', schoolRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/groups', groupRoutes) */

app.use('/api/v1/healthcheck', healthchecktHandler)


export default app