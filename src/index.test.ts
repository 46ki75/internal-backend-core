import 'dotenv/config'
import { app } from '.'
import { describe, expect, test } from 'vitest'

describe('Environment Variables', () => {
  const environmentVariableNames = ['JWT_SECRET_KEY', 'TABLE_NAME']
  test.each(environmentVariableNames)(
    'should load environment variables',
    (env) => {
      const someEnvVariable = process.env[env]
      expect(someEnvVariable).toBeDefined()
      expect(someEnvVariable).not.toBe('')
    }
  )
})

describe('HTTP Methods', () => {
  test('app.get should be a function', () => {
    expect(typeof app.get).toBe('function')
  })

  test('app.post should be a function', () => {
    expect(typeof app.post).toBe('function')
  })

  test('app.put should be a function', () => {
    expect(typeof app.put).toBe('function')
  })

  test('app.delete should be a function', () => {
    expect(typeof app.delete).toBe('function')
  })

  test('app.patch should be a function', () => {
    expect(typeof app.patch).toBe('function')
  })

  test('app.all should be a function', () => {
    expect(typeof app.all).toBe('function')
  })
})

describe('Middleware & Routing', () => {
  test('app.use should be a function', () => {
    expect(typeof app.use).toBe('function')
  })

  test('app.route should be a function', () => {
    expect(typeof app.route).toBe('function')
  })
})

describe('View Engine', () => {
  test('app.set should be a function', () => {
    expect(typeof app.set).toBe('function')
  })

  test('app.engine should be a function', () => {
    expect(typeof app.engine).toBe('function')
  })
})

describe('Error Handling', () => {
  test('app.locals should be an object', () => {
    expect(typeof app.locals).toBe('object')
  })

  test('app.render should be a function', () => {
    expect(typeof app.render).toBe('function')
  })
})
