import App, { json } from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc, { Options, SwaggerDefinition } from 'swagger-jsdoc'
import cookieParser from 'cookie-parser'

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