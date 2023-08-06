import { Request, Response } from 'express';
import { create as userCreate } from '../../../user/model/user-repository';

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
export async function create(req: Request, res: Response): Promise<void> {
    try {
        const user = await userCreate(req.body)
        res.send({
            errors: false,
            data: user
        })
    } catch (e) {
        console.error(e)
        res.status(500).send({errors: true, message: "An error occurred while creating the user."});
    }
}
