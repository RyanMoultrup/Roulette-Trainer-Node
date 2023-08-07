import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as User from '../../../user/model/user-repository'

// Custom JWT authentication middleware
async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  if (req.headers) {
    const token = req.headers.authorization;

    if (!token) return res.status(400).json({ error: 'No token provided' })

    return jwt.verify(token, process.env.SECRET_KEY as string, async (err: any, decoded: any) => {
      if (err) return res.status(400).json({ error: err })

      req.body.id = decoded.id;

      const user = await User.get(req.body.id);
      // const user = true

      if (!user) return res.status(400).json({ error: 'User not exists' })

      return next();
    });
  }
  
  return res.status(400).json({ error: 'No headers provided' });
}

async function generateJWT(req: Request, res: Response) {
  if (req.headers) {
    const token = req.headers.authorization;

    if (token) return res.status(400).json({ error: 'A token already exists' })

    const { username } = req.body;
    const user = await User.findOneBy({ username });

    if (!user) return res.status(400).json({ error: 'User not found' })

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordIsValid) return res.status(400).json({ error: 'Failed to login, invalid password' })

    const { id } = user;
    const newToken = jwt.sign({ id }, process.env.SECRET_KEY as string, { expiresIn: '1d' });

    return res.status(200).json(newToken);
  }
  
  return res.status(400).json({ error: 'No headers provided' });
}

export { verifyJWT, generateJWT };