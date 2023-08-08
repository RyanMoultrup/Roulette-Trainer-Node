import { Request, Response } from 'express';
import * as game from '../../models/game-repository'

/**
 * Saves a game to the database.
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
        const response = await game.create(req.body)
        res.json({
            success: true,
            data: response
        })
    } catch (e) {
        console.error(e)
        res.status(500).send({errors: true, message: "An error occurred while creating the user."});
    }
}

/**
 * Fetches a specific game by its ID.
 *
 * Sends a success message along with the user data if the retrieval process was successful.
 * If an error occurs during the process, an error message is logged to the console and a response with an error message is sent.
 *
 * @param {Request} req - The Express Request object. The user ID is expected to be in the request parameters under 'gameId'.
 * @param {Response} res - The Express Response object.
 * @returns {Promise<void>} - The Promise resolves when the response has been sent.
 */
export async function get(req: Request, res: Response): Promise<void> {
    try {
        const response = await game.get(req.params.gameId)
        if (response) res.json({ errors: false, data: response })
        else res.status(404).send({errors: false, message: "Game not found."});
    } catch (e) {
        console.error(e)
        res.status(500).send({errors: true, message: "An error occurred while fetching the users."});
    }
}
