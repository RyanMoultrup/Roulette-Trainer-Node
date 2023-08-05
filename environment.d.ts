declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string
            NODE_ENV: 'development' | 'production'
            SESSION_SECRET: string | string[]
        }
    }
}