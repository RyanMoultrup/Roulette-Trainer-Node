import mongoose from 'mongoose';
import { create, all, get, getByUserId } from '../../../../../src/game/models/game-repository';
import { Game } from '../../../../../src/game/models/game-model';
import { IGame, IOutcome } from '../../../../../src/game/interfaces/game-model-interface';

const getOutcomes = (): IOutcome => {
    return {
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
      }
}

describe('game-repository integration tests', () => {

  beforeAll(async () => {
    try {
        const dbConnect = process.env.MONGO_DB_CONNECTION as string

        const config: {} = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        await mongoose.connect(dbConnect, config)

        const db = mongoose.connection

        db.on('error', err => console.error(err))
    } catch (err) {
        console.log('BeforeAll error: ', err)
    }
  });

  afterAll(async () => {
    await Game.deleteMany({});
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Game.deleteMany({});
  });

  it('should create a new game', async () => {
    const outcomeData: IOutcome = getOutcomes();

    const gameData: IGame = {
        user: '64cfe9dc085fc9b9484818e7',
        outcomes: [outcomeData]
    };

    const createdGame = await create(gameData);

    expect(createdGame).toHaveProperty('_id');
    expect(createdGame.outcomes[0].placement).toEqual(outcomeData.placement);
  });

  it('should retrieve all games', async () => {
    const outcomeData1: IOutcome = getOutcomes();
    const outcomeData2: IOutcome = getOutcomes();

    await create({ outcomes: [outcomeData1], user: '64cfe9dc085fc9b9484818e7' });
    await create({ outcomes: [outcomeData2], user: '64cfe9dc085fc9b9484818e7' });

    const games = await all();
    expect(games.length).toEqual(2);
  });

  it('should retrieve a game by id', async () => {
    const outcomeData: IOutcome = {
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
      };
    const gameData: IGame = { outcomes: [outcomeData], user: '64cfe9dc085fc9b9484818e7' };

    const createdGame = await create(gameData);
    const retrievedGame = await get(createdGame._id.toString());

    expect(retrievedGame).not.toBeNull();
    expect(retrievedGame?.outcomes[0].placement).toEqual(outcomeData.placement);
  });

  it('should find games by user id', async () => {
    const outcomeData: IOutcome = getOutcomes();
    const gameData1: IGame = { outcomes: [outcomeData], user: '64cfe9dc085fc9b9484818e7' };
    const gameData2: IGame = { outcomes: [outcomeData], user: '64cee965fe8ab708b411dc56' };

    await create(gameData1);
    await create(gameData2);
    const userGames = await getByUserId('64cfe9dc085fc9b9484818e7');

    expect(userGames.length).toBeGreaterThanOrEqual(1);
    expect(userGames[0].user.toString()).toEqual('64cfe9dc085fc9b9484818e7');
  });
});
