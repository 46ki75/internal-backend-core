import 'dotenv/config'
import express, { Request, Response } from 'express'
import { authRouter } from './controllers'
export const app = express()

app.use('/auth', authRouter)

app.get('/', async (_req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({ message: 'Hello from root!' })
})

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' })
})
