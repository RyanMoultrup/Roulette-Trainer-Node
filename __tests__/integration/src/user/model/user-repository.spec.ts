import mongoose from 'mongoose';
import { create, all, get, findOneBy } from '../../../../../src/user/model/user-repository';
import { User } from '../../../../../src/user/model/user-model';
import { IUser } from '../../../../../src/user/interfaces/user-model-interface';

describe('user-repository integration tests', () => {

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
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should create a new user', async () => {
    const userData: IUser = {
      username: 'testuser',
      password: 'password123',
      email: 'testuser@example.com',
      hash: 'hashedpassword',
      salt: 'randomsalt'
    };

    const createdUser = await create(userData);

    expect(createdUser).toHaveProperty('_id');
    expect(createdUser.username).toEqual(userData.username);
  });

  it('should retrieve all users', async () => {
    const userData1: IUser = {
      username: 'testuser1',
      password: 'password123',
      email: 'testuser1@example.com',
      hash: 'hashedpassword1',
      salt: 'randomsalt1'
    };
    const userData2: IUser = {
      username: 'testuser2',
      password: 'password123',
      email: 'testuser2@example.com',
      hash: 'hashedpassword2',
      salt: 'randomsalt2'
    };

    await create(userData1);
    await create(userData2);

    const users = await all();
    expect(users.length).toEqual(2);
  });

  it('should retrieve a user by id', async () => {
    const userData: IUser = {
      username: 'testuser',
      password: 'password123',
      email: 'testuser@example.com',
      hash: 'hashedpassword',
      salt: 'randomsalt'
    };

    const createdUser = await create(userData);
    const retrievedUser = await get(createdUser._id.toString());

    expect(retrievedUser).not.toBeNull();
    expect(retrievedUser?.username).toEqual(userData.username);
  });

  it('should find a user by a specific field', async () => {
    const userData: IUser = {
      username: 'testuser',
      password: 'password123',
      email: 'testuser@example.com',
      hash: 'hashedpassword',
      salt: 'randomsalt'
    };

    await create(userData);
    const retrievedUser = await findOneBy({ email: 'testuser@example.com' });

    expect(retrievedUser).not.toBeNull();
    expect(retrievedUser?.username).toEqual(userData.username);
  });
});
