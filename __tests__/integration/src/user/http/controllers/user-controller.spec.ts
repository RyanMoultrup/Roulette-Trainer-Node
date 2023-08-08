import request from 'supertest'
import init from '../../../../../../src';
import { mongo } from '../../../../../../src/config/mongo'

describe('User Controller Integration Tests', () => {
    const app = init()
    let jwtToken: string
    let consoleErrorSpy: jest.SpyInstance

    beforeEach(async () => {
        const userData = {
            username: 'TestUser',
            password: 'TestPassword123',
            email: 'testuser@email.com'
        };
        
        await request(app).post('/register').send(userData);

        const loginResponse = await request(app).post('/authenticate').send({
            username: 'TestUser',
            password: 'TestPassword123',
        });

        jwtToken = loginResponse.body.token
        
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
    })

    afterEach(() => {
        consoleErrorSpy.mockRestore()
        mongo.drop()
    })

    afterAll(async () => {
        await mongo.drop()
        mongo.close()
    })

    it('should create a user with valid data', async () => {
        const invalidUserData = {
            username: 'Jared',
            password: '123',
            email: 'jrd@email.com'
        }

        const response = await request(app)
            .post('/api/users')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send(invalidUserData)

        expect(response.status).toBe(200)
        expect(response.body.errors).toBe(false)

        expect(response.body.data).toHaveProperty('username')
        expect(response.body.data).toHaveProperty('email')
        expect(response.body.data).toHaveProperty('_id')
        expect(response.body.data).toHaveProperty('createdAt')
        expect(response.body.data).toHaveProperty('updatedAt')
        expect(response.body.data).toHaveProperty('__v')
    })

    it('should fail to create a user with invalid data', async () => {
        const invalidUserData = {
            username: 'Jared',
            password: '123',
        }

        const response = await request(app)
            .post('/api/users')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send(invalidUserData)

        expect(response.status).toBe(500)
        expect(response.body.errors).toBe(true)
    })

    it('should fail to fetch a user with an none existing user ID', async () => {
        const invalidUserId = '64cee965fe8ab708b411dc59'

        const response = await request(app)
            .get(`/api/users/${invalidUserId}`)
            .set('Authorization', jwtToken)

        expect(response.status).toBe(404);
        expect(response.body.errors).toBe(false)
        expect(response.body.message).toBe('User could not be found')
    })

    it('should fail to fetch a user with an invalid ID', async () => {
        const invalidUserId = '123'

        const response = await request(app)
            .get(`/api/users/${invalidUserId}`)
            .set('Authorization', jwtToken)

        expect(response.status).toBe(500);
        expect(response.body.errors).toBe(true)

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                kind: 'ObjectId',
                value: '123',
                path: '_id',
                reason: expect.anything() // TODO: Make this more specific
            })
        );
    })

    it('should fetch all users', async () => {
        const response = await request(app)
            .get('/api/users');

        expect(response.status).toBe(200)
        expect(response.body.errors).toBe(false)
        expect(Array.isArray(response.body.data)).toBe(true)
    })
});
