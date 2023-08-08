import mongoose from 'mongoose'

export const mongo:{connect: () => void} = {
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
    }
}
