import { UserModel } from '../models'

/**
 * AuthService handles the logic related to user authentication.
 */
export class AuthService {
  /**
   * Authenticate a user based on the provided username and password.
   * The password is expected to be hashed using SHA-256.
   *
   * @param {string} name - The username to authenticate.
   * @param {string} password - The password (hashed using SHA-256) to authenticate.
   * @returns {Promise<string>} A promise that resolves to a JWT token if authentication is successful.
   * @throws {InvalidPasswordError} Throws an error if the provided password is invalid.
   */
  public static async login(name: string, password: string): Promise<string> {
    const user = new UserModel(name, password)
    const isValid = await user.validatePassword()
    if (isValid) {
      const token = user.generateJWT()
      return token
    } else {
      throw new InvalidPasswordError('Invalid password')
    }
  }
}

/**
 * Custom Error class for handling invalid passwords.
 */
class InvalidPasswordError extends Error {
  /**
   * Create a new InvalidPasswordError.
   *
   * @param {string} message - Error message.
   */
  constructor(message: string) {
    super(message)
    this.name = 'InvalidPasswordError'
  }
}
