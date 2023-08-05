import { Request, Response } from 'express';

/**
 * Creates a new user in the database.
 *
 * Sends a success message if the creation process was successful.
 * If an error occurs during the process, the error is logged to the console.
 *
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 *
 * @example
 * router.post('/resource', create);
 */
export function create(req: Request, res: Response): void {
    console.log('request body::', req.body)
    try {
        res.send({
            success: 'In the Users Create() controller'
        })
    } catch (e) {
        console.error(e)
    }
}
