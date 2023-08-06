import { Request, Response } from 'express';
import * as user from '../../../user/model/user-repository';

/**
 * Creates a new user in the database.
 *
 * Sends a success message if the creation process was successful.
 * If an error occurs during the process, the error is logged to the console.
 *
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export async function create(req: Request, res: Response): Promise<void> {
    try {
        const response = await user.create(req.body)
        res.json({
            errors: false,
            data: response
        })
    } catch (e) {
        console.error(e)
        res.status(500).send({errors: true, message: "An error occurred while creating the user."});
    }
}

/**
 * Fetches a specific user by their ID.
 *
 * Sends a success message along with the user data if the retrieval process was successful.
 * If an error occurs during the process, an error message is logged to the console and a response with an error message is sent.
 *
 * @param {Request} req - The Express Request object. The user ID is expected to be in the request parameters under 'userId'.
 * @param {Response} res - The Express Response object.
 * @returns {Promise<void>} - The Promise resolves when the response has been sent.
 */
export async function get(req: Request, res: Response): Promise<void> {
    try {
        const response = await user.get(req.params.userId)
        res.json({
            errors: false,
            data: response
        })
    } catch (e) {
        console.error(e)
        res.status(500).send({errors: true, message: "An error occurred while fetching the users."});
    }
}

/**
 * Fetches all users from the database.
 *
 * Sends a success message along with the data of all users if the retrieval process was successful.
 * If an error occurs during the process, an error message is logged to the console and a response with an error message is sent.
 *
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @returns {Promise<void>} - The Promise resolves when the response has been sent.
 */
export async function all(req: Request, res: Response): Promise<void> {
    try {
        const response = await user.all()
        res.json({
            errors: false,
            data: response
        })
    } catch (e) {
        console.error(e)
        res.status(500).send({errors: true, message: "An error occurred while fetching the users."});
    }
}