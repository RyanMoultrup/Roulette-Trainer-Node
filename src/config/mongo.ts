import mongoose, { Mongoose } from 'mongoose'

const db: {local: string} = {
    local: 'mongodb://localhost:27017/roulette_trainer'
}

export const mongo:{connect: () => Promise<any>} = {
    async connect (): Promise<any> {
        try {
            const config: {} = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
            const uri: string = db.local

            return await mongoose.connect(uri, config)
        } catch (e) {
            console.error(`MongoDB connection error:`)
        }
    }
}
