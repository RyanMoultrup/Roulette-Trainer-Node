import request from 'supertest'
import init from '../../../../../../src';
import { mongo } from '../../../../../../src/config/mongo'

describe('Game Controller Integration Tests', () => {
    const app = init()
    let jwtToken: string
    let consoleErrorSpy: jest.SpyInstance

    beforeEach(async () => {
        const userData = {
            username: 'TestUser',
            password: 'TestPassword123',
            email: 'testuser@email.com'
        };
        
        const response = await request(app).post('/register').send(userData);

        const loginResponse = await request(app).post('/authenticate').send({
            email: 'testuser@email.com',
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

    it('should create a game with valid data', async () => {
        const validGameData = {
            user: '64cfe9dc085fc9b9484818e7',
            outcomes: [{
                placement: '1',
                category: 'odd',
                wonRound: 2,
                lostRound: 1,
                won: 100,
                loss: 50,
                bet: 20,
                hit: 10,
                color: 'red',
                even: false,
                bank: 150,
                round: 3,
                outcome: 'win'
              }],
              maxInside: 1000,
              minInside: 10,
              maxOutside: 1000,
              minOutside: 10,
              profit: 50,
              won: true,
              rounds: 1,
              bets: 1,
              startBalance: 1000
        }

        const response = await request(app)
            .post('/api/v1/games')
            .set('Authorization', jwtToken)
            .send(validGameData)

        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)

        expect(response.body.data).toHaveProperty('user')
        expect(response.body.data).toHaveProperty('outcomes')
        expect(response.body.data).toHaveProperty('maxInside')
        expect(response.body.data).toHaveProperty('minInside')
        expect(response.body.data).toHaveProperty('maxOutside')
        expect(response.body.data).toHaveProperty('minOutside')
        expect(response.body.data).toHaveProperty('profit')
        expect(response.body.data).toHaveProperty('won')
        expect(response.body.data).toHaveProperty('rounds')
        expect(response.body.data).toHaveProperty('bets')
        expect(response.body.data).toHaveProperty('startBalance')
    })

    it('should fetch a specific game by its ID', async () => {
        const validGameData = {
            user: '64cfe9dc085fc9b9484818e7',
            outcomes: [{
                placement: '1',
                category: 'odd',
                wonRound: 2,
                lostRound: 1,
                won: 100,
                loss: 50,
                bet: 20,
                hit: 10,
                color: 'red',
                even: false,
                bank: 150,
                round: 3,
                outcome: 'win'
              }],
              maxInside: 1000,
              minInside: 10,
              maxOutside: 1000,
              minOutside: 10,
              profit: 50,
              won: true,
              rounds: 1,
              bets: 1,
              startBalance: 1000
        }

        const creationResponse = await request(app)
            .post('/api/v1/games')
            .set('Authorization', jwtToken)
            .send(validGameData)
        
        const gameId = creationResponse.body.data._id

        const fetchResponse = await request(app)
            .get(`/api/v1/games/${gameId}`)
            .set('Authorization', jwtToken)

        expect(fetchResponse.status).toBe(200)
        expect(fetchResponse.body.errors).toBe(false)

        expect(fetchResponse.body.data.user).toBe(validGameData.user)
        expect(fetchResponse.body.data.outcomes).toStrictEqual(validGameData.outcomes)
    })

    it('should return a 404 when no game exists for passed ID', async () => {
        const gameId = '64cfe9dc085fc9b9484818e3'

        const fetchResponse = await request(app)
            .get(`/api/v1/games/${gameId}`)
            .set('Authorization', jwtToken)

        expect(fetchResponse.status).toBe(404)
        expect(fetchResponse.body.errors).toBe(false)
        expect(fetchResponse.body.message).toBe('Game not found.')
    })
});
