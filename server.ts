import init from './src/index'

const app = init()

app.listen(8080, () => console.log('API running'))
