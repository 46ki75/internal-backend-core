import serverless, { Handler } from 'serverless-http'
import { app } from '.'
export const handler: Handler = serverless(app)
