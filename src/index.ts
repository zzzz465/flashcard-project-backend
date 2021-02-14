import App from 'express'

const app = App()

app.get('/', (req, res) => {
    res.send('hello world!').end()
})

app.listen(80, () => {
    console.log('server listening on port 80')
})