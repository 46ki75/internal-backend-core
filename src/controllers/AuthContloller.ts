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
   * @openapi
   * /auth/login:
   *   post:
   *     summary: Log in to the application
   *     description: Logs in the user and returns an authentication token.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Successfully logged in
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *       400:
   *         description: Bad Request (empty name field or password field)
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *       401:
   *         description: Invalid password
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  private async login(req: Request, res: Response): Promise<void> {
    if (req.body.name && req.body.password) {
      try {
        const token = await AuthService.login(req.body.name, req.body.password)
        res.status(200).json({ token })
      } catch (error) {
        res.status(401).json({ message: 'Invalid Password' })
      }
    } else {
      res.status(400).json({ message: 'Name and password are required' })
    }
  }
}

const authController = new AuthController()
export const authRouter = authController.router
