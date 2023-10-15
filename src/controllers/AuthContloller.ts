import { Router, Request, Response } from 'express'
import { AuthService } from '../services'

/**
 * AuthController handles the HTTP routes related to authentication.
 */
class AuthController {
  private _router: Router

  /**
   * Construct a new AuthController and initialize routes.
   */
  constructor() {
    this._router = Router()
    this.initializeRoutes()
  }

  /**
   * Gets the router instance for this controller.
   *
   * @returns {Router} The router instance.
   */
  get router(): Router {
    return this._router
  }

  /**
   * Initialize routes for this controller.
   */
  private initializeRoutes() {
    this._router.post('/login', this.login)
  }

  /**
   * Handle login requests.
   *
   * @param {Request} req - The incoming HTTP request.
   * @param {Response} res - The outgoing HTTP response.
   * @returns {Promise<void>} A promise that resolves when the response is sent.
   */
  private async login(req: Request, res: Response): Promise<void> {
    try {
      const token = await AuthService.login(req.body.name, req.body.password)
      res.status(200).json({ token: token })
    } catch (error) {
      res.status(401).json({ message: 'Invalid Password' })
    }
  }
}

const authController = new AuthController()
export const authRouter = authController.router
