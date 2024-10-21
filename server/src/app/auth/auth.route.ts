import { Router } from 'express';
import validateSchema from '../../middelwares/validateSchema';
import { signInSchema, signUpSchema } from './auth.schema';
import { signOut, signUp } from './auth.controller';
import passport from 'passport';
import '../strategies/local-strategy';

const router = Router();

/**
 * @openapi
 *  paths:
 *    /auth/sign-up:
 *     post:
 *      summary: Create a new user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SignupInput'
 *      responses:
 *        201:
 *          description: User created successfully
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Server error
 */
router.post('/sign-up', validateSchema(signUpSchema), signUp);

/**
 * @swagger
 *  paths:
 *    /auth/sign-in:
 *     post:
 *      summary: Sign In a user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SigninInput'
 *      responses:
 *        200:
 *          description: User signed in successfully
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Invalid email or password
 *        500:
 *          description: Server error
 */
router.post(
  '/sign-in',
  validateSchema(signInSchema),
  passport.authenticate('local', { session: true }),
  (req, res) => {
    console.log('User logged in', req.user);
    res.status(200).send({ user: req.user });
  }
);

/**
 * @openapi
 *  paths:
 *    /auth/sign-out:
 *     post:
 *      summary: Sign out a user
 *      tags: [Auth]
 *      responses:
 *        200:
 *          description: User signed out successfully
 *        500:
 *          description: Server error
 */
router.get('/sign-out', signOut);

export default router;
