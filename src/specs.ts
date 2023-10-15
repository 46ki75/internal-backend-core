import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Internal System',
      version: '1.0.0'
    }
  },
  apis: ['./src/**/*.ts']
}

export const specs = swaggerJsdoc(options)
