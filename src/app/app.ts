import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { studentRoutes } from './module/student/studentRoute'
import { usreRouter } from './module/user/userRoute'
import global__Error__handeler from './middleware/global__Error__handeler'
import notFound from './middleware/not__found'
import router from './router'
const app: Application = express()

// perser
app.use(express.json())
app.use(cors())

// router
app.use(`/api/v1`, router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(global__Error__handeler)
app.use(notFound)
export default app
