import App, { json } from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc, { Options, SwaggerDefinition } from 'swagger-jsdoc'
import cookieParser from 'cookie-parser'
import { createConnection } from 'typeorm'
import { Bundle } from './entities/Bundle'
import passport from 'passport'
import path from 'path'
import { Card } from './entities/Card'

const app = App()
app.use(json())
app.use(cookieParser())
app.use(passport.initialize())
// app.use(passport.session()) // required?? really?

passport.use()

const swaggerDefinition: SwaggerDefinition = {
    info: {
        title: 'flashcard-project-API-Documentation',
        version: '1.0.0',
    }
}

const swaggerOptions: Options = {
    swaggerDefinition,
    apis: ['./**/*.ts']
}

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    entities: [path.resolve(__dirname, '**/*{.ts,.js}')],
    synchronize: true
}).then(async (connection) => {
    const bundle = new Bundle()
    const card1 = new Card()
    card1.front = 'this is front page of the card'
    card1.back = 'this is back page of the card'

    const card2 = new Card()
    card2.front = 'second card front'
    card2.back = 'second card back'
    bundle.cards = [card1, card2]

    await connection.manager.save(bundle)

    const bundles = await connection.getRepository(Bundle).find({ relations: ['cards'] })

    console.log(bundles)
}).catch(err => {
    console.error(err)
})

/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Returns Todo list
 *     tags: [Todo]
 *     responses:
 *       200:
 *         description: todo list
 *         schema:
 *           type: object
 *           properties:
 *             todos:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Todo'
 */
app.get('/', (req, res) => {
    res.send('hello world!').end()
})

const spec = swaggerJsDoc(swaggerOptions)
app.use('/', swaggerUI.serve)
app.get('/api-docs', swaggerUI.setup(spec))

app.listen(80, () => {
    console.log('server listening on port 80')
})