import 'dotenv/config'
import express, { Request, Response } from 'express'
import { authRouter } from './controllers'
import swaggerUi from 'swagger-ui-express'
import { specs } from './specs'

export const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'dev') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}
app.use('/auth', authRouter)

/**
 * @swagger
 * /:
 *  get:
 *    description: This is the API root. It returns a greeting message and a note about how to access full API documentation.
 *    responses:
 *      '200':
 *        description: A successful response containing a greeting message and a note for accessing full API documentation.
 *        content:
 *          application/json:
 *            example:
 *              message: "Hello from root!"
 *              documentation: "For API documentation, please access /api-docs in a local development environment."
 */

app.get('/', async (_req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    message: 'Hello from root!',
    documentation:
      'For API documentation, please access /api-docs in a local development environment.'
  })
})

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' })
})
