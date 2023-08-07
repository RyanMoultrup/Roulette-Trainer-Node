import fs from 'fs'
import path from'path'
import jwt from "jsonwebtoken";
import * as crypto from 'crypto'
import { IUserDocument } from "src/user/interfaces/user-document-interface"

const pathToKey = path.join(__dirname, '../..', 'id_rsa_priv.pem')
console.log('path::', pathToKey)
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')

/**
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 * 
 * @param {string} password - The plain text password to verify.
 * @param {string} hash - The hash to compare against.
 * @param {string} salt - The salt used when the hash was created.
 * 
 * @returns {boolean} Returns true if the password matches the hash, otherwise false.
 */
export function validPassword (password: string, hash: string, salt: string): boolean {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === hashVerify
}


interface saltHash {
    salt: string
    hash: string 
}

/**
 * 
 * @param {*} password - The password string that the user inputs to the password field in the register form
 * 
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 * 
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
export function genPassword (password: string): saltHash {
    const salt = crypto.randomBytes(32).toString('hex')
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    
    return {
      salt: salt,
      hash: genHash
    };
}


interface jwtToken {
    token: string
    expires: string
}

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
export function issueJWT (user: IUserDocument): jwtToken {
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
