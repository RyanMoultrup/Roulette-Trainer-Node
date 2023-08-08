import { Request, Response } from 'express';
import * as game from '../../models/game-repository'

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
        const response = await game.getByUserId(req.params.userId)
        res.json({
            errors: false,
            data: response
        })
    } catch (e) {
        console.error(e)
        res.status(500).send({errors: true, message: "An error occurred while fetching the users."});
    }
}
