import * as crypto from 'crypto'

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
export function isValid (password: string, hash: string, salt: string): boolean {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === hashVerify
}


interface saltHash {
    salt: string
    hash: string 
}

/**
 * Generates a salt and hash for the given password using the PBKDF2 cryptographic algorithm.
 * 
 * @function
 * @param {string} password - The plaintext password to be salted and hashed.
 * @returns {saltHash} An object containing the salt and the hashed password.
 * @throws Will throw an error if the cryptographic functions fail.
 * 
 * @typedef {Object} saltHash
 * @property {string} salt - A random string used to mix with the password before hashing.
 * @property {string} hash - The resulting hash after salting and hashing the password.
 */
export function generate (password: string): saltHash {
    const salt = crypto.randomBytes(32).toString('hex')
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    
    return {
      salt: salt,
      hash: genHash
    };
}

export default { isValid, generate }
