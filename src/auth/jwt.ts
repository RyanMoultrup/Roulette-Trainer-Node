import fs from 'fs'
import path from'path'
import jwt from "jsonwebtoken";
import { IUserDocument } from "../user/interfaces/user-document-interface";

const pathToKey = path.join(__dirname, '../..', 'id_rsa_priv.pem')
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')

interface jwtToken {
    token: string
    expires: string
}

/**
 * Generates a JWT (JSON Web Token) for a given user.
 * 
 * @function
 * @param {IUserDocument} user - The user object from which the JWT will be derived. 
 * The user's `_id` property is used as the JWT `sub` claim.
 * @returns {jwtToken} An object containing the formatted JWT and its expiration time.
 * @throws Will throw an error if JWT signing fails.
 * 
 * @typedef {Object} jwtToken
 * @property {string} token - The complete JWT prefixed with "Bearer ".
 * @property {string} expires - The expiration time for the JWT.
 */
export const issue = (user: IUserDocument): jwtToken => {
  const _id = user._id;

  const expiresIn = '1d';

  const payload = {
    sub: _id,
    iat: Date.now()
  };

  const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' })

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

export default { issue }
