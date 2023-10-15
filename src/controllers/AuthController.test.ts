import axios from 'axios'
import http from 'http'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '../'

const PORT = 3000

const baseURL = `http://localhost:${PORT}`

describe('AuthController /auth/login', () => {
  let server: http.Server

  beforeAll(() => {
    server = app.listen(PORT)
  })

  afterAll(() => {
    server.close()
  })

  test('should return 400 Bad Request in case of empty fields', async () => {
    const response = await axios.post(`${baseURL}/auth/login`, null, {
      validateStatus: (status) => {
        return status === 400
      }
    })
    expect(response.status).toBe(400)
  })

  test('should return 401 in case of wrong data', async () => {
    const response = await axios.post(
      `${baseURL}/auth/login`,
      { name: 'foo', password: 'bar' },
      {
        validateStatus: (status) => {
          return status === 401
        }
      }
    )
    expect(response.status).toBe(401)
  })
})
