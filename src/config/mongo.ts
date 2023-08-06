import mongoose from 'mongoose'

const dbConnect: {local: string} = {
    local: 'mongodb://mongo:27017/roulette_trainer'
}

export const mongo:{connect: () => void} = {
    connect (): void {
        const config: {} = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        mongoose.connect(dbConnect.local, config)

        const db = mongoose.connection

        db.on('error', err => console.error(err))
        db.once('open', () => console.log('Connected to database'))
    }
}

