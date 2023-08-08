import { Request, Response, NextFunction } from 'express';
import { UserValidator } from '../../../../../../src/user/http/validators/user-validator';

describe('UserValidator Middleware', () => {
    interface MockResponse extends Partial<Response> {
        status: jest.Mock;
        json: jest.Mock;
    }

    let mockRequest: Partial<Request>;
    let mockResponse: MockResponse
    let mockNext: NextFunction;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        mockNext = jest.fn();
    });

    it('should call next() for a valid user request body', () => {
        mockRequest.body = {
            name: 'John Doe',
            username: 'john_doe',
            password: 'password1234'
        };

        UserValidator(mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should respond with validation errors for an invalid user request body', () => {
        mockRequest.body = {
            name: '',
            username: 'jd',
            password: 'pass'
        };

        UserValidator(mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: 'Validation error',
            details: expect.arrayContaining([
                '"name" cannot be an empty field',
                '"username" should have a minimum length of 3',
                '"password" should have a minimum length of 8'
            ])
        });
        expect(mockNext).not.toHaveBeenCalled();
    });
});
