import { app } from '.'
app.listen(3000, () => {
  console.log('The server is running at http://localhost:3000')
  console.log(
    'OpenAPI 3.0.0 documents are available in http://localhost:3000/api-docs'
  )
})
