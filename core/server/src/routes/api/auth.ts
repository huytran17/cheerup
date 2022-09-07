import authenticateUserJWT from "../../config/middlewares/authenticateUserJWT";
import makeValidator from "../../config/middlewares/validator-middleware";
import express from "express";
import makeExpressCallback from "../../config/express-callback";
import {
  signOutRules,
  signInRules,
  signUpRules,
} from "../../data-access/controllers/user/auth/validators";
import {
  signOutController,
  signInController,
  signUpController,
  getMeController,
} from "../../data-access/controllers/user/auth";

const authRouter = express.Router();

authRouter.get(
  "/me",
  authenticateUserJWT(),
  makeExpressCallback(getMeController)
);

/**
 * @openapi
 *
 * /api/auth/sign-in:
 *   post:
 *     description: Login user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                password:
 *                  type: string
 *              required:
 *                - email
 *                - password
 *     responses:
 *       200:
 *         description: Returns the access token and user object.
 *     tags:
 *     - /api/auth
 */
authRouter.post(
  "/sign-in",
  makeValidator(signInRules),
  makeExpressCallback(signInController)
);
authRouter.post(
  "/sign-up",
  makeValidator(signUpRules),
  makeExpressCallback(signUpController)
);
authRouter.post(
  "/sign-out",
  authenticateUserJWT(),
  makeValidator(signOutRules),
  makeExpressCallback(signOutController)
);

export default authRouter;
