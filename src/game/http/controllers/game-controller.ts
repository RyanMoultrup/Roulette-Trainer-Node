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
export function create(req: Request, res: Response): void {
    try {
        const response = game.create(req.body)
        res.json({
            success: true,
            data: response
        })
    } catch (e) {
        console.error(e)
        res.status(500).send({errors: true, message: "An error occurred while creating the user."});
    }
}
