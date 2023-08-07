import * as utils from './utils'
import { User } from '../user/model/user-model';
import { Request, Response, NextFunction, Router } from 'express';

const router = Router()

router.post('/authenticate', (req: Request, res: Response, next: NextFunction): void => {
    User.findOne({ username: req.body.username })
        .then((user): void | Response => {
            if (!user) return res.status(401).json({ success: false, msg: "could not find user" })
            
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt)
            
            if (isValid) {
                const tokenObject = utils.issueJWT(user);
                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires })
            } 
            else res.status(401).json({ success: false, msg: "you entered the wrong password" })

        })
        .catch(next);
})

router.post('/register', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const saltHash = utils.genPassword(req.body.password);
    
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
        
        res.json({ success: true, data: user });

    } catch (err) {
        res.json({ success: false, msg: err });
    }
})

export default router 