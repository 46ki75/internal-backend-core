import { client } from '../database'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { GetItemCommand, GetItemCommandInput } from '@aws-sdk/client-dynamodb'

/**
 * Represents a user model that includes methods for password validation.
 */
export class UserModel {
  private readonly PK = 'USER'
  private readonly SK: string
  private readonly sha256Password: string
  private cryptedPassword: string | undefined

  /**
   * Create a new UserModel instance.
   *
   * @param name - The username.
   * @param sha256Password - The user's password hashed using SHA-256.
   *
   */
  constructor(name: string, sha256Password: string) {
    this.SK = name
    this.sha256Password = sha256Password
  }

  /**
   * Validates the user's password against the stored encrypted password.
   *
   * **Usage:**
   * ```typescript
   * ;(async () => {
   *    const user = new UserModel('username', 'p4$$w0rd');
   *    const isValid = await user.validatePassword();
   * })()
   * ```
   *
   * @throws Will throw an error if the stored password format is invalid.
   * @returns A promise that resolves to a boolean indicating whether the password is valid.
   *
   */
  public async validatePassword(): Promise<boolean> {
    try {
      await this.fetchUserAsync()

      if (typeof this.cryptedPassword !== 'string')
        throw new Error('Invalid stored password format')

      return await bcrypt.compare(this.sha256Password, this.cryptedPassword)
    } catch (error) {
      return false
    }
  }

  /**
   * Fetches the user's encrypted password from the database.
   *
   * @throws Will throw an error if the database returns a non-200 status, or if the user or password is not found.
   * @private
   */
  private async fetchUserAsync() {
    const params: GetItemCommandInput = {
      TableName: process.env.TABLE_NAME,
      Key: {
        PK: { S: 'USER' },
        SK: { S: this.SK }
      }
    }

    const command = new GetItemCommand(params)

    const data = await client.send(command)

    if (data.$metadata.httpStatusCode !== 200)
      throw new Error('The DB server responded with a status of other than 200')

    if (!data.Item) throw new Error('No such user')

    if (data.Item.password) {
      this.cryptedPassword = data.Item.password.S
    } else {
      throw new Error('password is not set')
    }
  }

  /**
   * Generates a JWT token for the user.
   *
   * **usage:**
   * ```typescript
   * ;(async () => {
   *    const user = new UserModel('username', 'p4$$w0rd');
   *    const isValid = await user.validatePassword();
   *    if(isValid){
   *       const token = generateJWT()
   *       res.json({ token: token })
   *    }
   * })()
   * ```
   *
   */
  public generateJWT(): string {
    const payload = {
      name: this.PK
    }
    return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
      expiresIn: '1h'
    })
  }

  /**
   * Verifies a JWT token.
   *
   * **usage:**
   * ```typescript
   * // e.g.) express middleware
   * const isValid = UserModel.verifyToken(req.body.token)
   * if(isValid){
   *   next()
   * } else {
   *   return res.status(403).json({ message: 'Invalid token' })
   * }
   * ```
   *
   */
  public static verifyToken(token: string): string | JwtPayload {
    return jwt.verify(token, process.env.JWT_SECRET_KEY as string)
  }
}
