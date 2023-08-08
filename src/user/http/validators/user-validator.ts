import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const exceptionMessages = {
  'string.base': '{{#label}} should be a type of \'text\'',
  'string.empty': '{{#label}} cannot be an empty field',
  'string.min': '{{#label}} should have a minimum length of {#limit}',
  'any.required': '{{#label}} is a required field',
};

const createUserSchema = Joi.object({
  name: Joi.string()
    .min(3).max(40).required()
    .messages(exceptionMessages),
  username: Joi.string()
    .min(3).max(20).required()
    .messages(exceptionMessages),
  password: Joi.string()
    .min(8).required()
    .messages(exceptionMessages),
});

/**
 * Middleware to validate user details against a predefined schema.
 * 
 * @param {Request} req - Express request object containing user data in its body.
 * @param {Response} res - Express response object to send back validation error messages if any.
 * @param {NextFunction} next - Callback to proceed to the next middleware.
 * 
 * @returns
 * - Calls `next()` if validation is successful.
 * - Responds with a status of 400 and the validation errors if validation fails.
 * 
 * @example
 * 
 * // Express route using the UserValidator middleware
 * app.post('/create-user', UserValidator, (req, res) => { ... });
 * 
 * // Expected request body:
 * {
 *   name: 'John Doe',
 *   username: 'john_doe',
 *   password: 'password1234'
 * }
 */
function UserValidator (req: Request, res: Response, next: NextFunction) {
  const { error } = createUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const { details } = error;
    const errorMessages = details.map(({ message }) => message);
    return res.status(400).json({ status: 'Validation error', details: errorMessages });
  }

  return next();
}

export { UserValidator };