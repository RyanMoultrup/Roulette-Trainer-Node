import jwt from '../../jwt'
import password from '../../password'
import { User } from '../../../user/model/user-model';
import { Request, Response, NextFunction } from 'express';

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
export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const user = await User.findOne({ username: req.body.username })
      
        if (user) {
            const isValid = password.isValid(req.body.password, user.hash, user.salt)
        
            if (isValid) {
                const tokenObject = jwt.issue(user);
                res.status(200).json({ error: false, token: tokenObject.token, expiresIn: tokenObject.expires })
            } 
            else res.status(401).json({ error: false, msg: "Wrong password" })
        } else {
            res.status(401).json({ error: false, msg: "Could not find user" })
        }
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
export async function register(req: Request, res: Response): Promise<void> {
    const saltHash = password.generate(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            hash: hash,
            salt: salt
        });
        
        res.json({ error: false, data: user });

    } catch (err) {
        res.json({ error: true, message: err });
    }
}
