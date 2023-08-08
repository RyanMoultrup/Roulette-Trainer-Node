import jwt from 'jsonwebtoken'
import { issue } from '../../../../src/auth/jwt'
import { IUserDocument } from '../../../../src/user/interfaces/user-document-interface'

jest.mock('jsonwebtoken');

const mockUser: Partial<IUserDocument> = {
  _id: 'some-id',
  username: 'someUser',
  password: 'something',
  salt: 'astring',
  hash: 'anotherstring',
  email: 'something@email.com'
}

describe('JWT module', () => {
  it('should issue a valid jwt token', () => {
    // Mocking jwt.sign function
    (jwt.sign as jest.Mock).mockImplementation(() => 'mocked-jwt-token')

    const result = issue(mockUser as IUserDocument)
    
    expect(result.token).toBe('Bearer mocked-jwt-token')
    expect(result.expires).toBe('1d')

    // Ensure jwt.sign is called with the correct parameters
    expect(jwt.sign).toHaveBeenCalledWith(
      expect.objectContaining({
        sub: mockUser._id,
        iat: expect.any(Number)
      }),
      expect.any(String),
      {
        expiresIn: '1d',
        algorithm: 'RS256'
      }
    )
  })
})
