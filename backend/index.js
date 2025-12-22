import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import uploadRoutes from './routes/upload.route.js'
import linkRoutes from './routes/link.routes.js'
import userRoutes from './routes/user.routes.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin : process.env.ORIGIN,
    credentials : true
}))

app.use('/api/auth', authRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/link', linkRoutes)
app.use('/api/user', userRoutes)

app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server is running at PORT : ${PORT}`)
})