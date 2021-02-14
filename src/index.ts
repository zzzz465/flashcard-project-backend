import App, { json } from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc, { Options, SwaggerDefinition } from 'swagger-jsdoc'
import cookieParser from 'cookie-parser'
import { createConnection } from 'typeorm'
import { Bundle } from './entities/Bundle'
import path from 'path'

const app = App()
app.use(json())
app.use(cookieParser())

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
    console.log('connected')
    const bundle = new Bundle()
    await bundle.save()
    console.log('hello!')

    const bundles = connection.getRepository(Bundle)
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