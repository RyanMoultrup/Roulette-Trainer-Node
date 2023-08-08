import mongoose from 'mongoose'

interface IMongo {
    connect: () => void
    close: () => void
    drop: () => Promise<void>
}

/**
 * MongoDB utility module providing methods to manage the connection to MongoDB.
 * 
 * @namespace mongo
 * @property {Function} connect - Initiates a connection to MongoDB using configuration parameters. On a successful connection, logs a confirmation message. On an error, logs the error.
 * @property {Function} close - Closes the existing connection to MongoDB.
 * @example
 * import { mongo } from './path-to-this-file';
 * mongo.connect(); // To initiate a connection to MongoDB
 * mongo.close();   // To close the connection
 */
export const mongo: IMongo = {
    connect (): void {
        const dbConnect = process.env.MONGO_DB_CONNECTION as string
        const config: {} = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        mongoose.connect(dbConnect, config)

        const db = mongoose.connection

        db.on('error', err => console.error(err))
        db.once('open', () => console.log('Connected to database'))
    },
    close (): void {
        mongoose.connection.close()
    },
    async drop (): Promise<void> {
        await mongoose.connection.db.dropDatabase()
    }
}
