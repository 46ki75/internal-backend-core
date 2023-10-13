import express, { Request, Response } from 'express'
export const app = express()

app.get('/', (_req: Request, res: Response): Response => {
  return res.status(200).json({ message: 'Hello from root!' })
})

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' })
})
