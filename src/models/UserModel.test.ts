import { UserModel } from './UserModel'
import { describe, expect, test, vitest } from 'vitest'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// Fixed environment variables for low coupling
process.env.JWT_SECRET_KEY = 'your_test_secret_key'

describe('UserModel', () => {
  test('UserModel instance should be created', () => {
    const user = new UserModel('user', 'pass')
    expect(user).instanceOf(UserModel)
  })

  test('validatePassword should return true for correct password', async () => {
    const sha256Password = 'sha256_hashed_password'
    const user = new UserModel('user', sha256Password)

    const encryptedPassword = bcrypt.hashSync(sha256Password, 10)

    const mockFetchUserAsync = vitest.fn().mockImplementation(() => {
      user['cryptedPassword'] = encryptedPassword
    })
    user['fetchUserAsync'] = mockFetchUserAsync

    const result = await user.validatePassword()
    expect(result).toBe(true)

    expect(mockFetchUserAsync).toHaveBeenCalled()
  })

  test('validatePassword should return false for incorrect password', async () => {
    const user = new UserModel('user', 'wrong_password_hash')
    const result = await user.validatePassword()
    expect(result).toBe(false)
  })

  test('generateJWT should return a valid token', () => {
    const user = new UserModel('user', 'pass')
    const token = user.generateJWT()
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload
    expect(payload.name).toBe('USER')
  })

  test('verifyToken should return correct payload for valid token', () => {
    const validToken = jwt.sign(
      { name: 'USER' },
      process.env.JWT_SECRET_KEY as string
    )
    const payload = UserModel.verifyToken(validToken) as JwtPayload
    expect(payload.name).toBe('USER')
  })

  test('verifyToken should throw for invalid token', () => {
    expect(() => {
      UserModel.verifyToken('invalid_token')
    }).toThrow()
  })
})
